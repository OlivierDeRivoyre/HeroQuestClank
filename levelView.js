
class LevelView {

    constructor(level) {
        this.level = level;
        this.floor = new Floor(level);
        this.heroes = Character.getHeroes();
        this.monsters = Character.getEnnemies(level);
        this.diceZone = new DiceZone();
        this.hand = new CardZone(50, 350, GameScreenWidth - 100, (c) => this.playCard(c));
        this.shopButton = new Button('Shop', 500, 200, 80, 40, () => this.openShop());
        this.endTurnButton = new Button('End turn', 588, 200, 120, 40, () => this.endTurn());
        game.cards.playerDeck.drawToCount(5);
        game.cards.uncommonShop.drawToCount(4);
        this.hand.refresh(game.cards.playerDeck.hand);
        this.popup = null;
    }

    update() {
        if (this.popup) {
            this.popup.update();
            return;
        }
        this.hand.update();
        this.shopButton.update();
        this.endTurnButton.update();
        this.updateHeroes();
    }
    updateHeroes() {
        if (!input.mouseClicked)
            return;
        const allChars = this.heroes.concat(this.monsters);
        const selectedChar = allChars.find(c => c.isSelected);
        if (selectedChar) {
            if (isInsideRect(input.mouse, selectedChar.getRect())) {
                selectedChar.isSelected = false;
                return;
            }
            if (selectedChar.type !== "hero") {
                return;
            }
            const targetCell = this.floor.getCell(input.mouse);
            if (!targetCell) {
                selectedChar.isSelected = false;
                return;
            }
            this.heroAction(selectedChar, targetCell);
            return;
        }
        for (let c of allChars) {
            if (isInsideRect(input.mouse, c.getRect())) {
                c.isSelected = !c.isSelected;
                if (selectedChar && c != selectedChar) {
                    selectedChar.isSelected = false;
                }
            }
        }
    }

    heroAction(hero, targetCell) {
        if (hero.hasAttacked) {
            hero.isSelected = false;
        }
        const monster = this.monsters.find(m => m.cell.x == targetCell.x && m.cell.y == targetCell.y);
        if (monster && hero.isAround(targetCell)) {
            console.log('attack ' + monster.type);
            const dmg = this.diceZone.getSumAttack();
            monster.takeDamage(dmg);
            if (monster.life == 0) {
                this.monsters.splice(this.monsters.findIndex(m => m === monster), 1);
            }
            hero.hasAttacked = true;
            hero.isSelected = false;
            return;
        }
        if (hero.atOneStep(targetCell)) {
            const dist = this.diceZone.getSumWalk();
            if (hero.movedStep < dist) {
                hero.movedStep++;
                hero.cell = targetCell;
                if (hero.movedStep == dist && !this.monsters.find(m => m.isAround(targetCell))) {
                    hero.hasAttacked = true;
                    hero.isSelected = false;
                    return;
                }
            }
        }
    }


    paint() {
        screen.clear();
        this.floor.paint();
        for (let c of this.heroes) {
            c.paint();
        }
        for (let c of this.monsters) {
            c.paint();
        }
        this.shopButton.paint();
        this.endTurnButton.paint();
        this.diceZone.paint(500, 50)
        this.hand.paint();
        if (this.popup) {
            this.popup.paint();
        }
    }

    playCard(card) {
        console.log("play " + card.title);
        game.cards.playerDeck.handToDiscard(card);
        for (let s of card.stats) {
            if (s === 'a') {
                this.diceZone.addAttackDice();
            }
            if (s === 's') {
                this.diceZone.addWalkDice();
            }
            if (s === 'e') {
                this.diceZone.energy++;
            }
            if (s === 'd') {
                this.diceZone.shield++;
            }
        }
        this.hand.refresh(game.cards.playerDeck.hand);
    }
    openShop() {
        this.popup = new ShopForm(this);
    }
    endTurn() {
        if (!this.heroes.find(h => h.life > 0)) {
            this.popup = new DeadScreen(this);
            return;
        }
        if (!this.monsters.find(h => h.life > 0)) {
            this.popup = new WinLevelScreen(this);
            return;
        }
        for (let hero of this.heroes) {
            hero.onNewTurn();
        }
        this.diceZone.onNewTurn();
        game.cards.playerDeck.drawToCount(5);
        game.cards.uncommonShop.drawToCount(4);
        this.hand.refresh(game.cards.playerDeck.hand);
    }
}

class CardZone {
    constructor(topX, topY, width, playCardFunc) {
        this.cards = [];
        this.topX = topX;
        this.topY = topY;
        this.width = width;
        this.cardWith = 150;
        this.cardHeight = 210;
        this.cardCanvas = null;
        this.cardRects = []
        this.playCardFunc = playCardFunc;
    }
    refresh(cards) {
        this.cards = cards;
        this.cardRects = []
        if (cards.length == 0)
            return;
        const padding = Math.min(155, this.width / cards.length);
        for (let i = 0; i < cards.length; i++) {
            const x = this.topX + padding * i;
            const y = this.topY;
            const rect = {
                x,
                y,
                width: this.cardWith,
                height: this.cardHeight,
                card: cards[i],
            };
            this.cardRects.push(rect);
        }
    }
    paint() {
        if (!screen.canvas.isCanvasSameRatio(this.cardCanvas)) {
            this.cardCanvas = screen.canvas.createZoomedCanvas(this.cardWith, this.cardHeight, TemplateCardWidth, TemplateCardHeight);
        }
        for (let c of this.cardRects) {
            paintCard(c.card, this.cardCanvas);
            screen.canvas.drawFixedCanvas(this.cardCanvas, c.x, c.y);
        }
    }
    update() {
        if (!input.mouseClicked)
            return;
        for (let c of this.cardRects) {
            if (isInsideRect(input.mouse, c)) {
                this.playCardFunc(c.card);
                return;
            }
        }
    }
}

class Character {
    constructor() {
        this.type = "hero";
        this.cell = { x: 0, y: 0 };
        this.sprite = getDungeonTileSetHeroSprite(0, 14);
        this.life = 3;
        this.shield = 0;
        this.lookLeft = false;
        this.marginY = 0;
        this.hasAttacked = false;
        this.movedStep = 0;
        this.isSelected = false;
    }
    static getHeroes() {
        const h1 = new Character();
        const h2 = new Character();
        const h3 = new Character();
        h1.sprite = getDungeonTileSetHeroSprite(0, 14);
        h2.sprite = getDungeonTileSetHeroSprite(3, 10);
        h3.sprite = getDungeonTileSetHeroSprite(5, 10);
        h1.marginY = -10;
        h2.marginY = -16;
        h3.marginY = -16;
        h1.cell.y = 0;
        h2.cell.x = 2;
        h3.cell.x = 4;
        return [h1, h2, h3];
    }
    static getGobelin(x, y) {
        const monster = new Character();
        monster.type = "gobelin";
        monster.sprite = getDungeonTileSetVilainSprite(0, 12);
        monster.marginY = 2;
        monster.life = 20;
        monster.cell = { x, y };
        return monster;
    }
    static getEnnemies(level) {
        return [Character.getGobelin(11, 0)];
    }
    getRect() {
        return {
            x: Floor.TopX + this.cell.x * 32,
            y: Floor.TopY + this.cell.y * 32,
            width: 32,
            height: 32,
        }
    }
    paint() {
        const rect = this.getRect();
        if (this.isSelected) {
            screen.canvas.fillRect('rgba(0, 255, 0, 0.25)', rect.x, rect.y, rect.width, rect.height);
        }
        if (this.type == "hero") {
            if (!this.hasAttacked) {
                screen.canvas.fillRect('rgba(0, 255, 0, 0.05)', rect.x, rect.y, rect.width, rect.height);
            } else {
                screen.canvas.fillRect('rgba(50, 50, 50, 0.10)', rect.x, rect.y, rect.width, rect.height);
            }
        }
        this.sprite.paint(
            rect.x, rect.y + this.marginY,
            tickNumber % 20 > 10, this.lookLeft);
    }

    isAround(cell) {
        return Math.abs(this.cell.x - cell.x) <= 1 && Math.abs(this.cell.y - cell.y) <= 1;
    }
    atOneStep(cell) {
        const dx = Math.abs(this.cell.x - cell.x);
        const dy = Math.abs(this.cell.y - cell.y);
        return dx + dy == 1;
    }

    takeDamage(dmg) {
        this.life = Math.max(0, this.life - dmg);
    }

    onNewTurn() {
        this.life = 3;
        this.shield = 0;
        this.hasAttacked = false;
        this.movedStep = 0;
        this.isSelected = false;
    }

}

class Floor {
    static TopX = 16;
    static TopY = 16;
    constructor(level) {
        this.sprite = getDungeonTileSetFloorSprite();
        this.width = 12;
        this.height = 8;
        this.seed = level;
        this.rect = this.getRect();
    }
    paint() {
        screen.canvas.fillRect('#483B3A', Floor.TopX, Floor.TopY, 32 * this.width, 32 * this.height);
        let r = this.seed;
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                r = getNextRand(r);
                const index = r % 13 == 0 ? 1
                    : r % 17 == 0 ? 2
                        : 0;
                this.sprite.paint(Floor.TopX + i * 32, Floor.TopY + j * 32, index);
            }
        }
    }
    getRect() {
        return {
            x: Floor.TopX,
            y: Floor.TopY,
            width: this.width * 32,
            height: this.height * 32,
        }
    }
    getCell(coord) {
        if (!isInsideRect(coord, this.rect)) {
            return null;
        }
        return {
            x: Math.floor((coord.x - Floor.TopX) / 32),
            y: Math.floor((coord.y - Floor.TopY) / 32),
        };
    }
}

class Dice {
    constructor(type) {
        this.type = type
        this.value = Math.floor(1 + Math.random() * 6);
    }
    paint(x, y) {
        screen.canvas.fillRect(this.type == 'a' ? 'red' : 'blue', x, y, 24, 24);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#FFA';
        let margin = (24 - screen.canvas.measureTextWidth(this.value)) / 2;
        screen.canvas.fillText(this.value, x + margin, y + 20);
    }
}

class DiceZone {
    constructor() {
        this.walkDices = [];
        this.attackDices = [];
        this.shield = 0;
        this.energy = 0;
        this.attackLogo = LogoAttImage;
        this.walkLogo = LogoStepImage;
        this.shieldLogo = LogoDefImage;
        this.energyLogo = LogoStarImage;
        this.onNewTurn();
    }
    paint(topX, topY) {
        const logoSize = 28;
        const diceMargin = 3;
        const textMargin = 23;
        const lineMargin = 30;
        screen.canvas.drawImage(this.walkLogo, topX, topY, logoSize, logoSize);
        for (let i = 0; i < this.walkDices.length; i++) {
            this.walkDices[i].paint(topX + logoSize + 4 + i * 32, topY + diceMargin);
        }
        topY += lineMargin;
        screen.canvas.drawImage(this.attackLogo, topX, topY, logoSize, logoSize);
        for (let i = 0; i < this.attackDices.length; i++) {
            this.attackDices[i].paint(topX + logoSize + 4 + i * 32, topY + diceMargin);
        }
        topY += lineMargin;
        screen.canvas.drawImage(this.shieldLogo, topX, topY, logoSize, logoSize);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#222';
        screen.canvas.fillText(this.shield, topX + logoSize + 4, topY + textMargin);

        topY += lineMargin;
        screen.canvas.drawImage(this.energyLogo, topX, topY, logoSize, logoSize);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#222';
        screen.canvas.fillText(this.energy, topX + logoSize + 4, topY + textMargin);
    }
    addAttackDice() {
        this.attackDices.push(new Dice('a'))
    }
    addWalkDice() {
        this.walkDices.push(new Dice('w'))
    }
    onNewTurn() {
        this.walkDices = [];
        this.attackDices = [];
        this.addAttackDice();
        this.addWalkDice();
        this.shield = 0;
        this.energy = 0;
    }
    getSumWalk() {
        let total = 0;
        for (let d of this.walkDices) {
            total += d.value;
        }
        return total;
    }
    getSumAttack() {
        let total = 0;
        for (let d of this.walkDices) {
            total += d.value;
        }
        return total;
    }

}
class Button {
    constructor(text, x, y, width, height, clickFunc) {
        this.text = text;
        this.rect = { x, y, width, height };
        this.clickFunc = clickFunc;
    }
    paint() {
        screen.canvas.fillRect('#AAA', this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        screen.canvas.fontSize = 24;
        const size = screen.canvas.measureTextWidth(this.text);
        const margin = (this.rect.width - size) / 2;
        screen.canvas.fillText(this.text, this.rect.x + margin, this.rect.y + 26);
    }
    update() {
        if (!input.mouseClicked)
            return;
        if (isInsideRect(input.mouse, this.rect))
            this.clickFunc();
    }
}

class ShopForm {
    constructor(parent) {
        this.parent = parent;
        this.cardZone = new CardZone(60, 200, GameScreenWidth - 120, (c) => this.tryBuyCard(c));
        this.closeButton = new Button('Close', GameScreenWidth - 160, GameScreenHeight - 120, 80, 40, () => this.close());
        this.refresh();
    }

    refresh() {
        this.availableEnergy = this.parent.diceZone.energy;
        const cards = game.cards.commonCards.concat(game.cards.uncommonShop.hand);
        cards.sort((c1, c2) => c1.cost - c2.cost)
        this.cardZone.refresh(cards);
    }

    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEE', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fontSize = 24;
        screen.canvas.fillText('You have ' + this.availableEnergy + ' ernergies', margin + 50, margin + 50);
        this.cardZone.paint();
        this.closeButton.paint();
    }
    update() {
        this.cardZone.update();
        this.closeButton.update();
    }
    tryBuyCard(card) {
        console.log("try to buy " + card.title);
        if (this.availableEnergy >= card.cost) {
            this.availableEnergy -= card.cost;
            this.parent.diceZone.energy = this.availableEnergy;
            game.cards.playerDeck.discard.push(card);
            if (card.type !== "common") {
                game.cards.uncommonShop.hand.splice(game.cards.uncommonShop.hand.findIndex(c => c === card), 1);
            }
            this.refresh();
            this.close();
        }
    }
    close() {
        this.parent.popup = null;
    }
}
class DeadScreen {
    constructor(parent) {
        this.parent = parent;
    }
    update() {

    }

    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEE', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fontSize = 40;
        screen.canvas.fillStyle = 'red'
        screen.canvas.fillText('You have lost', margin + 50, margin + 50);
    }
}
class WinLevelScreen {
    constructor(parent) {
        this.parent = parent;
        this.closeButton = new Button('Next level', 400, 400, 120, 40, () => this.nextLevel());
    }
    update() {
        this.closeButton.update();
    }

    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEE', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fontSize = 40;
        screen.canvas.fillStyle = 'green'
        screen.canvas.fillText('You have clear the level ' + this.parent.level, margin + 50, margin + 50);
        this.closeButton.paint();
    }
    nextLevel() {
        game.currentView = new LevelView(this.parent.level + 1);
    }
}
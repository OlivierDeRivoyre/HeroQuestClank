
class LevelView {

    constructor(level) {
        this.level = level;
        this.heroes = Character.getHeroes();
        this.monsters = Character.getEnnemies(level);
        this.floor = new Floor(this);
        this.diceZone = new DiceZone(500, 50);
        this.hand = new CardZone(50, 350, GameScreenWidth - 100, (c) => this.playCard(c));
        this.shopButton = new Button('Shop', 500, 200, 80, 40, () => this.openShop());
        this.endTurnButton = new Button('End turn', 588, 200, 120, 40, () => this.endTurn());
        game.cards.playerDeck.drawToCount(5);
        game.cards.uncommonShop.drawToCount(4);
        this.hand.refresh(game.cards.playerDeck.hand);
        this.popup = null;
        this.buyableCards = 0;
        this.refreshShopButton();
    }

    update() {
        if (this.popup) {
            this.popup.update();
            return;
        }
        this.hand.update();
        this.diceZone.update()
        this.shopButton.update();
        this.endTurnButton.update();
        this.updateHeroes();
        if (input.mouseClicked)
            this.floor.refresh();
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
            monster.takeDamage(dmg, hero);
            if (monster.life == 0) {
                this.monsters.splice(this.monsters.findIndex(m => m === monster), 1);
            }
            hero.hasAttacked = true;
            hero.isSelected = false;
            this.diceZone.lockDices();
            return;
        }
        const otherHero = this.heroes.find(m => m.cell.x == targetCell.x && m.cell.y == targetCell.y);
        if (otherHero) {
            otherHero.isSelected = true;
            hero.isSelected = false;
            return;
        }
        const d = hero.getWalkingDistance(targetCell)
        const maxDist = this.diceZone.getSumWalk();
        if (d + hero.movedStep <= maxDist) {
            hero.movedStep += d;
            hero.cell = targetCell;
            this.diceZone.lockDices();
            if (hero.movedStep >= maxDist && !this.monsters.find(m => m.isAround(targetCell))) {
                hero.hasAttacked = true;
                hero.isSelected = false;
                return;
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
        this.paintBuyableCards();
        this.endTurnButton.paint();
        this.diceZone.paint();
        this.hand.paint();
        if (this.popup) {
            this.popup.paint();
        }
    }
    paintBuyableCards() {
        if (this.buyableCards == 0)
            return;
        const topX = this.shopButton.rect.x;
        const topY = this.shopButton.rect.y - 6;
        const margin = (this.shopButton.rect.width - 10 * this.buyableCards) / 2
        for (let i = 0; i < this.buyableCards; i++) {
            screen.canvas.drawImage(PureStarImage, topX + margin + i * 10, topY, 12, 12);
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
        for (let h of this.heroes) {
            h.shield = this.diceZone.shield;
        }
        this.refreshShopButton();
    }
    refreshShopButton() {
        const cards = game.cards.commonCards.concat(game.cards.uncommonShop.hand);
        this.buyableCards = cards.filter(c => c.cost <= this.diceZone.energy).length;
    }
    openShop() {
        this.popup = new ShopForm(this);
    }
    playMonster(monster) {
        if (monster.life <= 0)
            return;
        let target = monster.aggro;
        monster.aggro = null;
        if (!target) {
            for (let h of this.heroes) {
                if (h.life <= 0)
                    continue;
                if (!target)
                    target = h;
                else if (monster.getWalkingDistance(h.cell) < monster.getWalkingDistance(target.cell))
                    target = h;
            }
        }
        if (!target)
            return;
        if (!monster.isAround(target.cell)) {
            const newCell = this.getCellToMoveTo(monster, target.cell, monster.monsterMaxWalkSteps);
            if (!newCell)
                return;
            monster.cell = newCell;
        }
        if (monster.isAround(target.cell)) {
            target.takeDamage(monster.monsterDamage, monster);
        }
    }

    getCellToMoveTo(character, targetCell, maxDist) {
        let bestScore = 10000000;
        let bestCell = null;
        const occupedCells = this.heroes.filter(h => h.life > 0).concat(this.monsters.filter(h => h.life > 0))
            .map(c => c.cell);
        for (let i = 0; i < this.floor.width; i++) {
            for (let j = 0; j < this.floor.height; j++) {
                if (occupedCells.find(c => c.x == i && c.y == j))
                    continue;
                const currentCell = { x: i, y: j };
                const walkDist = character.getWalkingDistance(currentCell);
                if (walkDist > maxDist)
                    continue;
                const hitDist = distanceSquare(currentCell, targetCell);
                const currentScore = hitDist * 10 + walkDist;
                if (currentScore > bestScore)
                    continue;
                bestScore = currentScore;
                bestCell = currentCell;
            }
        }
        return bestCell;
    }

    endTurn() {
        for (let hero of this.heroes) {
            hero.shield = this.diceZone.shield;
        }
        for (let m of this.monsters) {
            this.playMonster(m);
        }
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
        this.refreshShopButton();
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
        this.popup = null;
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
        if (this.popup)
            this.popup.paint();
    }
    update() {
        if (this.popup) {
            this.popup.update();
            return;
        }
        if (!input.mouseClicked)
            return;
        for (let c of this.cardRects) {
            if (isInsideRect(input.mouse, c)) {
                if (isInsideRect({ x: input.mouse.x, y: input.mouse.y - c.height / 2 }, c)) {
                    this.popup = new ZoomCardForm(this, c.card);
                    return;
                }
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
        this.maxLife = 3;
        this.shield = 0;
        this.lookLeft = false;
        this.marginY = 0;
        this.hasAttacked = false;
        this.movedStep = 0;
        this.monsterMaxWalkSteps = 8;
        this.monsterDamage = 1;
        this.isSelected = false;
        this.aggro = null;
        this.deadSprite = new Sprite(shikashiTileSet, 0, 0, 32, 32, 1);
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
        monster.life = monster.maxLife = 20;
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
        if (this.life <= 0) {
            this.deadSprite.paint(rect.x, rect.y);
            return;
        }
        if (this.isSelected) {
            screen.canvas.fillRect('rgba(0, 255, 0, 0.25)', rect.x, rect.y, rect.width, rect.height);
        }
        if (this.type == "hero") {
            if (!this.hasAttacked) {
                screen.canvas.fillRect('rgba(251, 255, 0, 0.3)', rect.x, rect.y, rect.width, rect.height);
            } else {
                screen.canvas.fillRect('rgba(50, 50, 50, 0.10)', rect.x, rect.y, rect.width, rect.height);
            }
        }
        this.sprite.paint(
            rect.x, rect.y + this.marginY,
            tickNumber % 20 > 10, this.lookLeft);
        const totalLife = this.maxLife + this.shield;
        const lifePx = Math.floor(30 * this.life / totalLife);
        const armorPx = Math.floor(30 * this.shield / totalLife);
        const barY = rect.y + 28;
        screen.canvas.fillRect('#000', rect.x, barY, 32, 4);
        const lifeColor = this.type == 'hero' ? '#0B0' : '#B00';
        screen.canvas.fillRect(lifeColor, rect.x + 1, barY + 1, lifePx + armorPx / 2, 2);
        screen.canvas.fillRect('#2af', rect.x + 1 + lifePx, barY + 1, armorPx, 2);
    }
    isAround(cell) {
        return Math.abs(this.cell.x - cell.x) <= 1 && Math.abs(this.cell.y - cell.y) <= 1;
    }
    getWalkingDistance(cell) {
        const dx = Math.abs(this.cell.x - cell.x);
        const dy = Math.abs(this.cell.y - cell.y);
        return dx + dy;
    }
    atOneStep(cell) {
        return this.getWalkingDistance(cell) == 1;
    }
    takeDamage(dmg, fromCharacter) {
        if (this.shield != 0) {
            const shielded = Math.min(dmg, this.shield);
            dmg -= shielded;
            if (this.type === 'hero') {
                this.shield -= shielded;
            }
        }
        this.life = Math.max(0, this.life - dmg);
        if (this.aggro == null || this.aggro.life == 0) {
            if (fromCharacter.type === 'hero' && this.isAround(fromCharacter.cell)) {
                this.aggro = fromCharacter;
            }
        }
    }
    onNewTurn() {
        this.shield = 0;
        this.hasAttacked = false;
        this.movedStep = 0;
        this.isSelected = false;
    }
}
class Floor {
    static TopX = 16;
    static TopY = 16;
    constructor(levelView) {
        this.levelView = levelView;
        this.sprite = getDungeonTileSetFloorSprite();
        this.width = 12;
        this.height = 8;
        this.seed = levelView.level;
        this.rect = this.getRect();
        this.bg = new Array(this.width * this.height);
        this.refresh();
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
                const x = Floor.TopX + i * 32;
                const y = Floor.TopY + j * 32;
                this.sprite.paint(x, y, index);
                const bgColor = this.bg[i + j * this.width];
                if (bgColor)
                    screen.canvas.fillRect(bgColor, x, y, 32, 32)
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
    refresh() {
        const allChars = this.levelView.heroes.concat(this.levelView.monsters);
        const selectedChar = allChars.find(c => c.isSelected);
        const walkDist = !selectedChar ? 1
            : selectedChar.type === 'hero' ? this.levelView.diceZone.getSumWalk() - selectedChar.movedStep
                : selectedChar.monsterMaxWalkSteps;
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                const color = this.getBgColor(i, j, selectedChar, walkDist, allChars);
                this.bg[i + j * this.width] = color;
            }
        }
    }
    getBgColor(i, j, selectedChar, walkDist, allChars) {
        if (!selectedChar) {
            return null;
        }
        const cell = selectedChar.cell;
        const isHero = selectedChar.type === 'hero';
        if (cell.x == i && cell.y == j)
            return 'rgba(0, 255, 0, 0.25)';
        const d = selectedChar.getWalkingDistance({ x: i, y: j });
        if (d > walkDist)
            return null;
        const occuped = allChars.find(c => c.cell.x == i && c.cell.y == j);
        if (!occuped)
            return 'rgba(0, 255, 0, 0.10)';
        const isOccupedByHero = occuped.type === 'hero';
        if (isOccupedByHero == isHero) {
            return null;
        }
        return 'rgba(255, 145, 0, 0.50)';
    }
}
class Dice {
    constructor(type) {
        this.type = type
        this.value = Math.floor(1 + Math.random() * 6);
        this.isSelected = false;
    }
    paint(x, y) {
        if (this.isSelected) {
            screen.canvas.fillRect('rgba(0, 255, 0, 1)', x - 2, y - 2, 24 + 4, 24 + 4);
        }
        screen.canvas.fillRect(this.type == 'a' ? 'red' : 'blue', x, y, 24, 24);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#FFA';
        let margin = (24 - screen.canvas.measureTextWidth(this.value)) / 2;
        screen.canvas.fillText(this.value, x + margin, y + 20);

    }
}
class DiceZone {
    constructor(topX, topY) {
        this.topX = topX;
        this.topY = topY;
        this.walkDices = [];
        this.attackDices = [];
        this.walkRects = [];
        this.attackRects = [];
        this.shield = 0;
        this.energy = 0;
        this.locked = false;
        this.attackLogo = LogoAttImage;
        this.walkLogo = LogoStepImage;
        this.shieldLogo = LogoDefImage;
        this.energyLogo = LogoStarImage;
        this.onNewTurn();
    }
    refresh() {
        const logoSize = 28;
        const lineMargin = 34;
        const diceMargin = 3;
        this.walkRects = [];
        this.attackRects = [];
        let topX = this.topX;
        let topY = this.topY;
        for (let i = 0; i < this.walkDices.length; i++) {
            const rect = {
                x: topX + logoSize + 4 + i * 32,
                y: topY + diceMargin,
                width: 24,
                height: 24,
                dice: this.walkDices[i],
                index: i
            };
            this.walkRects.push(rect)
        }
        topY += lineMargin;
        for (let i = 0; i < this.attackDices.length; i++) {
            const rect = {
                x: topX + logoSize + 4 + i * 32,
                y: topY + diceMargin,
                width: 24,
                height: 24,
                dice: this.attackDices[i],
                index: i
            };
            this.attackRects.push(rect)
        }
    }
    paint() {
        const logoSize = 28;
        const textMargin = 23;
        const lineMargin = 34;
        let topX = this.topX;
        let topY = this.topY;
        screen.canvas.drawImage(this.walkLogo, topX, topY, logoSize, logoSize);
        for (let rect of this.walkRects) {
            rect.dice.paint(rect.x, rect.y);
        }
        topY += lineMargin;
        screen.canvas.drawImage(this.attackLogo, topX, topY, logoSize, logoSize);
        for (let rect of this.attackRects) {
            rect.dice.paint(rect.x, rect.y);
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
        this.attackDices.push(new Dice('a'));
        this.refresh();
    }
    addWalkDice() {
        this.walkDices.push(new Dice('w'));
        this.refresh();
    }
    onNewTurn() {
        this.walkDices = [];
        this.attackDices = [];
        this.addAttackDice();
        this.addWalkDice();
        this.shield = 0;
        this.energy = 0;
        this.locked = false;
    }
    lockDices() {
        this.locked = true;
        for (let d of this.attackDices.concat(this.walkDices))
            d.isSelected = false;
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
    swapDice(arr1, index1, arr2, index2) {
        const old = arr1[index1];
        arr1[index1] = arr2[index2];
        arr2[index2] = old;
        arr1[index1].isSelected = false;
        arr2[index2].isSelected = false;
        this.refresh();
    }
    update() {
        if (!input.mouseClicked || this.locked)
            return;

        const selectedAtt = this.attackDices.findIndex(d => d.isSelected);
        const selectedWalk = this.walkDices.findIndex(d => d.isSelected);
        for (let r of this.attackRects) {
            if (!isInsideRect(input.mouse, r))
                continue;
            const dice = r.dice;
            if (dice.isSelected) {
                dice.isSelected = false;
                return;
            }
            if (selectedAtt >= 0) {
                this.swapDice(this.attackDices, r.index, this.attackDices, selectedAtt);
                return;
            } else if (selectedWalk >= 0) {
                this.swapDice(this.attackDices, r.index, this.walkDices, selectedWalk);
                return;
            } else {
                dice.isSelected = true;
            }
        }
        for (let r of this.walkRects) {
            if (!isInsideRect(input.mouse, r))
                continue;
            const dice = r.dice;
            if (dice.isSelected) {
                dice.isSelected = false;
                return;
            }
            if (selectedAtt >= 0) {
                this.swapDice(this.walkDices, r.index, this.attackDices, selectedAtt);
                return;
            } else if (selectedWalk >= 0) {
                this.swapDice(this.walkDices, r.index, this.walkDices, selectedWalk);
                return;
            } else {
                dice.isSelected = true;
            }
        }
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
class ZoomCardForm {
    constructor(parent, card) {
        this.parent = parent;
        this.card = card;
        const ratio = 2;
        this.cardWith = 150 * ratio;
        this.cardHeight = 210 * ratio;
        this.cardCanvas = null;
    }
    paint() {
        if (!screen.canvas.isCanvasSameRatio(this.cardCanvas)) {
            this.cardCanvas = screen.canvas.createZoomedCanvas(this.cardWith, this.cardHeight, TemplateCardWidth, TemplateCardHeight);
        }
        paintCard(this.card, this.cardCanvas);
        const x = Math.floor(GameScreenWidth - this.cardWith) / 2;
        const y = Math.floor(GameScreenHeight - this.cardHeight) / 2;
        const margin = 20;
        screen.canvas.fillRect('rgba(255, 255, 255, 0.8)', x - margin, y - margin, this.cardWith + 2 * margin, this.cardHeight + 2 * margin)
        screen.canvas.drawFixedCanvas(this.cardCanvas, x, y);

    }
    update() {
        if (!input.mouseClicked)
            return;
        this.parent.popup = null;
    }
}
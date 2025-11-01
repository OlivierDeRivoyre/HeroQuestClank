
class LevelView {

    constructor(level) {
        this.level = level;
        this.floor = new Floor(level);
        this.heroes = Character.getHeroes();
        this.monsters = Character.getEnnemies(level);
        game.cards.playerDeck.drawToCount(5);
        this.hand = new CardZone(game.cards.playerDeck, 50, 350, (c) => this.playCard(c));
        this.diceZone = new DiceZone();
        this.hand.refresh();
    }

    update() {
        this.hand.update();
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
        this.diceZone.paint(500, 50)
        this.hand.paint();
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
        this.hand.refresh();
    }

}

class CardZone {
    constructor(deck, topX, topY, playCardFunc) {
        this.deck = deck;
        this.topX = topX;
        this.topY = topY;
        this.cardWith = 150;
        this.cardHeight = 210;
        this.cardCanvas = null;
        this.cardRects = []
        this.playCardFunc = playCardFunc;
    }
    refresh() {
        this.cardRects = []
        const cards = this.deck.hand;
        if (cards.length == 0)
            return;
        const padding = Math.min(155, (screen.width - this.cardWith - 2 * 50) / cards.length);
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
        const cards = this.deck.hand;
        if (cards.length == 0)
            return;
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

    paint() {
        this.sprite.paint(
            Floor.TopX + this.cell.x * 32,
            Floor.TopY + this.cell.y * 32 + this.marginY,
            tickNumber % 20 > 10, this.lookLeft);
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
        this.addAttackDice();
        this.addWalkDice();
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
}

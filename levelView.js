
class LevelView {

    constructor(level) {
        this.level = level;
        this.floor = new Floor(level);
        this.heroes = Character.getHeroes();
        this.monsters = Character.getEnnemies(level);
        this.cardCanvas = null;
        this.diceZone = new DiceZone();
        game.cards.playerDeck.drawToCount(5);
    }

    update() {

    }

    paint() {
        screen.clear();
        if (!screen.canvas.isCanvasSameRatio(this.cardCanvas)) {
            this.cardCanvas = screen.canvas.createZoomedCanvas(150, 210, TemplateCardWidth, TemplateCardHeight);
        }
        this.floor.paint();
        for (let c of this.heroes) {
            c.paint();
        }
        for (let c of this.monsters) {
            c.paint();
        }
        this.diceZone.paint(500, 50)

        this.paintDeckHand();
    }

    paintDeckHand() {
        const cards = game.cards.playerDeck.hand;
        if (cards.length == 0) return;
        const padding = Math.min(155, (screen.width - 150 - 2 * 50) / cards.length);
        for (let i = 0; i < cards.length; i++) {
            const currentY = 330;
            const currentX = 50 + padding * i;
            paintCard(cards[i], this.cardCanvas);

            screen.canvas.drawFixedCanvas(this.cardCanvas, currentX, currentY);

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
        screen.canvas.fillRect(this.type  == 'a'? 'red' : 'blue', x, y, 24, 24);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#FFA';
        let margin = (24 - screen.canvas.measureTextWidth(this.value)) / 2;
        screen.canvas.fillText(this.value, x + margin, y + 20);
    }
}

class DiceZone {
    constructor() {
        this.walkDices = [new Dice('w')];
        this.attackDices = [new Dice('a')];
        this.attackLogo = LogoAttImage;
        this.walkLogo = LogoStepImage;
    }
    paint(topX, topY) {
        const logoSize = 28;
        const diceMargin = 3;
        screen.canvas.drawImage(this.walkLogo, topX, topY, logoSize, logoSize);        
        for (let i = 0; i < this.walkDices.length; i++) {
            this.walkDices[i].paint(topX + logoSize + 4 + i * 32, topY + diceMargin);
        }
        topY += 30;
        screen.canvas.drawImage(this.attackLogo, topX , topY , logoSize, logoSize);
         for (let i = 0; i < this.attackDices.length; i++) {
            this.attackDices[i].paint(topX + logoSize + 4 + i * 32, topY + diceMargin);
        }
    }
}

class Character {
    constructor() {
        this.type = "hero";
        this.cell = { x: 0, y: 0 };
        this.sprite = getDungeonTileSetHeroSprite(0, 14);
        this.life = 3;
        this.maxLife = 3;
        this.shield = 0;
        this.lookLeft = true;
        this.marginY = 0;
        this.hasAttacked = false;
        this.movedStep = 0;
        this.monsterMaxWalkSteps = 8;        
        this.isSelected = false;
        this.hasStoneHearts = false;
        this.aggro = null;
        this.deadSprite = getShikashiSprite(0, 0);
        this.hasBow = false;
        this.circularAttack = false;
        this.heroIndex = -1;
    }
    static getHeroes() {
        const h1 = new Character();
        const h2 = new Character();
        const h3 = new Character();
        h1.heroIndex = 0;
        h2.heroIndex = 1;
        h3.heroIndex = 2;
        h1.sprite = getDungeonTileSetHeroSprite(0, 14);
        h2.sprite = getDungeonTileSetHeroSprite(3, 10);
        h3.sprite = getDungeonTileSetHeroSprite(5, 10);
        h1.lookLeft = h2.lookLeft = h3.lookLeft = false;
        h1.marginY = -7;
        h2.marginY = -16;
        h3.marginY = -16;
        h1.cell = { x: 0, y: 2 };
        h2.cell = { x: 2, y: 4 };
        h3.cell = { x: 0, y: 5 };
        return [h1, h2, h3];
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

        screen.canvas.fontSize = 12;
        screen.canvas.fillStyle = '#FFF';
        if (this.life > 0) {
            const text = this.life;
            const size = screen.canvas.measureText(text);
            screen.canvas.fillRect(this.hasStoneHearts ? '#2af8' : '#B228',
                rect.x, rect.y + rect.height - 2 - size.height,
                size.width + 2, size.height + 2);
            screen.canvas.fillText(text, rect.x + 1, rect.y + rect.height - 1);
        }
        if (this.shield > 0) {
            const text = this.shield;
            const size = screen.canvas.measureText(text);
            screen.canvas.fillRect('#333A',
                rect.x + rect.width - size.width - 2, rect.y + rect.height - 2 - size.height,
                size.width + 2, size.height + 2);
            screen.canvas.fillText(text, rect.x + rect.width - size.width - 1, rect.y + rect.height - 1);
        }
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
        if (!this.hasStoneHearts) {
            this.life = Math.max(0, this.life - dmg);
        } else if (dmg > 0) {
            this.life = Math.max(0, this.life - 1);
        }
        console.log(this.type + ' take ' + dmg + ' damages. Life: ' + this.life);
        if (this.aggro == null || this.aggro.life == 0) {
            if (fromCharacter && fromCharacter.type === 'hero' && this.isAround(fromCharacter.cell)) {
                this.aggro = fromCharacter;
            }
        }
    }
    onNewTurn() {
        this.shield = 0;
        this.hasAttacked = false;
        this.circularAttack = false;
        this.hasBow = false;
        this.movedStep = 0;
        this.isSelected = false;
    }
}
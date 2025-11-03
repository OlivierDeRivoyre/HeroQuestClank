class Dice {
    constructor(type) {
        this.type = type
        this.value = Math.floor(1 + Math.random() * 6);
    }
    paint(x, y, isSelected) {
        if (isSelected) {
            screen.canvas.fillRect('rgba(0, 255, 0, 1)', x - 2, y - 2, 24 + 4, 24 + 4);
        }
        screen.canvas.fillRect(this.type == 'a' ? 'red' : 'blue', x, y, 24, 24);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#FFA';
        let margin = (24 - screen.canvas.measureTextWidth(this.value)) / 2;
        screen.canvas.fillText(this.value, x + margin, y + 20);
    }
    reroll() {
        this.value = Math.floor(1 + Math.random() * 6);
    }
}
class DiceZone {
    constructor(topX, topY) {
        this.topX = topX;
        this.topY = topY;
        this.attackDices = [];
        this.attackRects = [];
        this.shield = 0;
        this.energy = 0;
        this.locked = false;
        this.attackLogo = LogoAttImage;
        this.walkLogo = LogoStepImage;
        this.shieldLogo = LogoDefImage;
        this.energyLogo = LogoStarImage;
        this.zoneRects = null;
        this.multiplyDamage = 1;
        this.changeOnebySix = false;
        this.rollNewDiceOnSix = false;
        this.onNewTurn();
    }

    getZoneRects(topX, topY) {
        const logoSize = 28;
        const lineMargin = 34;
        const diceMargin = 3;
        const textMargin = 23;
        let walkRects = [];
        let attackRects = [];
        let y = topY;
        for (let i = 0; i < this.walkDices.length; i++) {
            const rect = {
                x: topX + logoSize + 4 + i * 32,
                y: y + diceMargin,
                width: 24,
                height: 24,
                dice: this.walkDices[i],
                index: i,
                isSelected: false
            };
            walkRects.push(rect)
        }
        y += lineMargin;
        for (let i = 0; i < this.attackDices.length; i++) {
            const rect = {
                x: topX + logoSize + 4 + i * 32,
                y: y + diceMargin,
                width: 24,
                height: 24,
                dice: this.attackDices[i],
                index: i,
                isSelected: false
            };
            attackRects.push(rect)
        }
        return {
            topX,
            topY,
            logoSize,
            lineMargin,
            diceMargin,
            textMargin,
            walkRects,
            attackRects
        }
    }
    refresh() {
        this.zoneRects = this.getZoneRects(this.topX, this.topY);
    }
    paint() {
        const logoSize = this.zoneRects.logoSize;
        const textMargin = this.zoneRects.textMargin;
        const lineMargin = this.zoneRects.lineMargin;
        let topX = this.topX;
        let topY = this.topY;
        screen.canvas.drawImage(this.walkLogo, topX, topY, logoSize, logoSize);
        for (let rect of this.zoneRects.walkRects) {
            rect.dice.paint(rect.x, rect.y, rect.isSelected);
        }
        topY += lineMargin;
        if (this.multiplyDamage != 1) {
            screen.canvas.fontSize = 24;
            screen.canvas.fillStyle = '#C22';
            const text = this.multiplyDamage + ' x';
            const w = screen.canvas.measureTextWidth(text);
            screen.canvas.fillText(text, topX - 6 - w, topY + 22)
        }
        screen.canvas.drawImage(this.attackLogo, topX, topY, logoSize, logoSize);
        for (let rect of this.zoneRects.attackRects) {
            rect.dice.paint(rect.x, rect.y, rect.isSelected);
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
    addWalkDice() {
        const d = new Dice('w');
        if (this.changeOnebySix && d.value == 1)
            d.value = 6;
        this.walkDices.push(d);
        if (this.rollNewDiceOnSix && d.value == 6)
            this.addWalkDice();
        this.refresh();
    }
    addAttackDice() {
        const d = new Dice('a');
        if (this.changeOnebySix && d.value == 1)
            d.value = 6;
        this.attackDices.push(d);
        if (this.rollNewDiceOnSix && d.value == 6)
            this.addAttackDice();
        this.refresh();
    }
    oneBecameSix() {
        if (this.changeOnebySix)
            return;
        this.changeOnebySix = true;
        for (let d of this.walkDices) {
            if (d.value == 1) {
                d.value = 6;
                if (this.rollNewDiceOnSix)
                    this.addWalkDice();
            }
        }
        for (let d of this.attackDices) {
            if (d.value == 1) {
                d.value = 6;
                if (this.rollNewDiceOnSix)
                    this.addAttackDice();
            }
        }
        this.refresh();
    }
    rollNewDiceForSix() {
        if (this.rollNewDiceOnSix)
            return;
        this.rollNewDiceOnSix = true;
        for (let d of this.walkDices) {
            if (d.value == 6)
                this.addWalkDice();
        }
        for (let d of this.attackDices) {
            if (d.value == 6) {
                this.addAttackDice();
            }
        }
        this.refresh();
    }
    yams() {
        const dupes = new Array(7);
        let max = 1;
        for (let d of this.walkDices.concat(this.attackDices)) {
            const v = (dupes[d.value] || 0) + 1;
            dupes[d.value] = v;
            max = Math.max(v, max);
        }
        this.multiplyDamage *= max;
    }
    onNewTurn() {
        this.walkDices = [];
        this.attackDices = [];
        this.addAttackDice();
        this.addWalkDice();
        this.shield = 0;
        this.energy = 0;
        this.multiplyDamage = 1;
        this.changeOnebySix = false;
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
        for (let d of this.attackDices) {
            total += d.value;
        }
        return total * this.multiplyDamage;
    }
    swapDice(arr1, index1, arr2, index2) {
        const old = arr1[index1];
        arr1[index1] = arr2[index2];
        arr2[index2] = old;
        arr1[index1].isSelected = false;
        arr2[index2].isSelected = false;
        this.refresh();
    }
    click(mouseCoord) {
        if (this.locked)
            return;

        const selectedWalk = this.zoneRects.walkRects.findIndex(r => r.isSelected);
        const selectedAtt = this.zoneRects.attackRects.findIndex(r => r.isSelected);
        for (let r of this.zoneRects.attackRects) {
            if (!isInsideRect(mouseCoord, r))
                continue;
            if (r.isSelected) {
                r.isSelected = false;
                return;
            }
            if (selectedAtt >= 0) {
                this.swapDice(this.attackDices, r.index, this.attackDices, selectedAtt);
                return;
            } else if (selectedWalk >= 0) {
                this.swapDice(this.attackDices, r.index, this.walkDices, selectedWalk);
                return;
            } else {
                r.isSelected = true;
            }
        }
        for (let r of this.zoneRects.walkRects) {
            if (!isInsideRect(mouseCoord, r))
                continue;

            if (r.isSelected) {
                r.isSelected = false;
                return;
            }
            if (selectedAtt >= 0) {
                this.swapDice(this.walkDices, r.index, this.attackDices, selectedAtt);
                return;
            } else if (selectedWalk >= 0) {
                this.swapDice(this.walkDices, r.index, this.walkDices, selectedWalk);
                return;
            } else {
                r.isSelected = true;
            }
        }
    }

}

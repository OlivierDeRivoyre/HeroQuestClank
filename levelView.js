
class LevelView {

    constructor(level) {
        this.level = level;
        this.cardBackup = game.cards.backup();
        this.heroes = Character.getHeroes();
        this.monsters = Monsters.getEnnemies(this);
        this.floor = new Floor(this);
        this.menuZone = new MenuZone(this);
        this.diceZone = new DiceZone(this.heroes, 10, 40);
        this.hand = new CardZone(50, 350, GameScreenWidth - 100, (c) => this.playCard(c));
        game.cards.playerDeck.drawToCount(5);
        game.cards.uncommonShop.drawToCount(4);
        this.hand.refresh(game.cards.playerDeck.hand);
        this.popup = null;
        this.buyableCards = 0;
        this.turnDrawnCardBonus = 0;
        this.menuZone.refresh();
    }

    click(mouseCoord) {
        if (this.popup) {
            this.popup.click(mouseCoord);
            return;
        }
        this.hand.click(mouseCoord);
        this.diceZone.click(mouseCoord)
        this.menuZone.click(mouseCoord);
        this.updateHeroes(mouseCoord);
        this.floor.refresh();
    }
    updateHeroes(mouseCoord) {
        const allChars = this.heroes.concat(this.monsters);
        const selectedChar = allChars.find(c => c.isSelected && c.life > 0);
        if (selectedChar) {
            if (isInsideRect(mouseCoord, selectedChar.getRect())) {
                selectedChar.isSelected = false;
                return;
            }
            if (selectedChar.type !== "hero") {
                return;
            }
            const targetCell = this.floor.getCell(mouseCoord);
            if (!targetCell) {
                selectedChar.isSelected = false;
                return;
            }
            this.heroAction(selectedChar, targetCell);
            return;
        }
        for (let c of allChars.filter(c => c.life > 0)) {
            if (isInsideRect(mouseCoord, c.getRect())) {
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
        const monster = this.monsters.find(m => m.cell.x == targetCell.x && m.cell.y == targetCell.y && m.life > 0);
        if (monster && (hero.hasBow || hero.isAround(targetCell))) {
            console.log('attack ' + monster.type);
            const dmg = this.diceZone.getSumAttack(hero);
            monster.takeDamage(dmg, hero);
            hero.hasAttacked = true;
            hero.isSelected = false;
            this.diceZone.lockDices(hero);
            if (hero.circularAttack) {
                for (let otherMonster of this.monsters.filter(m => m !== monster && m.life > 0 && hero.isAround(m.cell))) {
                    otherMonster.takeDamage(dmg, hero);
                }
            }
            return;
        }
        const otherChar = this.heroes.concat(this.monsters)
            .find(m => m.cell.x == targetCell.x && m.cell.y == targetCell.y && m.life > 0);
        if (otherChar) {
            otherChar.isSelected = true;
            hero.isSelected = false;
            return;
        }
        const d = hero.getWalkingDistance(targetCell)
        const maxDist = this.diceZone.getSumWalk(hero);
        if (d + hero.movedStep <= maxDist) {
            hero.movedStep += d;
            hero.cell = targetCell;
            this.diceZone.lockDices(hero);
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
        for (let c of this.heroes.concat(this.monsters).sort((c1, c2) => c1.life - c2.life)) {
            c.paint();
        }
        this.menuZone.paint();
        this.diceZone.paint();
        this.hand.paint();
        if (this.popup) {
            this.popup.paint();
        }
    }

    playCard(card) {
        console.log("play " + card.title);
        game.cards.playerDeck.handToPlayed(card);
        this.applyCardEffect(card);
        this.hand.refresh(game.cards.playerDeck.hand);
        this.menuZone.refresh();
    }
    applyCardEffect(card) {
        for (let s of card.stats) {
            switch (s) {
                case 'a': this.diceZone.addAttackDice(); break;
                case 's': this.diceZone.addWalkDice(); break;
                case 'e': this.menuZone.energy++; break;
                case 'd': this.cardEffectAddShield(); break;
                case 'l': this.cardEffectGain1Life(); break;
                default: console.log('Unmanaged card stat: ' + s);
            }
        }
        for (let attr of (card.attr || [])) {
            switch (attr) {
                case 'recycle1': this.popup = new RecycleShopForm(this); break;
                case 'lost1Life': this.cardEffectLost1Life(); break;
                case 'loseTrueLive': this.cardEffectLostTrueLife(); break;
                case 'bow': this.cardEffectBow(); break;
                case 'drawCard': this.cardEffectDrawCard(); break;
                case 'rerollDices': this.cardEffectRerollDices(); break;
                case 'destroyCurrentCard': this.cardEffectDestroyCurrentCard(); break;
                case 'destroyACard': this.cardEffectDestroyACard(); break;
                case 'attackPerDrawnCard': this.cardEffectAttackPerDrawnCard(); break;
                case 'walkToAttack': this.cardEffectWalkToAttack(); break;
                case 'shieldToAttack': this.cardEffectShieldToAttack(); break;
                case 'circularAttack': this.cardEffectCircularAttack(); break;
                case 'x2': this.cardEffectDoubleDamages(); break;
                case 'd': this.cardEffectAddShield(); break;
                case 'diceOneBecameSix': this.cardEffectDiceOneBecameSix(); break;
                case 'rollNewDiceOnSix': this.cardEffectRollNewDiceOnSix(); break;
                case 'mirror': this.cardEffectMirror(); break;
                case 'yams': this.cardEffectYams(); break;
                default: console.log('Unmanaged card attr: ' + attr);
            }
        }
    }

    cardEffectAddShield() {
        this.menuZone.shield++;
        for (let h of this.heroes) {
            h.shield++;
        }
    }
    cardEffectLost1Life() {
        for (let h of this.heroes) {
            h.takeDamage(1, null);
        }
    }
    cardEffectLostTrueLife() {
        for (let h of this.heroes) {
            h.life = Math.max(0, h.life - 1);
        }
    }
    cardEffectGain1Life() {
        for (let h of this.heroes) {
            if (h.life > 0 && h.life < h.maxLife)
                h.life++;
        }
    }
    cardEffectBow() {
        for (let h of this.heroes) {
            h.hasBow = true;
        }
    }
    cardEffectDrawCard() {
        game.cards.playerDeck.drawOne();
        this.turnDrawnCardBonus++;
    }
    cardEffectAttackPerDrawnCard() {
        for (let i = 0; i < this.turnDrawnCardBonus; i++)
            this.diceZone.addAttackDice();
    }
    cardEffectRerollDices() {
        this.popup = new RerollDicesForm(this);
    }
    cardEffectDestroyCurrentCard() {
        let size = game.cards.playerDeck.played.length;
        console.log('Destroy ' + game.cards.playerDeck.played[size - 1].title);
        game.cards.playerDeck.played.splice(size - 1, 1);
    }
    cardEffectDestroyACard() {
        this.popup = new SelectPlayedCardForm(this, 'Select card to remove from your deck', (card) => {
            let index = game.cards.playerDeck.played.findIndex(c => c == card);
            if (index >= 0) {
                game.cards.playerDeck.played.splice(index, 1);
            } else {
                index = game.cards.playerDeck.hand.findIndex(c => c == card);
                if (index >= 0) {
                    game.cards.playerDeck.hand.splice(index, 1);

                }
            }
            this.hand.refresh(game.cards.playerDeck.hand);
        });
    }
    cardEffectWalkToAttack() {
        for (let i = 0; i < this.diceZone.walkDices.length; i++) {
            this.diceZone.addAttackDice();
            this.diceZone.attackDices[this.diceZone.attackDices.length - 1].value = 0;
        }
        this.diceZone.refresh();
    }
    cardEffectShieldToAttack() {
        for (let i = 0; i < this.menuZone.shield; i++) {
            this.diceZone.addAttackDice();
        }
    }
    cardEffectCircularAttack() {
        for (let h of this.heroes) {
            h.circularAttack = true;
        }
    }
    cardEffectDoubleDamages() {
        this.diceZone.doubleDamages();
    }
    cardEffectDiceOneBecameSix() {
        this.diceZone.oneBecameSix();
    }
    cardEffectRollNewDiceOnSix() {
        this.diceZone.rollNewDiceForSix();
    }
    cardEffectMirror() {
        let size = game.cards.playerDeck.played.length;
        if (size >= 2) {
            const duplicate = game.cards.playerDeck.played[size - 2];
            console.log('Mirror ' + duplicate.title);
            this.applyCardEffect(duplicate);
        }
    }
    cardEffectYams() {
        this.diceZone.yams();
    }

    openShop() {
        this.popup = new ShopForm(this);
    }
    playMonster(monster) {
        if (monster.life <= 0)
            return;
        let target = monster.aggro;
        monster.aggro = null;
        if (!target || target.life <= 0) {
            for (let h of this.heroes) {
                if (h.life <= 0)
                    continue;
                if (!target)
                    target = h;
                else if (monster.getWalkingDistance(h.cell) < monster.getWalkingDistance(target.cell))
                    target = h;
            }
        }
        if (!target || target.life <= 0)
            return;
        if (!monster.hasBow && !monster.isAround(target.cell)) {
            const newCell = this.getCellToMoveTo(monster, target.cell, monster.monsterMaxWalkSteps);
            if (!newCell)
                return;
            monster.cell = newCell;
        }
        if (monster.hasBow || monster.isAround(target.cell)) {
            target.takeDamage(this.menuZone.monsterDamage, monster);
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
        game.turnNumber++;
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
        this.turnDrawnCardBonus = 0;
        this.menuZone.endTurn();
        this.diceZone.onNewTurn();
        game.cards.playerDeck.endTurn();
        game.cards.playerDeck.drawToCount(5);
        game.cards.uncommonShop.drawToCount(4);
        this.hand.refresh(game.cards.playerDeck.hand);
        this.menuZone.refresh();
    }
}


class Floor {
    static TopX = 316;
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
            : selectedChar.type === 'hero' ? this.levelView.diceZone.getSumWalk(selectedChar) - selectedChar.movedStep
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
        const occuped = allChars.find(c => c.cell.x == i && c.cell.y == j && c.life > 0);
        if (!occuped)
            return 'rgba(0, 255, 0, 0.10)';
        const isOccupedByHero = occuped.type === 'hero';
        if (isOccupedByHero == isHero) {
            return null;
        }
        return 'rgba(255, 145, 0, 0.50)';
    }
}

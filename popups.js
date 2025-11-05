class Button {
    constructor(text, x, y, width, height, clickFunc) {
        this.text = text;
        this.rect = { x, y, width, height };
        this.clickFunc = clickFunc;
    }
    paint() {
        screen.canvas.fillRect('#AAA', this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#222';
        const size = screen.canvas.measureTextWidth(this.text);
        const margin = (this.rect.width - size) / 2;
        screen.canvas.fillText(this.text, this.rect.x + margin, this.rect.y + 26);
    }
    click(mouseCoord) {

        if (isInsideRect(mouseCoord, this.rect))
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
        this.availableEnergy = this.parent.menuZone.energy;
        const cards = game.cards.commonCards.concat(game.cards.uncommonShop.hand);
        cards.sort((c1, c2) => c1.cost - c2.cost)
        this.cardZone.refresh(cards);
        this.parent.menuZone.refresh();
        for (let rect of this.cardZone.cardRects)
            rect.isEnabled = rect.card.cost <= this.availableEnergy;
    }
    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEE', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fillStyle = '#222';
        screen.canvas.fontSize = 24;
        screen.canvas.fillText('You have ' + this.availableEnergy + ' ernergies', margin + 50, margin + 50);
        this.cardZone.paint();
        this.closeButton.paint();
    }
    click(mouseCoord) {
        this.cardZone.click(mouseCoord);
        this.closeButton.click(mouseCoord);
    }
    tryBuyCard(card) {
        console.log("try to buy " + card.title);
        if (this.availableEnergy >= card.cost) {
            this.availableEnergy -= card.cost;
            this.parent.menuZone.energy = this.availableEnergy;
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
        this.retryButton = new Button('Retry level ' + this.parent.level, 260, 400, 200, 40, () => this.retryLevel());
        this.restartButton = new Button('Restart game', 540, 400, 200, 40, () => this.restartGame());
    }
    click(mouseCoord) {
        this.retryButton.click(mouseCoord);
        this.restartButton.click(mouseCoord);
    }
    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEED', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fontSize = 40;
        screen.canvas.fillStyle = 'red'
        screen.canvas.fillText('You have lost', margin + 50, margin + 50);
        this.retryButton.paint();
        this.restartButton.paint();
    }
    retryLevel(){
        const backup = this.parent.cardBackup;
        game.cards.restore(backup);
        game.currentView = new LevelView(this.parent.level);
    }
    restartGame(){
        game.newGame();
    }
}
class WinLevelScreen {
    constructor(parent) {
        this.parent = parent;
        this.message = 'You enter the level ' + (this.parent.level + 1) + ' / 20';
        this.closeButton = new Button('Enter level', 400, 400, 120, 40, () => this.nextLevel());
        if(this.parent.level >= 20){
            this.message = 'You finished the game in ' + game.turnNumber + ' turns';
            this.closeButton = new Button('Replay', 600, 400, 120, 40, () => game.newGame());
        }
    }
    click(mouseCoord) {
        this.closeButton.click(mouseCoord);
    }

    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEE', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fontSize = 40;
        screen.canvas.fillStyle = 'green'
        screen.canvas.fillText(this.message, margin + 150, margin + 150);        
        screen.canvas.fontSize = 20;
        screen.canvas.fillStyle = 'gray'
        screen.canvas.fillText('Turns: ' + game.turnNumber, margin + 50, margin + 390);
        
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
    click(mouseCoord) {
        this.parent.popup = null;
    }
}
class RecycleShopForm {
    constructor(parent) {
        this.parent = parent;
        this.cardZone = new CardZone(120, 200, GameScreenWidth - 240, (c) => this.recycle(c));
        this.closeButton = new Button('Close', GameScreenWidth - 160, GameScreenHeight - 120, 80, 40, () => this.close());
        this.refresh();
    }
    refresh() {
        const cards = game.cards.uncommonShop.hand;
        cards.sort((c1, c2) => c1.cost - c2.cost)
        this.cardZone.refresh(cards);
    }
    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEE', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fontColor = '#040';
        screen.canvas.fontSize = 24;
        screen.canvas.fillText('Select the card to remove from store', margin + 50, margin + 50);
        this.cardZone.paint();
        this.closeButton.paint();
    }
    click(mouseCoord) {
        this.cardZone.click(mouseCoord);
        this.closeButton.click(mouseCoord);
    }
    recycle(card) {
        console.log("Recycle " + card.title);
        game.cards.uncommonShop.handToDiscard(card);
        game.cards.uncommonShop.drawOne();
        this.parent.menuZone.refresh();
        this.parent.popup = null;
    }
    close() {
        this.parent.popup = null;
    }
}

class RerollDicesForm {
    constructor(parent) {
        this.parent = parent;
        this.heroDices = [];
        for (let i = 0; i < this.parent.heroes.length; i++) {
            const zone = new HeroDiceZone(this.parent.heroes[i], 400, 200 + i * 72);
            zone.walkDices = this.parent.diceZone.heroDices[i].walkDices;
            zone.attackDices = this.parent.diceZone.heroDices[i].attackDices;
            zone.refresh();
            this.heroDices.push(zone);
        }
        this.closeButton = new Button('Close', GameScreenWidth - 160, GameScreenHeight - 120, 80, 40, () => this.close());
    }
    paint() {
        const margin = 50;
        screen.canvas.fillRect('#EEE', margin, margin, GameScreenWidth - margin * 2, GameScreenHeight - margin * 2);
        screen.canvas.fillStyle = '#040';
        screen.canvas.fontSize = 24;
        screen.canvas.fillText('Select dices to reroll', margin + 50, margin + 50);

        for (let hd of this.heroDices)
            hd.paint();

        this.closeButton.paint();
    }
    click(mouseCoord) {
        for (let hd of this.heroDices) {
            for (let r of hd.zoneRects.walkRects.concat(hd.zoneRects.attackRects)) {
                if (!isInsideRect(mouseCoord, r))
                    continue;
                if (r.isSelected)
                    continue;
                if (r.dice.value == 0)
                    continue;
                r.isSelected = true;
                this.reroll(r.dice);
            }
        }
        this.closeButton.click(mouseCoord);
    }
    reroll(dice) {
        console.log("Reroll " + dice.value);
        dice.reroll();
    }
    close() {
        this.parent.popup = null;
    }
}
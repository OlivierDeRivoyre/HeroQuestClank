class MenuZone {
    constructor(levelView) {
        this.levelView = levelView;
        this.topX = Floor.TopX + 10;;
        this.topY = 280;//+6
        this.shield = 0;
        this.energy = 0;
        this.buyableCards = 0;
        this.shieldLogo = LogoDefImage;
        this.energyLogo = LogoStarImage;
        this.shopButton = new Button('Shop', this.topX + 160, this.topY, 80, 40, () => levelView.openShop());
        this.endTurnButton = new Button('End turn', this.topX + 250, this.topY, 120, 40, () => levelView.endTurn());
    }
    paint() {
        const logoSize = 28;
        const textMargin = 23;
        let topX = this.topX;
        let topY = this.topY;

        screen.canvas.drawImage(this.shieldLogo, topX, topY, logoSize, logoSize);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#222';
        screen.canvas.fillText(this.shield, topX + logoSize + 4, topY + textMargin);

        topX += 80;
        screen.canvas.drawImage(this.energyLogo, topX, topY, logoSize, logoSize);
        screen.canvas.fontSize = 24;
        screen.canvas.fillStyle = '#222';
        screen.canvas.fillText(this.energy, topX + logoSize + 4, topY + textMargin);

        this.shopButton.paint();
        this.endTurnButton.paint();
        this.paintBuyableCards();
    }
    click(mouseCoord) {
        this.shopButton.click(mouseCoord);
        this.endTurnButton.click(mouseCoord);
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
    refresh() {
        const cards = game.cards.commonCards.concat(game.cards.uncommonShop.hand);
        this.buyableCards = cards.filter(c => c.cost <= this.energy).length;
    }
}

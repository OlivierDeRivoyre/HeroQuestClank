class LevelView {

    constructor() {
        this.sampleSprite = getDungeonTileSetHeroSprite(0, 14);
        this.cardCanvas = null;
        game.cards.playerDeck.drawToCount(5);
    }

    update() {

    }

    paint() {
        screen.clear();
        if (!screen.canvas.isCanvasSameRatio(this.cardCanvas)) {
            this.cardCanvas = screen.canvas.createZoomedCanvas(150, 210, TemplateCardWidth, TemplateCardHeight);
        }
        this.sampleSprite.paint(50, 50, tickNumber % 20 > 10, true);
        this.sampleSprite.paint(50, 100, tickNumber % 20 > 10, false);
        this.paintDeckHand();
    }

    paintDeckHand() {
        const cards = game.cards.playerDeck.hand;
        if (cards.length == 0) return;
        for (let i = 0; i < cards.length; i++) {
            const currentY = 200;
            const currentX = 50 + 50 * i;
            paintCard(cards[i], this.cardCanvas);
            screen.canvas.drawFixedCanvas(this.cardCanvas, currentX, currentY);
        }
    }

}
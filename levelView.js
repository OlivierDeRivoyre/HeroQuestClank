class LevelView {

    constructor() {
        this.sampleSprite = getDungeonTileSetHeroSprite(0, 14);

        game.cards.playerDeck.drawToCount(5);
    }

    update() {

    }

    paint() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.sampleSprite.paint(50, 50, tickNumber % 20 > 10, true);
        this.paintDeckHand();
    }

    paintDeckHand(){
        const cards = game.cards.playerDeck.hand;
        if(cards.length == 0) return;
        for(let i = 0; i < cards.length; i++){
            const currentY = 200;
            const currentX = 50 + 50 * i;
            const img = cards[i].bigCanvas;
            ctx.drawImage(img, currentX, currentY, 150, 210);
        }
    }

}
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
            if (c.isEnabled === false)
                screen.canvas.fillRect('rgba(0,0,0, 0.4)', c.x, c.y, c.width, c.height)
        }
        if (this.popup)
            this.popup.paint();
    }
    click(mouseCoord) {
        if (this.popup) {
            this.popup.click(mouseCoord);
            return;
        }
        for (let c of this.cardRects) {
            if (isInsideRect(mouseCoord, c)) {
                if (isInsideRect({ x: mouseCoord.x, y: mouseCoord.y - c.height / 2 }, c)) {
                    this.popup = new ZoomCardForm(this, c.card);
                    return;
                }
                this.playCardFunc(c.card);
                return;
            }
        }
    }
}


//const canvas =  createBigCardCanvas();
function show(incr) {
    currentCardIndex = Math.max(0, Math.min(currentCardIndex + incr, allCards.length - 1));
    const card = allCards[currentCardIndex];
    const screenCanvas = document.getElementById('paintCanvas');
    const fixedCanvas = new FixedCanvas(CardWidth, CardHeight, screenCanvas);
    paintCard(card, fixedCanvas)
    //const ctx = screenCanvas.getContext('2d');
    //ctx.drawImage(card.bigCanvas, 0, 0);
}

onCardImageReadyfunc = () => show(0);

function downloadAsImage() {
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function createFixedCardCanvasForMiniatures() {
    const canvas = document.createElement('canvas');
    canvas.width = CardWidth;
    canvas.height = CardHeight;
    const ctx = canvas.getContext('2d');
    ctx.font = '24px "MedievalSharp"';
    const fixedCanvas = new FixedCanvas(CardWidth, CardHeight, canvas);
    return fixedCanvas;
}

function createMinatutes() {
    const a4Width = 2000;
    const a4Height = 3000;
    const nbCardPerLine = 5;
    const cardWidth = 400;
    const cardHeight = 560;
    const marginX = Math.floor((a4Width - nbCardPerLine * cardWidth) / 2);
    const marginY = Math.floor((a4Height - nbCardPerLine * cardHeight) / 2);

    function createPageCanvas() {
        const newCanvas = document.createElement('canvas');
        const newCtx = newCanvas.getContext('2d');
        newCanvas.width = a4Width;
        newCanvas.height = a4Height;
        document.body.appendChild(newCanvas);
        return newCtx;
    }
    let page;
    let index = 0;
    const fixedCanvas = createFixedCardCanvasForMiniatures();
    for (let card of allCards) {        
         paintCard(card, fixedCanvas);
        const quantity = card.quantity || 1;
        for (let i = 0; i < quantity; i++) {
            const coord = index % (nbCardPerLine * nbCardPerLine);
            if (coord == 0) {
                page = createPageCanvas();
            }
            page.drawImage(fixedCanvas.screenCanvas,
                marginX + (coord % nbCardPerLine) * (cardWidth + 0),
                marginY + Math.floor(coord / nbCardPerLine) * (cardHeight + 0),
                cardWidth,
                cardHeight);
            index++;
        }
    }


}
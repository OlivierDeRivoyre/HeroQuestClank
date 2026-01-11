

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search)
let currentCardIndex = parseInt(params.get('index') || 0);



AddExt1();
function show(incr) {
    currentCardIndex = Math.max(0, Math.min(currentCardIndex + incr, allCards.length - 1));
    const card = allCards[currentCardIndex];
    showCard(card);
    url.searchParams.set('index', currentCardIndex);
    window.history.pushState({}, '', url);
}
function showCard(card) {
    const screenCanvas = document.getElementById('paintCanvas');
    const fixedCanvas = new FixedCanvas(TemplateCardWidth, TemplateCardHeight, screenCanvas);
    paintCard(card, fixedCanvas);
}

onCardImageReadyfunc = () => {
    show(0);
    let count = 0;
    for (let c of allCards) {
        count += (c.quantity || 1);
    }
    document.getElementById("MiniaturesButton").innerText = "Miniatures of " + count + " cards";
}

function downloadImages() {
    const sorted = orderCards();
    for (let i = 0; i < sorted.length; i++) {
        const card = sorted[i];
        showCard(card);
        const screenCanvas = document.getElementById('paintCanvas');
        const link = document.createElement('a');
        link.download = 'card' + i + 'x' + (card.quantity || 1) + '.png';
        link.href = screenCanvas.toDataURL('image/png');
        link.click();
    }
}

function createFixedCardCanvasForMiniatures(cardWidth, cardHeight) {
    const canvas = document.createElement('canvas');
    canvas.width = cardWidth;
    canvas.height = cardHeight;
    const ctx = canvas.getContext('2d');
    ctx.font = '24px "MedievalSharp"';
    const fixedCanvas = new FixedCanvas(TemplateCardWidth, TemplateCardHeight, canvas);
    return fixedCanvas;
}
const backImage = loadImg('back3.png');

function orderCards() {
    const sorted = [...allCards];
    const rankType = {}
    rankType["hero"] = 1;
    rankType["monster"] = 2;
    rankType["dungeon"] = 3;    
    rankType["base"] = 4;
    rankType["common"] = 5;
    rankType["T1"] = 6;
    rankType["T2"] = 7;
    rankType["artifact"] = 8;
    function isJoker(c){
        return c.cost == 0 && c.desc.length == 0 && c.stats.length == 0;
    }
    sorted.sort((a, b) => {
        if(isJoker(a) != isJoker(b)){
            if(isJoker(a))
                return 1;
            return -1;
        }
        if (a.type !== b.type) {
            return (rankType[a.type]||0) - (rankType[b.type]||0);
        }
        if (a.stats.length != b.stats.length) {
            return a.stats.length - b.stats.length;
        }
        if (a.cost != b.cost) {
            return a.cost - b.cost;
        }
        return a.title.localeCompare(b.title); 
    });
    return sorted;
}
function createMinatutes() {
    const a4Width = 2000;
    const a4Height = 3000;
    const nbCardPerLine = 3;
    const cardWidth = 400 + 200;
    const cardHeight = 560 + 280;
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
    const fixedCanvas = createFixedCardCanvasForMiniatures(cardWidth, cardHeight);
    for (let card of orderCards()) {
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
    page = createPageCanvas();
    for (let coord = 0; coord < nbCardPerLine * nbCardPerLine; coord++) {
        page.drawImage(backImage,
            marginX + (coord % nbCardPerLine) * (cardWidth + 0),
            marginY + Math.floor(coord / nbCardPerLine) * (cardHeight + 0),
            cardWidth,
            cardHeight);
    }

}
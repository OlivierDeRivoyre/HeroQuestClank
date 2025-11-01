function createBigCardCanvas(){
    const canvas = document.createElement('canvas');
    canvas.width = 1500;
    canvas.height = 2100;
    const ctx = canvas.getContext('2d');
    ctx.font = '24px "MedievalSharp"';
    return canvas;
}

function loadImg(file) {
    const image = new Image();
    image.src = "img/"+ file;
    return image;
}
const CadreExtImage = loadImg('CadreExt.png');
const DescriptionZoneImage = loadImg('DescriptionZone.png');
const LogoAttImage = loadImg('LogoAtt.png');
const LogoDefImage = loadImg('LogoDef.png');
const LogoLifeImage = loadImg('LogoLife.png');
const LogoStarImage = loadImg('LogoStar.png');
const LogoStepImage = loadImg('LogoStep.png');
const PureStarImage = loadImg('PureStar.png');

const bgImage = loadImg('Parchment1500_2100.png');

let onBigCardPaintedfunc = null;
bgImage.onload = function () {
    document.fonts.load('24px "MedievalSharp"')
        .then(() => loadCards());
};

function loadCards() {
    for (let c of allCards) {
        c.img = loadImg(c.pictureName + '.png');
    }
    allCards[allCards.length - 1].img.onload = function () {
        paintCards();
    }    
}

function paintCards(){
    for(let card of allCards){
        paintCard(card);
    }
    if(onBigCardPaintedfunc){
        onBigCardPaintedfunc();
    }
}

function paintCard(card) {
    const canvas =  createBigCardCanvas();
    card.bigCanvas = canvas;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    if (card.type == 'base') {
        ctx.fillStyle = 'rgba(0, 0, 20, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (card.type == 'common') {
        ctx.fillStyle = 'rgba(243, 239, 7, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    const ratio = 2;
    const margin = (canvas.width - CadreExtImage.width * ratio) / 2;
    let top = margin + 40;
    ctx.drawImage(card.img, margin, top, CadreExtImage.width * ratio, CadreExtImage.height * ratio);
    ctx.drawImage(CadreExtImage, margin, top, CadreExtImage.width * ratio, CadreExtImage.height * ratio);

    // Energy/cost
    if (card.cost) {
        const starX = canvas.width - margin - PureStarImage.width * ratio - 24;
        const starY = top - 20;
        for (let i = 0; i < card.cost; i++) {
            ctx.drawImage(PureStarImage, starX - i * 66, starY, PureStarImage.width * ratio, PureStarImage.height * ratio);
        }
    }

    top += CadreExtImage.height * ratio;
    top += 20;
    ctx.drawImage(DescriptionZoneImage, margin - 22, top, DescriptionZoneImage.width * ratio, DescriptionZoneImage.height * ratio);

    // Title
    const text = card.title;
    ctx.font = '72px "MedievalSharp"';
    ctx.fillStyle = '#002';
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const x = (canvas.width - textWidth) / 2;
    ctx.fillText(text, x, top + 104);

    // description
    ctx.font = '54px "MedievalSharp"';
    let descTop = top + 214;
    for (let line of card.desc) {
        let x = margin + 40;
        for (let word of line) {
            if (word.length == 1) {
                const logo = getLogo(word);
                ctx.drawImage(logo, x, descTop - logo.height + 10);
                x += logo.width + 8;
            } else {
                ctx.fillText(word, x, descTop);
                x += ctx.measureText(word).width;
            }
        }
        descTop += 60;
    }

    // stats
    top += DescriptionZoneImage.height * ratio - 140;
    const step = (canvas.width - 2 * margin) / (1 + card.stats.length);
    for (let i = 0; i < card.stats.length; i++) {
        const logo = getLogo(card.stats[i]);
        const logoRatio = 3;
        const logoOffSet = logo.width * logoRatio / 2;
        ctx.drawImage(logo, margin + step * (i + 1) - logoOffSet, top, logo.width * logoRatio, logo.height * logoRatio);
    }

}
function getLogo(c) {
    switch (c) {
        case 'a': return LogoAttImage;
        case 'd': return LogoDefImage;
        case 'e': return LogoStarImage;
        case 's': return LogoStepImage;
        case 'l': return LogoLifeImage;
    }
}
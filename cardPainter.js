const CardWidth = 1500;
const CardHeight = 2100;



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

let onCardImageReadyfunc = null;
bgImage.onload = function () {
    document.fonts.load('24px "MedievalSharp"')
        .then(() => loadCardImages());
};

function loadCardImages() {
    for (let c of allCards) {
        c.img = loadImg(c.pictureName + '.png');
    }
    if(onCardImageReadyfunc){
        allCards[allCards.length - 1].img.onload = function(){
            onCardImageReadyfunc();
        }
    }  
}


function paintCard(card, canvas) {        
    
    canvas.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    if (card.type == 'base') {
        canvas.fillColor('rgba(0, 0, 20, 0.25)');
    }
    if (card.type == 'common') {        
        canvas.fillColor('rgba(243, 239, 7, 0.25)');        
    }
   
    const ratio = 2;
    const margin = (canvas.width - CadreExtImage.width * ratio) / 2;
    let top = margin + 40;
    canvas.drawImage(card.img, margin, top, CadreExtImage.width * ratio, CadreExtImage.height * ratio);
    canvas.drawImage(CadreExtImage, margin, top, CadreExtImage.width * ratio, CadreExtImage.height * ratio);

    // Energy/cost
    if (card.cost) {
        const starX = canvas.width - margin - PureStarImage.width * ratio - 24;
        const starY = top - 20;
        for (let i = 0; i < card.cost; i++) {
            canvas.drawImage(PureStarImage, starX - i * 66, starY, PureStarImage.width * ratio, PureStarImage.height * ratio);
        }
    }

    top += CadreExtImage.height * ratio;
    top += 20;
    canvas.drawImage(DescriptionZoneImage, margin - 22, top, DescriptionZoneImage.width * ratio, DescriptionZoneImage.height * ratio);

    // Title
    const text = card.title;
    canvas.fontSize = 72;
    canvas.fillStyle = '#002';    
    const textWidth = canvas.measureTextWidth(text);
    const x = (canvas.width - textWidth) / 2;
    canvas.fillText(text, x, top + 104);
    // description
    canvas.fontSize = 54;
    let descTop = top + 214;
    for (let line of card.desc) {
        let x = margin + 40;
        for (let word of line) {
            if (word.length == 1) {
                const logo = getLogo(word);
                canvas.drawImage(logo, x, descTop - logo.height + 10);
                x += logo.width + 8;
            } else {
                canvas.fillText(word, x, descTop);
                x += canvas.measureTextWidth(word);
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
        canvas.drawImage(logo, margin + step * (i + 1) - logoOffSet, top, logo.width * logoRatio, logo.height * logoRatio);
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
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
ctx.font = '24px "MedievalSharp"';

function loadImg(file){
    const image = new Image();
    image.src = file; 
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

bgImage.onload = function() {
    document.fonts.load('24px "MedievalSharp"').then(() => drawCard(currentCard));
};

function mulberry32(seed) {
    return function() {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
let rand = mulberry32(12345);

let currentCard = {
    title : 'Attack',
    desc: [
        ['Perdez un point de vie, peut être évité avec un']
        ,['bouclier.']
    ],
    stats: ['a', 'a']
};

function drawCard(card) {
   

    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    const ratio = 2;   
    const margin = (canvas.width - CadreExtImage.width*ratio) / 2;
    let top = margin + 40;
    ctx.drawImage(CadreExtImage, margin, top, CadreExtImage.width * ratio, CadreExtImage.height * ratio);
    top += CadreExtImage.height * ratio;
     
    top += 20;
    ctx.drawImage(DescriptionZoneImage, margin - 22, top, DescriptionZoneImage.width*ratio, DescriptionZoneImage.height*ratio);


    const text = card.title;
    ctx.font = '72px "MedievalSharp"';
    ctx.fillStyle = '#002';
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;    
    const x = (canvas.width - textWidth) / 2;
    ctx.fillText(text, x, top + 100);

    ctx.font = '54px "MedievalSharp"';
    let descTop = top + 214;
    for(let line of card.desc){
        let x = margin + 40;
        for(let word of line){            
            ctx.fillText(word, x, descTop);
            x += ctx.measureText(word).width;
        }
        descTop+= 60;
    }


    top += DescriptionZoneImage.height * ratio - 100;
    const step = (canvas.width - 2 * margin) / (1 + card.stats.length);
    for(let i = 0; i < card.stats.length; i++){
        const logo = LogoAttImage;
        const logoOffSet = logo.width* ratio / 2;
        ctx.drawImage(logo, margin + step * (i +1)-logoOffSet, top, logo.width* ratio, logo.height * ratio);    
    }

}

function downloadAsImage(){
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

//downloadAsImage()
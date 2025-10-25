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
    document.fonts.load('24px "MedievalSharp"').then(() => loadCard());
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


function loadCard() {
    const card = allCards[currentCardIndex % allCards.length];
    card.img = loadImg(card.pictureName + '.png');
    card.img.onload  = function() {
        drawCard(card);
    }
}

function drawCard(card) {   

    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    if(card.type == 'base'){
        ctx.fillStyle = 'rgba(0, 0, 20, 0.25)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if(card.type == 'common'){
        ctx.fillStyle = 'rgba(243, 239, 7, 0.25)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    const ratio = 2;   
    const margin = (canvas.width - CadreExtImage.width*ratio) / 2;
    let top = margin + 40;     
    ctx.drawImage(card.img, margin, top, CadreExtImage.width * ratio, CadreExtImage.height * ratio);   
    ctx.drawImage(CadreExtImage, margin, top, CadreExtImage.width * ratio, CadreExtImage.height * ratio);
    
    // Energy/cost
    if(card.cost){
        const starX = canvas.width - margin - PureStarImage.width * ratio - 24;
        const starY = top - 20;
        for(let i = 0; i < card.cost; i++){
            ctx.drawImage(PureStarImage, starX - i * 66, starY, PureStarImage.width * ratio, PureStarImage.height * ratio);
        }      
    }

    top += CadreExtImage.height * ratio;
    top += 20;
    ctx.drawImage(DescriptionZoneImage, margin - 22, top, DescriptionZoneImage.width*ratio, DescriptionZoneImage.height*ratio);

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
    for(let line of card.desc){
        let x = margin + 40;
        for(let word of line){       
            if(word.length == 1){
                const logo = getLogo(word);
                ctx.drawImage(logo, x, descTop - logo.height + 10);
                x += logo.width + 8;
            } else {
                ctx.fillText(word, x, descTop);
                x += ctx.measureText(word).width;
            }
        }
        descTop+= 60;
    }

    // stats
    top += DescriptionZoneImage.height * ratio - 140;
    const step = (canvas.width - 2 * margin) / (1 + card.stats.length);
    for(let i = 0; i < card.stats.length; i++){
        const logo = getLogo(card.stats[i]);
        const logoRatio = 3;
        const logoOffSet = logo.width* logoRatio / 2;
        ctx.drawImage(logo, margin + step * (i +1)-logoOffSet, top, logo.width* logoRatio, logo.height * logoRatio);    
    }

}
function getLogo(c){
    switch(c){
        case 'a' : return LogoAttImage;
        case 'd' : return LogoDefImage;
        case 'e' : return LogoStarImage;
        case 's' : return LogoStepImage;
        case 'l' : return LogoLifeImage;
    }
}

function show(incr){
 currentCardIndex = Math.max(0, currentCardIndex + incr);
 loadCard();
}

function downloadAsImage(){
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

const allCards = [
    {
        type: 'base',
        title : 'Force Accrue',
        desc: [
            ['a', ': Utilisez un dé d’attaque supplémentaire']
        ],
        cost: 0,
        stats: ['a'],
        pictureName: 'Furry1'
    },
    {
        type: 'common',
        title : 'Assaut Fulgurant',
        desc: [],
        cost: 3,
        stats: ['a', 's'],
        pictureName: 'AttStep'
    },
    {
        title : 'Energie',
        desc: [
            ['Perdez un point de vie, peut être évité avec un']
            ,['bouclier.']
        ],
        cost: 3,
        stats: ['a', 'e', 'd', 'l', 's'],
        pictureName: 'Furry1'
    },
        {
        title : 'Force Accrue',
        desc: [
            ['Perdez un point de vie, peut être évité avec un']
            ,['bouclier.']
        ],
        cost: 3,
        stats: ['a', 'e', 'd', 'l', 's'],
        pictureName: 'Furry1'
    },
];
let currentCardIndex = 0;

console.clear();
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
    document.fonts.load('24px "MedievalSharp"').then(() => loadCards());
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


function loadCards() {
    for(let c of allCards){
        c.img = loadImg(c.pictureName + '.png');
    }
    allCards[allCards.length - 1].img.onload  = function() {
        drawCard();
    }
}

function drawCard() {
    const card = allCards[currentCardIndex % allCards.length];    
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
 currentCardIndex = Math.max(0, Math.min(currentCardIndex + incr, allCards.length - 1));
 drawCard();
}

function downloadAsImage(){
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

const allCards = [
    {
        title : 'Attaque',
        type: 'base',
        desc: [
            ['a', ': Gagnez un dé d’attaque supplémentaire']
        ],
        cost: 0,
        stats: ['a'],
        pictureName: 'attack2'
    },
    {
        title : 'Energie',
        type: 'base',
        desc: [
            ['e', ': Gagnez un point d’énergie, utilisable pour'],
            ['acheter des cartes au magasin.']
        ],
        cost: 0,
        stats: ['e'],
        pictureName: 'EnergyCard2'
    },
    {
        title : 'Defense',
        type: 'base',
        desc: [
            ['d', ': prévenez un dégât.']
        ],
        cost: 0,
        stats: ['d'],
        pictureName: 'Bouclier1'
    },
    {
        title : 'Déplacement',
        type: 'base',
        desc: [
            ['s', ': gagnez un dé de déplacement'],
            ['supplémentaire']
        ],
        cost: 0,
        stats: ['s'],
        pictureName: 'Step1'
    },
    {
        title : 'Malédiction',
        type: 'base',
        desc: [
            ['Perdez un point de vie, évitable avec un ', 'd']
        ],
        cost: 0,
        stats: [],
        pictureName: 'arrowTrap'
    },
    {
        title : 'Assaut Fulgurant',
        type: 'common',
        desc: [
            ['a', ': Gagnez un dé d’attaque supplémentaire'],
            ['s', ': gagnez un dé de déplacement'],
            ['supplémentaire']
        ],
        cost: 3,
        stats: ['a', 's'],
        pictureName: 'AttStep'
    },
    {
        title : 'Bénédiction',
        type: 'common',
        desc: [
            ['e', 'e',': Gagnez deux point d’énergie.'],
        ],
        cost: 2,
        stats: ['e', 'e'],
        pictureName: 'EnergyCard'
    },
    {
        title : 'Rencontre',
        type: 'common',
        desc: [
            ['e', ': Gagnez un point d’énergie.'],
            ['d', ': prévenez un dégât.']
        ],
        cost: 2,
        stats: ['e', 'd'],
        pictureName: 'ReceivingShield2'
    },
    {
        title : 'Lance Pierre',
        desc: [
            ['Vous pouvez attaquer à distance']            
        ],
        cost: 2,
        stats: [],
        pictureName: 'LancePierre'
    },

];
let currentCardIndex = allCards.length - 2;


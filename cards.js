
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


const allCards = [
    {
        title: 'Attaque',
        type: 'base',
        desc: [
            ['a', ': Gagnez un dé d’attaque supplémentaire']
        ],
        cost: 0,
        stats: ['a'],
        pictureName: 'attack2',
        quantity: 8
    },
    {
        title: 'Energie',
        type: 'base',
        desc: [
            ['e', ': Gagnez un point d’énergie, utilisable pour'],
            ['acheter des cartes au magasin.']
        ],
        cost: 0,
        stats: ['e'],
        pictureName: 'EnergyCard2',
        quantity: 12
    },
    {
        title: 'Defense',
        type: 'base',
        desc: [
            ['d', ': prévenez un dégât.']
        ],
        cost: 0,
        stats: ['d'],
        pictureName: 'Bouclier1',
        quantity: 8
    },
    {
        title: 'Déplacement',
        type: 'base',
        desc: [
            ['s', ': gagnez un dé de déplacement'],
            ['supplémentaire']
        ],
        cost: 0,
        stats: ['s'],
        pictureName: 'Step1',
        quantity: 8
    },
    {
        title: 'Malédiction',
        type: 'base',
        desc: [
            ['Perdez un point de vie, évitable avec un ', 'd']
        ],
        cost: 0,
        stats: [],
        pictureName: 'arrowTrap',
        quantity: 4
    },
    {
        title: 'Assaut Fulgurant',
        type: 'common',
        desc: [
            ['a', ': Gagnez un dé d’attaque supplémentaire'],
            ['s', ': gagnez un dé de déplacement'],
            ['supplémentaire']
        ],
        cost: 3,
        stats: ['a', 's'],
        pictureName: 'AttStep',
        quantity: 12
    },
    {
        title: 'Bénédiction',
        type: 'common',
        desc: [
            ['e', 'e', ': Gagnez deux point d’énergie.'],
        ],
        cost: 2,
        stats: ['e', 'e'],
        pictureName: 'EnergyCard',
        quantity: 12
    },
    {
        title: 'Rencontre',
        type: 'common',
        desc: [
            ['e', ': Gagnez un point d’énergie.'],
            ['d', ': prévenez un dégât.']
        ],
        cost: 2,
        stats: ['e', 'd'],
        pictureName: 'ReceivingShield2',
        quantity: 10
    },
    {
        title: 'Arc',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à distance.']
        ],
        cost: 2,
        stats: [],
        pictureName: 'bow2'
    },
    {
        title: 'Arc Rapide',
        type: 'T1',
        desc: [
            ['Piochez une carte supplémentaire.'],
            ['Vous pouvez attaquer à distance.']
        ],
        cost: 3,
        stats: [],
        pictureName: 'bowGold'
    },
    {
        title: 'Arc Léger',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à distance.']
        ],
        cost: 2,
        stats: ['s'],
        pictureName: 'bow5'
    },
    {
        title: 'Arc long',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à distance.']
        ],
        cost: 3,
        stats: ['a'],
        pictureName: 'bow1'
    },
    {
        title: 'Arc étoilé',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à distance.']
        ],
        cost: 3,
        stats: ['e'],
        pictureName: 'starBow'
    },
    {
        title: 'Seconde chance',
        type: 'T1',
        desc: [
            ['Relancez un dé']
        ],
        cost: 2,
        stats: [],
        pictureName: 'clover1'
    },
    {
        title: 'Coup de foudre',
        type: 'T1',
        desc: [
            ['Détruisez cette carte, piochez 3 cartes.']
        ],
        cost: 2,
        stats: [],
        pictureName: 'thunder'
    },
    {
        title: 'Serpillière',
        type: 'T1',
        desc: [
            ['Détruisez une carte jouée de votre choix.']
        ],
        cost: 2,
        stats: [],
        pictureName: 'mop'
    },
    {
        title: 'Balai',
        type: 'T1',
        desc: [
            ['Détruisez une carte jouée de votre choix.']
        ],
        cost: 3,
        stats: ['e'],
        pictureName: 'broom'
    },
    {
        title: 'Colporteur',
        type: 'T1',
        desc: [
            ['Remplacez une carte du magasin.']
        ],
        cost: 1,
        stats: [],
        pictureName: 'peddler'
    },
    {
        title: 'BOOM!',
        type: 'T1',
        desc: [
            ['Usage unique, détruisez cette carte une fois'],
            ['jouée.']
        ],
        cost: 2,
        stats: ['a', 'a', 'a'],
        pictureName: 'boom'
    },
    {
        title: 'Bouclier Tranchant',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['a', 'd'],
        pictureName: 'shieldPikes'
    },
    {
        title: 'Dague Vampirique',
        type: 'T1',
        desc: [['l', ': Récupérez un point de vie']],
        cost: 3,
        stats: ['a', 'l'],
        pictureName: 'daggerVamp'
    },
    {
        title: 'Frappe Énergique',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['a', 'e'],
        pictureName: 'swordEnergy1'
    },
    {
        title: 'Essence de Vie',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['e', 'l'],
        pictureName: 'arch'
    },
    {
        title: 'Rempart d’Énergie',
        type: 'T1',
        desc: [],
        cost: 2,
        stats: ['e', 'd'],
        pictureName: 'shield'
    },
    {
        title: 'Gardien Vital',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['d', 'l'],
        pictureName: 'heal3'
    },
    {
        title: 'Attaque Rapide',
        type: 'T1',
        desc: [
            ['Piochez une carte supplémentaire.']
        ],
        cost: 3,
        stats: ['a'],
        pictureName: 'fastAttack3'
    },
    {
        title: 'Élan Énergique',
        type: 'T1',
        desc: [
            ['Piochez une carte supplémentaire.']
        ],
        cost: 2,
        stats: ['e'],
        pictureName: 'run1'
    },
    {
        title: 'Parade Éclair',
        type: 'T1',
        desc: [
            ['Piochez une carte supplémentaire.']
        ],
        cost: 2,
        stats: ['d'],
        pictureName: 'parade1'
    },
    {
        title: 'Déplacement Instantané',
        type: 'T1',
        desc: [
            ['Piochez une carte supplémentaire.']
        ],
        cost: 2,
        stats: ['s'],
        pictureName: 'portal'
    },
    {
        title: 'Soin rapide',
        type: 'T1',
        desc: [
            ['Piochez une carte supplémentaire.'],
            ['l', ': Récupérez un point de vie']
        ],
        cost: 3,
        stats: ['l'],
        pictureName: 'heal2'
    },
    {
        title: 'Soin',
        type: 'T1',
        desc: [
            ['l', ': Récupérez un point de vie']
        ],
        cost: 2,
        stats: ['l'],
        pictureName: 'heal1'
    },
    // T2
    {
        title: 'Assaut Éclair',
        type: 'T2',
        desc: [],
        cost: 4,
        stats: ['a', 'a', 's'],
        pictureName: 'assault'
    },
    {
        title: 'Choc Énergétique',
        type: 'T2',
        desc: [],
        cost: 5,
        stats: ['a', 'e', 'd'],
        pictureName: 'shieldPower'
    },
    {
        title: 'Force Inébranlable',
        type: 'T2',
        desc: [],
        cost: 5,
        stats: ['a', 'a', 'd'],
        pictureName: 'elfWarrior'
    },
    {
        title: 'Licorne',
        type: 'T2',
        desc: [],
        cost: 4,
        stats: ['a', 'e', 'e'],
        pictureName: 'unicorn'
    },
    {
        title: 'Force Accumulée',
        type: 'T2',
        desc: [['Ajoutez +1 ', 'a', ' par carte jouée supplémentaire.']],
        cost: 4,
        stats: [],
        pictureName: 'necro'
    },
    {
        title: 'Charge Stratégique',
        type: 'T2',
        desc: [['Chaque ', 's', ' peut être converti en ', 'a']],
        cost: 5,
        stats: [],
        pictureName: 'charge'
    },
    {
        title: 'Bouclier de Feu',
        type: 'T2',
        desc: [['Chaque ', 'd', ' peut être converti en ', 'a']],
        cost: 5,
        stats: ['d'],
        pictureName: 'shieldFire'
    },
    {
        title: 'Attaque circulaire',
        type: 'T2',
        desc: [
            ['Infligez des dégâts à tous les ennemis'],
            [' adjacents.']
        ],
        cost: 4,
        stats: [],
        pictureName: 'attCircular'
    },
    {
        title: 'Sacrifice',
        type: 'T2',
        desc: [
            ['Perdez 1 vie, et obtenez trois fois : '],
            ['soignez 1 vie d’un autre joueur.']
        ],
        cost: 4,
        stats: [],
        pictureName: 'sacrifice'
    },
    {
        title: 'Rage Berserker',
        type: 'T2',
        desc: [
            ['Perdez 1 vie, doublez vos dégats.']
        ],
        cost: 5,
        stats: [],
        pictureName: 'Furry3'
    },
    {
        title: 'Fortification',
        type: 'T2',
        desc: [
            ['Tous les joueurs gagnent un ', 'd', ' ce tour-ci.']
        ],
        cost: 4,
        stats: [],
        pictureName: 'wall'
    },
    {
        title: 'Conquête des Un',
        type: 'T2',
        desc: [
            ['Vos 1 sur les dés deviennent des 6.']
        ],
        cost: 6,
        stats: [],
        pictureName: 'knight'
    },
    {
        title: 'Relance du Destin',
        type: 'T2',
        desc: [
            ['Cumulez et relancez chaque 6 obtenu.']
        ],
        cost: 6,
        stats: [],
        pictureName: 'Dices6b'
    },
    {
        title: 'Miroir',
        type: 'T2',
        desc: [
            ['Cette carte crée une duplication d’une autre'],
            ['carte jouée.']
        ],
        cost: 6,
        stats: [],
        pictureName: 'mirror'
    },
    {
        title: 'Excalibur',
        type: 'T2',
        desc: [],
        cost: 7,
        stats: ['a', 'e', 'd', 's', 'l'],
        pictureName: 'dragonSword'
    },
    {
        title: 'Coup Critique',
        type: 'T2',
        desc: [['Doublez vos dégats.']],
        cost: 7,
        stats: [],
        pictureName: 'Furry1'
    },
    {
        title: 'Yams',
        type: 'T2',
        desc: [
            ['Multipliez vos dégâts selon vos dés :'],
            ['paire x2, brelan x3, carré x4, yams x5']
        ],
        cost: 7,
        stats: [],
        pictureName: 'Dices6'
    },
];
let currentCardIndex = allCards.length - 1;






const allCards = [
    {
        title: 'Attaque',
        type: 'base',
        desc: [
            ['a', ': Gagnez un dé d’attaque'], [' supplémentaire']
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
            ['e', ': Gagnez un point d’énergie,'],
            ['utilisable pour acheter des'],
            ['cartes au magasin.']
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
            ['s', ': gagnez un dé de'],
            ['déplacement supplémentaire.']
        ],
        cost: 0,
        stats: ['s'],
        pictureName: 'Step1',
        quantity: 8
    },
    {
        title: 'Colporteur',
        type: 'base',
        desc: [
            ['Remplacez une carte du'],
            ['magasin.']
        ],
        cost: 0,
        stats: [],
        pictureName: 'peddler',
        quantity: 4
    },
    {
        title: 'Malédiction',
        type: 'base',
        desc: [
            ['Perdez un point de vie,'],
            ['évitable avec un ', 'd']
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
            ['a', ': Gagnez un dé d’attaque,'],
            ['supplémentaire'],
            ['e', ': Gagnez un point d’énergie.'],
        ],
        cost: 3,
        stats: ['a', 'e'],
        pictureName: 'attack12',
        quantity: 12
    },
    {
        title: 'Bénédiction',
        type: 'common',
        desc: [
            ['e', 'e', ': Gagnez deux point'],
            ['d’énergie.'],
        ],
        cost: 2,
        stats: ['e', 'e'],
        pictureName: 'EnergyCard',
        quantity: 12
    },
    {
        title: 'Rencontre',
        type: 'T1',
        desc: [
            ['e', ': Gagnez un point d’énergie.'],
            ['d', ': prévenez un dégât.']
        ],
        cost: 1,
        stats: ['e', 'd'],
        pictureName: 'ReceivingShield2',        
    },
    {
        title: 'Arc',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à'],
            ['distance.']
        ],
        cost: 1,
        stats: [],
        pictureName: 'bow2'
    },
    {
        title: 'Arc Rapide',
        type: 'T1',
        desc: [
            ['Piochez une carte.'],
            ['Vous pouvez attaquer à'],
            ['distance.']
        ],
        cost: 3,
        stats: [],
        pictureName: 'bowGold'
    },
    {
        title: 'Arc Léger',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à'],
            ['distance.']
        ],
        cost: 2,
        stats: ['s'],
        pictureName: 'bow5'
    },
    {
        title: 'Arc long',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à'],
            ['distance.']
        ],
        cost: 3,
        stats: ['a'],
        pictureName: 'bow1'
    },
    {
        title: 'Arc étoilé',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à'],
            ['distance.']
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
            ['Détruisez cette carte, piochez'],
            ['3 cartes.']
        ],
        cost: 2,
        stats: [],
        pictureName: 'thunder'
    },
    {
        title: 'Serpillière',
        type: 'T1',
        desc: [
            ['Détruisez une carte jouée de'],
            ['votre choix.']
        ],
        cost: 2,
        stats: [],
        pictureName: 'mop'
    },
    {
        title: 'Balai',
        type: 'T1',
        desc: [
            ['Détruisez une carte jouée de'],
            ['votre choix.']
        ],
        cost: 3,
        stats: ['e'],
        pictureName: 'broom'
    },
    {
        title: 'BOOM!',
        type: 'T1',
        desc: [
            ['Usage unique, détruisez cette'],
            ['carte une fois jouée.']
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
        cost: 3,
        stats: ['e', 'd', 'd'],
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
            ['Piochez une carte.']
        ],
        cost: 3,
        stats: ['a'],
        pictureName: 'fastAttack3'
    },
    {
        title: 'Élan Énergique',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 2,
        stats: ['e'],
        pictureName: 'run1'
    },
    {
        title: 'Parade Éclair',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 2,
        stats: ['d'],
        pictureName: 'parade1'
    },
    {
        title: 'Portail',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 2,
        stats: ['s'],
        pictureName: 'portal'
    },
    {
        title: 'Soin rapide',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
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
        desc: [
            ['Ajoutez +1 ', 'a', ' par carte jouée'],
            ['supplémentaire.']
        ],
        cost: 4,
        stats: [],
        pictureName: 'necro'
    },
    {
        title: 'Charge Stratégique',
        type: 'T2',
        desc: [
            ['Chaque ', 's', ' peut être converti'],
            ['en ', 'a']
        ],
        cost: 5,
        stats: [],
        pictureName: 'charge'
    },
    {
        title: 'Bouclier de Feu',
        type: 'T2',
        desc: [
            ['Chaque ', 'd', ' peut être converti'],
            ['en ', 'a']
        ],
        cost: 5,
        stats: ['d'],
        pictureName: 'shieldFire'
    },
    {
        title: 'Attaque circulaire',
        type: 'T2',
        desc: [
            ['Infligez des dégâts à tous les'],
            ['ennemis adjacents.']
        ],
        cost: 4,
        stats: [],
        pictureName: 'attCircular'
    },
    {
        title: 'Sacrifice',
        type: 'T2',
        desc: [
            ['Perdez 1 vie, et obtenez trois'],
            ['fois : soignez 1 vie d’un autre'],
            ['joueur.']
        ],
        cost: 4,
        stats: [],
        pictureName: 'sacrifice'
    },
    {
        title: 'Rage Berserker',
        type: 'T2',
        desc: [
            ['Perdez 1 vie, doublez vos'],
            ['dégats.']
        ],
        cost: 5,
        stats: [],
        pictureName: 'Furry3'
    },
    {
        title: 'Fortification',
        type: 'T2',
        desc: [
            ['Tous les joueurs gagnent un ', 'd'],
            ['ce tour-ci.']
        ],
        cost: 4,
        stats: [],
        pictureName: 'wall'
    },
    {
        title: 'Conquête des Un',
        type: 'T2',
        desc: [
            ['Vos 1 sur les dés deviennent'],
            ['des 6.']
        ],
        cost: 6,
        stats: [],
        pictureName: 'knight'
    },
    {
        title: 'Relance du Destin',
        type: 'T2',
        desc: [
            ['Cumulez et relancez chaque 6'],
            ['obtenu.']
        ],
        cost: 6,
        stats: [],
        pictureName: 'Dices6b'
    },
    {
        title: 'Miroir',
        type: 'T2',
        desc: [
            ['Cette carte crée une duplication'],
            ['d’une autre carte jouée.']
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
            ['Multipliez vos dégâts selon vos'],
            ['dés : paire x2, brelan x3, '],
            ['carré x4, yams x5']
        ],
        cost: 7,
        stats: [],
        pictureName: 'Dices6'
    },
];







const cards_ext1 = [
    {
        title: 'Barbare',
        type: 'hero',
        desc: [
            ['Premier ', 'f', ' : Attaque circulaire'],
            [],
            ['f', ' suivants : ', 'a'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Barbare',//  style "Dungeon Crawler Board Game Art"
        quantity: 1
    },
    {
        title: 'Marchand',
        type: 'hero',
        desc: [
            ['Premier ', 'f', ' : ', 'e', 'e'],
            [],
            ['f', ' suivants : ', 'e'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Bargainer',
        quantity: 1
    },
    {
        title: 'Archer',
        type: 'hero',
        desc: [
            ['Premier ', 'f', ' :'],
            ['         Attaque à distance'],
            ['f', ' suivants : ', 'a'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Archeress',
        quantity: 1
    },
    {
        title: 'Tank',
        type: 'hero',
        desc: [
            ['f', ' : gagner ', 'a', ' pour chaque ', 'd'],
            [],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Tank',
        quantity: 1
    },
    {
        title: 'Aventurier',
        type: 'hero',
        desc: [
            ['f', ' : au choix, une seule fois'],
            // [''],
            ['par choix ', 'a', ' ou ', 'e', ' ou ', 'd'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Adventurer',
        quantity: 1
    },
    {
        title: 'Prophète',
        type: 'hero',
        desc: [
            ['f', ' : au choix, une seule fois'],
            ['- Relancer les dès'],
            ['- Détruire une carte'],
            ['- Piocher une carte'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Prophet',
        quantity: 1
    },
    {
        title: 'Nécromancien',
        type: 'hero',
        desc: [
            ['f', ' si monstre meurt ce tour ci:'],
            ['créer un squelette'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Necro',
        quantity: 1
    },
    {
        title: 'Mana',
        type: 'base',
        desc: [
            ['f', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 0,
        stats: ['f'],
        pictureName: 'ext1/mage1',
        quantity: 4
    },
    {
        title: 'Rituel de Prospérité',
        type: 'common',
        desc: [
            ['e', ': Gagnez un point d’énergie.'],
            ['f', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 3,
        stats: ['e', 'f'],
        pictureName: 'ext1/mage2',
        quantity: 4
    },
    {
        title: 'Rituel de Puissance',
        type: 'common',
        desc: [
            ['a', ': Gagnez un dé d’attaque'],
            ['f', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 3,
        stats: ['a', 'f'],
        pictureName: 'ext1/mage3',
        quantity: 4
    },
    {
        title: 'Potion de mana',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 3,
        stats: ['f'],
        attr: ['drawCard'],
        pictureName: 'ext1/ManaPotion'
    },
    {
        title: 'Eclair',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 5,
        stats: ['a', 'f'],
        attr: ['drawCard'],
        pictureName: 'ext1/lightning'
    },
    {
        title: 'Bourse',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 5,
        stats: ['e', 'f'],
        attr: ['drawCard'],
        pictureName: 'ext1/gold1'
    },
    {
        title: 'Destiné',
        type: 'T2',
        desc: [
            ['Défaussez une carte et'],
            ['piochez deux cartes.']
        ],
        cost: 1,
        stats: [],
        attr: [],
        pictureName: 'ext1/destiny'
    },
    {
        title: 'Rituel de Protection',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['e', 'd', 'f'],
        pictureName: 'ext1/ShieldMana'
    },
    {
        title: 'Fortune Guerrière',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['e', 'a', 'f'],
        pictureName: 'ext1/weaponrack'
    },
    {
        title: 'Élan d’Avarice',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['e', 's', 'f'],
        pictureName: 'ext1/Thief'
    },
    {
        title: 'Danse du Combat',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['a', 's', 'f'],
        pictureName: 'ext1/dancing'
    },
    {
        title: 'Frappe Sereine',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['a', 'd', 'f'],
        pictureName: 'ext1/dwarfShield'
    },
    {
        title: 'Rituel de Protection',
        type: 'T1',
        desc: [],
        cost: 2,
        stats: ['d', 's', 'f'],
        pictureName: 'ext1/invocation1'
    }
];







const cards_ext1 = [
    {
        title: 'Barbare',
        type: 'hero',
        desc: [
            ['Premier ', 'c', ' : Attaque circulaire'],
            [],
            ['c', ' suivants : ', 'a'],
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
            ['Premier ', 'c', ' : ', 'r', 'r'],
            [],
            ['c', ' suivants : ', 'r'],
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
            ['Premier ', 'c', ' :'],
            ['         Attaque à distance'],
            ['c', ' suivants : ', 'a'],
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
            ['c', ' : gagner ', 'a', ' pour chaque ', 'd'],
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
            ['c', ' : au choix, une seule fois'],
            // [''],
            ['par choix ', 'a', ' ou ', 'r', ' ou ', 'd'],
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
            ['c', ' : au choix, une seule fois'],
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
            ['c', ' si monstre meurt ce tour ci:'],
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
            ['c', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 0,
        stats: ['c'],
        pictureName: 'ext1/mage1',
        quantity: 4
    },
    {
        title: 'Rituel de Prospérité',
        type: 'common',
        desc: [
            ['r', ': Gagnez un point d’énergie.'],
            ['c', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 3,
        stats: ['r', 'c'],
        pictureName: 'ext1/mage2',
        quantity: 4
    },
    {
        title: 'Rituel de Puissance',
        type: 'common',
        desc: [
            ['a', ': Gagnez un dé d’attaque'],
            ['c', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 3,
        stats: ['a', 'c'],
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
        stats: ['c'],
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
        stats: ['a', 'c'],
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
        stats: ['r', 'c'],
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
        stats: ['r', 'd', 'c'],
        pictureName: 'ext1/ShieldMana'
    },
    {
        title: 'Fortune Guerrière',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['r', 'a', 'c'],
        pictureName: 'ext1/gold2'
    },
    {
        title: 'Élan d’Avarice',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['r', 's', 'c'],
        pictureName: 'ext1/Thief'
    },
    {
        title: 'Danse du Combat',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['a', 's', 'c'],
        pictureName: 'ext1/dancing'
    },
    {
        title: 'Frappe Sereine',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['a', 'd', 'c'],
        pictureName: 'ext1/dwarfShield'
    },
    {
        title: 'Rituel de Protection',
        type: 'T1',
        desc: [],
        cost: 2,
        stats: ['d', 's', 'c'],
        pictureName: 'ext1/invocation1'
    },
    {
        title: 'Espion',
        type: 'T2',
        desc: [  
             ['Piochez une carte.'],
             ['Regardez les 5 prochaines'],
             ['cartes de la pioche.']
            ],
        cost: 1,
        stats: [],
        pictureName: 'ext1/spying'
    },
        {
        title: 'Râtelier d’armes',
        type: 'T2',
        desc: [
             ['Un au choix: ', 'a', ' ou ', 'd', ' ou ', 's'],
             ['ou ', 'r', ' ou ', 'c'],
        ],
        cost: 1,
        stats: [],
        pictureName: 'ext1/weaponrack'
    },
];



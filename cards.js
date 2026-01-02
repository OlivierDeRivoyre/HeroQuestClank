



const allCards = [
    {
        title: 'Gobelin',
        type: 'monster',
        id: 'gobelin',
        desc: [
            [],
            ['       8 ', 'l', '        8 ', 's', '        1 ', 'a'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Gobelin',//  style "Dungeon Crawler Board old Game Art"
        quantity: 1
    },
    {
        title: 'Gobelin Archer',
        type: 'monster',
        desc: [
            [],
            ['       6 ', 'l', '        5 ', 's', '        1 ', 'a'],
            ['           Attaque à distance'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/GobelinBow',
        quantity: 1
    },
    {
        title: 'Squelette',
        type: 'monster',
        desc: [
            [],
            ['     9 ', 'd', '    1 ', 'l', '     5 ', 's', '     1 ', 'a']
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Skeleton',
        quantity: 1
    },
    {
        title: 'Momie',
        type: 'monster',
        desc: [
            [],
            ['       12 ', 'l', '     4 ', 's', '        1 ', 'a'],
            ['Seul les 6 lui font des dégats']
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Mummy',
        quantity: 1
    },
    {
        title: 'Zombie',
        type: 'monster',
        desc: [
            [],
            ['    4 ', 'd', '    20 ', 'l', '    3 ', 's', '    1 ', 'a']
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Zombie',
        quantity: 1
    },
    {
        title: 'Orc',
        type: 'monster',
        desc: [
            [],
            ['        40 ', 'l', '     6 ', 's', '    2 ', 'a'],
            ['          Attaque circulaire'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Orc',
        quantity: 1
    },
    {
        title: 'Abomination',
        type: 'monster',
        desc: [
            [],
            ['       100 ', 'l', '     7 ', 's', '     2 ', 'a'],
            ['Attaque circulaire aux tours'], ['paires'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Abomination',
        quantity: 1
    },
    {
        title: 'Guerrier de Chaos',
        type: 'monster',
        desc: [
            [],
            ['        14 ', 'd', '        5 ', 's', '     3 ', 'a'],
            // [],
            ['  Possède 3 cœurs de pierre'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/UndeadWarrior',
        quantity: 1
    },
    {
        title: 'Gargouille',
        type: 'monster',
        desc: [
            [],
            ['       200 ', 'l', '     5 ', 's', '     3 ', 'a'],
            ['Attaque générale aux tours'], ['paires'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Gargoyle',
        quantity: 1
    },
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
        title: 'Diamond',
        type: 'base',
        desc: [
            ['g', ': Gagnez un diamant,'],
            ['utilisable pour acheter des'],
            ['cartes au magasin.']
        ],
        cost: 0,
        stats: ['g'],
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
            ['magasin.'],
            ['Ou bien: défaussez une carte '],
            ['pour détecter les pièges']
        ],
        cost: 0,
        stats: [],
        attr: ['recycle1'],
        pictureName: 'peddler',
        quantity: 4
    },
    {
        title: 'Malédiction',
        type: 'base',
        id: 'baseMalus',
        desc: [
            ['Perdez un point de vie,'],
            ['évitable avec un ', 'd']
        ],
        cost: 0,
        stats: [],
        attr: ['lost1Life'],
        pictureName: 'arrowTrap',
        quantity: 4
    },
    {
        title: 'Assaut Fulgurant',
        type: 'common',
        id: 'commonAG',
        desc: [
            ['a', ': Gagnez un dé d’attaque,'],
            ['supplémentaire'],
            ['g', ': Gagnez un diamant.'],
        ],
        cost: 2,
        stats: ['a', 'g'],
        pictureName: 'attack12',
        quantity: 12
    },
    {
        title: 'Bénédiction',
        id: 'commonGG',
        type: 'common',
        desc: [
            ['g', 'g', ': Gagnez deux diamants']
        ],
        cost: 2,
        stats: ['g', 'g'],
        pictureName: 'EnergyCard',
        quantity: 12
    },
    // T1
    {
        title: 'Rencontre',
        type: 'T1',
        desc: [],
        cost: 1,
        stats: ['g', 'd'],
        pictureName: 'ReceivingShield2',
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
    {
        title: 'Frappe Énergique',
        type: 'T1',
        desc: [],
        cost: 1,
        stats: ['a', 'g'],
        pictureName: 'swordEnergy1'
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
        attr: ['bow'],
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
        attr: ['bow', 'drawCard'],
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
        attr: ['bow'],
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
        attr: ['bow'],
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
        stats: ['g'],
        attr: ['bow'],
        pictureName: 'starBow'
    },
    {
        title: 'Bouclier Tranchant',
        type: 'T1',
        desc: [],
        cost: 2,
        stats: ['a', 'd'],
        pictureName: 'shieldPikes'
    },
    {
        title: 'Dague Vampirique',
        type: 'T1',
        desc: [['l', ': Récupérez un point de vie']],
        cost: 4,
        stats: ['a', 'l'],
        pictureName: 'daggerVamp'
    },
    {
        title: 'Essence de Vie',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['g', 'l'],
        pictureName: 'arch'
    },
    {
        title: 'Rempart Précieux',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['g', 'd', 'd'],
        pictureName: 'shield'
    },
    {
        title: 'Gardien Vital',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['g', 'd', 'l'],
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
        attr: ['drawCard'],
        pictureName: 'fastAttack3'
    },
    {
        title: 'Bonne fortune',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 2,
        stats: ['g'],
        attr: ['drawCard'],
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
        attr: ['drawCard'],
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
        attr: ['drawCard'],
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
        attr: ['drawCard'],
        pictureName: 'heal2'
    },
    {
        title: 'Attaque circulaire',
        type: 'T1',
        desc: [
            ['Infligez des dégâts à tous les'],
            ['ennemis adjacents.']
        ],
        cost: 3,
        stats: ['a'],
        attr: ['circularAttack'],
        pictureName: 'attCircular'
    },
    {
        title: 'Cyclone d’Acier',
        type: 'T1',
        desc: [
            ['Infligez des dégâts à tous les'],
            ['ennemis adjacents.'],
            ['Piochez une carte.']
        ],
        cost: 3,
        stats: [],
        attr: ['circularAttack', 'drawCard'],
        pictureName: 'attCirulaire3'
    },
    {
        title: 'Avarice',
        type: 'T1',
        desc: [
            ['Perdez 1 vie']
        ],
        cost: 3,
        stats: ['g', 'g', 'g'],
        attr: ['lost1Life'],
        pictureName: 'sacrifice'
    },
    {
        title: 'Rage Sanguinaire',
        type: 'T1',
        desc: [
            ['Perdez 1 vie']
        ],
        cost: 3,
        stats: ['a', 'a', 'a'],
        attr: ['lost1Life'],
        pictureName: 'fury3'
    },
    {
        title: 'Licorne',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['a', 'g', 'g'],
        pictureName: 'unicorn'
    },
    {
        title: 'Assaut Éclair',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['a', 'a', 's'],
        pictureName: 'assault'
    },
    {
        title: 'Choc Énergétique',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['a', 'g', 'd'],
        pictureName: 'shieldPower'
    },
    {
        title: 'Force Inébranlable',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['a', 'a', 'd'],
        pictureName: 'elfWarrior'
    },

    //T2
    {
        title: 'Serpillière',
        type: 'T2',
        desc: [
            ['Détruisez une carte jouée de'],
            ['votre choix.']
        ],
        cost: 2,
        stats: [],
        attr: ['destroyACard'],
        pictureName: 'mop'
    },
    {
        title: 'Balai',
        type: 'T2',
        desc: [
            ['Détruisez une carte jouée de'],
            ['votre choix.']
        ],
        cost: 3,
        stats: ['g'],
        attr: ['destroyACard'],
        pictureName: 'broom'
    },
    {
        title: 'Eponge',
        type: 'T2',
        desc: [
            ['Piochez une carte.'],
            ['Détruisez une carte jouée de'],
            ['votre choix.']
        ],
        cost: 3,
        stats: [],
        attr: ['drawCard', 'destroyACard'],
        pictureName: 'Sponge'
    },
    {
        title: 'Jumeaux',
        type: 'T2',
        desc: [
            ['Piochez deux cartes.']
        ],
        cost: 4,
        stats: [],
        attr: ['drawCard', 'drawCard'],
        pictureName: 'twins'
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
        attr: ['lost1Life', 'x2'],
        pictureName: 'Furry3'
    },
    {
        title: 'Fortification',
        type: 'T2',
        desc: [
            ['Tous les joueurs gagnent 1 ', 'd'],
            ['ce tour-ci.']
        ],
        cost: 3,
        stats: [],
        attr: [],
        pictureName: 'wall'
    },
    {
        title: 'Miroir',
        type: 'T2',
        desc: [
            ['Cette carte crée une duplication'],
            ['d’une autre carte jouée.']
        ],
        cost: 4,
        stats: [],
        attr: ['mirror'],
        pictureName: 'mirror'
    },
    {
        title: 'Excalibur',
        type: 'T2',
        desc: [['Piochez une carte.']],
        cost: 7,
        stats: ['a', 'g', 'd', 's', 'l'],
        attr: ['drawCard'],
        pictureName: 'excalibur'
    },
    {
        title: 'Coup Critique',
        type: 'T2',
        desc: [
            ['Doublez vos dégats.'],
            ['Piochez une carte.']
        ],
        cost: 7,
        stats: [],
        attr: ['x2', 'drawCard'],
        pictureName: 'Furry1'
    },

];



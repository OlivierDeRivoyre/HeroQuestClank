



const allCards = [
    {
        title: 'Gobelin',
        type: 'monster',
        desc: [
            [],
            ['              8 ', 'l', '        8 ', 's'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Gobelin',
        quantity: 1
    },
    {
        title: 'Gobelin Archer',
        type: 'monster',
        desc: [
            [],
            ['              6 ', 'l', '     5 ', 's'],
            ['           Attaque à distance'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/GobelinBow',
        quantity: 1
    },
    {
        title: 'Skeleton',
        type: 'monster',
        desc: [
            [],
            ['         9 ', 'd', '    1 ', 'l', '     5 ', 's']
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Skeleton',
        quantity: 1
    },
    {
        title: 'Mummy',
        type: 'monster',
        desc: [
            [],
            ['              25 ', 'l', '     4 ', 's']
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
            ['         4 ', 'd', '     20 ', 'l', '     3 ', 's']
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
            ['              40 ', 'l', '     6 ', 's'],
            ['           Attaque circulaire'],
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
            ['              100 ', 'l', '     7 ', 's'],
            [],
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
            ['          14 ', 'd', '        5 ', 's'],
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
            ['              200 ', 'l', '     5 ', 's'],
            [],
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
        attr: ['recycle1'],
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
        attr: ['lost1Life'],
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
        cost: 2,
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
    // T1
    {
        title: 'Rencontre',
        type: 'T1',
        desc: [],
        cost: 1,
        stats: ['e', 'd'],
        pictureName: 'ReceivingShield2',
    },
    {
        title: 'Soin',
        type: 'T1',
        desc: [
            ['l', ': Récupérez un point de vie']
        ],
        cost: 1,
        stats: ['l'],
        pictureName: 'heal1'
    },
    {
        title: 'Frappe Énergique',
        type: 'T1',
        desc: [],
        cost: 1,
        stats: ['a', 'e'],
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
        stats: ['e'],
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
        cost: 3,
        stats: ['a', 'l'],
        pictureName: 'daggerVamp'
    },
    {
        title: 'Essence de Vie',
        type: 'T1',
        desc: [],
        cost: 2,
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
        stats: ['e', 'd', 'l'],
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
        title: 'Élan Énergique',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 2,
        stats: ['e'],
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
        title: 'Sacrifice',
        type: 'T1',
        desc: [
            ['Perdez 1 vie']
        ],
        cost: 3,
        stats: ['e', 'e', 'e'],
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
        stats: ['a', 'e', 'e'],
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
        stats: ['a', 'e', 'd'],
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

    // T2
    {
        title: 'Coup de foudre',
        type: 'T2',
        desc: [
            ['Détruisez cette carte, piochez'],
            ['3 cartes.']
        ],
        cost: 2,
        stats: [],
        attr: ['destroyCurrentCard', 'drawCard', 'drawCard', 'drawCard'],
        pictureName: 'thunder'
    },
    {
        title: 'BOOM!',
        type: 'T2',
        desc: [
            ['Usage unique, détruisez cette'],
            ['carte une fois jouée.']
        ],
        cost: 2,
        stats: ['a', 'a', 'a'],
        attr: ['destroyCurrentCard'],
        pictureName: 'boom'
    },
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
        stats: ['e'],
        attr: ['destroyACard'],
        pictureName: 'broom'
    },
    {
        title: 'Seconde chance',
        type: 'T2',
        desc: [
            ['Relancez les dés de votre choix'],
            ['Piochez une carte.']
        ],
        cost: 3,
        stats: [],
        attr: ['rerollDices', 'drawCard'],
        pictureName: 'clover2'
    },
    {
        title: 'Charge Stratégique',
        type: 'T2',
        desc: [
            ['Chaque ', 's', ' peut être converti'],
            ['en ', 'a']
        ],
        cost: 3,
        stats: ['s'],
        attr: ['walkToAttack'],
        pictureName: 'charge'
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
        title: 'Force Accumulée',
        type: 'T2',
        desc: [
            ['Ajoutez +1 ', 'a', ' par carte piochée'],
            ['supplémentaire.']
        ],
        cost: 4,
        stats: [],
        attr: ['attackPerDrawnCard'],
        pictureName: 'necro'
    },
    {
        title: 'Bouclier de Feu',
        type: 'T2',
        desc: [
            ['Chaque ', 'd', ' donne une ', 'a']
        ],
        cost: 4,
        stats: ['d'],
        attr: ['shieldToAttack'],
        pictureName: 'shieldFire'
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
            ['Tous les joueurs gagnent 3 ', 'd'],
            ['ce tour-ci.']
        ],
        cost: 4,
        stats: [],
        attr: ['d', 'd', 'd'],
        pictureName: 'wall'
    },
    {
        title: 'Conquête des Un',
        type: 'T2',
        desc: [
            ['Vos 1 sur les dés deviennent'],
            ['des 6.']
        ],
        cost: 5,
        stats: ['a'],
        attr: ['diceOneBecameSix'],
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
        stats: ['a'],
        attr: ['rollNewDiceOnSix'],
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
        attr: ['mirror'],
        pictureName: 'mirror'
    },
    {
        title: 'Excalibur',
        type: 'T2',
        desc: [['Piochez une carte.']],
        cost: 7,
        stats: ['a', 'e', 'd', 's', 'l'],
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
        attr: ['yams'],
        pictureName: 'Dices6'
    },
];



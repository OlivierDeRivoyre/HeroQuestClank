



const allCards = [
    {
        title: 'Gobelin',
        type: 'monster',
        id: 'gobelin',
        desc: [
            [],
            ['       1 ', 'a', '       8 ', 'l', '        8 ', 's'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Gobelin',//  style "Dungeon Crawler Board old Game Art". No border. No label.
        quantity: 1
    },
    {
        title: 'Gobelin Archer',
        type: 'monster',
        id: 'mage',
        desc: [
            [],
            ['       1 ', 'a', '       6 ', 'l', '        7 ', 's'],
            [],
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
        id: 'skeleton',
        desc: [
            [],
            ['     1 ', 'a', '    9 ', 'd', '    1 ', 'l', '     7 ', 's']
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Skeleton',
        quantity: 1
    },
    {
        title: 'Momie',
        type: 'monster',
        id: 'mummy',
        desc: [
            [],
            ['       1 ', 'a', '       12 ', 'l', '     6 ', 's'],
            [],
            ['  Seul les 6 lui font des dégats']
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Mummy',
        quantity: 1
    },
    {
        title: 'Zombie',
        type: 'monster',
        id: 'zombie',
        desc: [
            [],
            ['    1 ', 'a', '    4 ', 'd', '    20 ', 'l', '    5 ', 's']
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/Zombie',
        quantity: 1
    },
    {
        title: 'Orc',
        type: 'monster',
        id: 'orc',
        desc: [
            [],
            ['      2 ', 'a', '        40 ', 'l', '     7 ', 's'],
            [],
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
        id: 'abomination',
        desc: [
            [],
            ['      2 ', 'a', '       100 ', 'l', '     7 ', 's'],
            [],
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
        id: 'knight',
        desc: [
            [],
            ['      3 ', 'a', '        14 ', 'd', '        5 ', 's'],
            [],
            ['   Possède 3 cœurs de pierre'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'monster/UndeadWarrior',
        quantity: 1
    },
    {
        title: 'Gargouille',
        type: 'monster',
        id: 'gargoyle',
        desc: [
            [],
            ['     3 ', 'a', '       200 ', 'l', '     6 ', 's'],
            [],
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
        title: 'Diamant',
        type: 'base',
        desc: [
            ['g', ': Gagnez un diamant,'],
            ['utilisable pour acheter des'],
            ['cartes au magasin.']
        ],
        cost: 0,
        stats: ['g'],
        pictureName: 'DwarfDiamond1',
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
        pictureName: 'ElfShield',
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
        pictureName: 'ElfJumping',
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
        pictureName: 'HumanPeddler',
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
        pictureName: 'HumanArrows',
        quantity: 4
    },
    {
        title: 'Extraction Violente',
        type: 'common',
        id: 'commonAG',
        desc: [
            ['a', ': Gagnez un dé d’attaque,'],
            ['supplémentaire'],
            ['g', ': Gagnez un diamant.'],
        ],
        cost: 2,
        stats: ['a', 'g'],
        pictureName: 'DwarfCristal',
        quantity: 12
    },
    {
        title: 'Héritage Cristallin',
        id: 'commonGG',
        type: 'common',
        desc: [
            ['g', 'g', ': Gagnez deux diamants']
        ],
        cost: 2,
        stats: ['g', 'g'],
        pictureName: 'ElfDiamonds',
        quantity: 12
    },
    // T1
    {
        title: 'Héritage du Sage',
        type: 'T1',
        desc: [],
        cost: 1,
        stats: ['g', 'd'],
        pictureName: 'ElfOldShield',
    },
    {
        title: 'Soin',
        type: 'T1',
        desc: [
            ['l', ': Récupérez un point de vie']
        ],
        cost: 2,
        stats: ['l'],
        pictureName: 'ElfPriestHealing'
    },
    {
        title: 'Éclats de Fortune',
        type: 'T1',
        desc: [],
        cost: 1,
        stats: ['a', 'g'],
        pictureName: 'ElfHitsCristal'
    },
    {
        title: 'Arc Rustique',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à'],
            ['distance.']
        ],
        cost: 1,
        stats: [],
        attr: ['bow'],
        pictureName: 'BowWood'
    },
    {
        title: 'Arc Rapide',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à'],
            ['distance.'],
            [],
            ['Piochez une carte.'],
        ],
        cost: 3,
        stats: [],
        attr: ['bow', 'drawCard'],
        pictureName: 'BowBone'
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
        pictureName: 'BowSmall'
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
        pictureName: 'BowGoldVulcano'
    },
    {
        title: 'Arc Précieux',
        type: 'T1',
        desc: [
            ['Vous pouvez attaquer à'],
            ['distance.']
        ],
        cost: 3,
        stats: ['g'],
        attr: ['bow'],
        pictureName: 'BowCristal'
    },
    {
        title: 'Bouclier Hérisson',
        type: 'T1',
        desc: [],
        cost: 2,
        stats: ['a', 'd'],
        pictureName: 'HumanShieldPikes'
    },
    {
        title: 'Dague Vampirique',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['a', 'l'],
        pictureName: 'DaggerVampire'
    },
    {
        title: 'Cristal de Vie',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['g', 'l'],
        pictureName: 'CristalLife'
    },
    {
        title: 'Égide Cristalline',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['g', 'd', 'd'],
        pictureName: 'ShieldDiamond'
    },
    {
        title: 'Garde Vampirique',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['g', 'd', 'l'],
        pictureName: 'VampireShield'
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
        pictureName: 'HumanRogueAndOrc'
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
        pictureName: 'ChickenDiamond'
    },
    {
        title: 'Esquive',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 2,
        stats: ['d'],
        attr: ['drawCard'],
        pictureName: 'HumanDodgeOrc'
    },
    {
        title: 'Danse du Pisteur',
        type: 'T1',
        desc: [
            ['Piochez une carte.']
        ],
        cost: 2,
        stats: ['s'],
        attr: ['drawCard'],
        pictureName: 'ElfDancing'
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
        pictureName: 'ElfHealingHuman'
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
        pictureName: 'HumanCircularAttack'
    },
    {
        title: 'Assaut Circulaire',
        type: 'T1',
        desc: [
            ['Infligez des dégâts à tous les'],
            ['ennemis adjacents.'], [],
            ['Piochez une carte.']
        ],
        cost: 3,
        stats: [],
        attr: ['circularAttack', 'drawCard'],
        pictureName: 'HumanCircularAttack2'
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
        pictureName: 'PoachDiamonds'
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
        pictureName: 'ElfRogueVolcano'
    },
    {
        title: 'Éclats de Victoire',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['a', 'a', 'g'],
        attr: ['lost1Life'],
        pictureName: 'HumanHitCristal'
    },
    {
        title: 'Prime de Guerre',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['a', 'g', 'g'],
        pictureName: 'HumanOpeningChest'
    },
    {
        title: 'Assaut Éclair',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['a', 'a', 's'],
        pictureName: 'HumanStrikeDemon'
    },
    {
        title: 'Position Stratégique',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['a', 'g', 'd'],
        pictureName: 'ElfDwarfDefendingCastle'
    },
    {
        title: 'Assaut Renforcé',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['a', 'a', 'd'],
        pictureName: 'ElfHitOrc'
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
        pictureName: 'ItemMop'
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
        pictureName: 'ItemBroom'
    },
    {
        title: 'Eponge',
        type: 'T2',
        desc: [
            ['Détruisez une carte jouée de'],
            ['votre choix.'],
            [],
            ['Piochez une carte.']
        ],
        cost: 3,
        stats: [],
        attr: ['drawCard', 'destroyACard'],
        pictureName: 'ItemSponge'
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
        pictureName: 'ElfTwins'
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
        pictureName: 'HumanBerserk'
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
        pictureName: 'Castle'
    },
    {
        title: 'Miroir',
        type: 'T2',
        desc: [
            ['Dupliquez les effets d’une'],
            ['carte jouée.']
        ],
        cost: 4,
        stats: [],
        attr: ['mirror'],
        pictureName: 'ItemMirror'
    },
    {
        title: 'Excalibur',
        type: 'T2',
        desc: [['Piochez une carte.']],
        cost: 7,
        stats: ['a', 'g', 'd', 's', 'l'],
        attr: ['drawCard'],
        pictureName: 'ItemExcalibur'
    },
    {
        title: 'Courroux de Naël',
        type: 'T2',
        desc: [
            ['Doublez vos dégats.'],
            ['Piochez une carte.']
        ],
        cost: 7,
        stats: [],
        attr: ['x2', 'drawCard'],
        pictureName: 'HumanYoungBerserk'
    },

];



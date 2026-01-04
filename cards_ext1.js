



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
        pictureName: 'ext1/Barbare',//  style "Dungeon Crawler Board old Game Art"
        quantity: 1
    },
    {
        title: 'Marchand',
        type: 'hero',
        desc: [
            ['Premier ', 'c', ' : ', 'g', 'g'],
            [],
            ['c', ' suivants : ', 'g'],
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
            ['Premier ', 'c', ': Attaque à distance'],
            [],
            ['c', ' suivants : ', 'a'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Archeress',
        quantity: 1
    },
    {
        title: 'Gardien',
        type: 'hero',
        desc: [
            ['c', ' : forcez un monstre à vous'],
            ['attaquer'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/ElfTank',
        quantity: 1
    },
    {
        title: 'Protecteur',
        type: 'hero',
        desc: [
            ['c', ' : ', 'd'],
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
            ['par choix ', 'a', ' ou ', 'g', ' ou ', 'd'],
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
        title: 'Assassin',
        type: 'hero',
        desc: [
            ['c', ' si derrière le monstre:', 'a', 'a'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Assassin',
        quantity: 1
    },
    {
        title: 'Braconneur',
        type: 'hero',
        desc: [
            ['c', ' : détectez les pièges'],
            [],
            ['c', ' : ', 'g'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Poacher',
        quantity: 1
    },
    {
        title: 'Prêtre',
        type: 'hero',
        desc: [
            ['c', ' une fois par tour: restaurer'],
            ['un point de vie à un allié'],
            [],
            ['c', ' : ', 's'],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Priest',
        quantity: 1
    },
    {
        title: 'Mage',
        type: 'hero',
        desc: [
            ['c', ' une fois par tour: tentez'],
            ['d’immobiliser un monstre'],
            [],
        ],
        cost: 0,
        stats: [],
        pictureName: 'ext1/Mage',
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
        pictureName: 'ext1/HumanMageMana',
        quantity: 4
    },
    {
        title: 'Nexus de Mana',
        type: 'common',
        id: 'commonGC',
        desc: [
            ['g', ': Gagnez un diamant'],
            ['c', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 3,
        stats: ['g', 'c'],
        pictureName: 'ext1/ItemNexusMana',
        quantity: 4
    },
    {
        title: 'Vibration Guerrière',//'Impulsion de Combat',
        type: 'common',
        id: 'commonAC',
        desc: [
            ['a', ': Gagnez un dé d’attaque'],
            ['c', ': Utilisez une compétance'],
            [' de votre personage'],
        ],
        cost: 3,
        stats: ['a', 'c'],
        pictureName: 'ext1/HumanWarriorCasting',
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
        pictureName: 'ext1/ItemManaPotion'
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
        cost: 4,
        stats: ['g', 'c'],
        attr: ['drawCard'],
        pictureName: 'ext1/ItemGoldPoach'
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
        title: 'Technique Défensive',
        type: 'T1',
        desc: [],
        cost: 2,
        stats: ['d', 'c'],
        pictureName: 'ext1/ElfShieldArrow'
    },
    {
        title: 'Bouclier d’Abondance',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['g', 'd', 'c'],
        pictureName: 'ext1/ItemGoldenShield'
    },
    {
        title: 'Fortune Guerrière',
        type: 'T1',
        desc: [],
        cost: 5,
        stats: ['g', 'a', 'c'],
        pictureName: 'ext1/HumanReceiveGold'
    },
    {
        title: 'Élan d’Avarice',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['g', 's', 'c'],
        pictureName: 'ext1/HumanRogueRunaway'
    },
    {
        title: 'Danse du Combat',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['a', 's', 'c'],
        pictureName: 'ext1/HumanDancingSword'
    },
    {
        title: 'Frappe Sereine',
        type: 'T1',
        desc: [],
        cost: 4,
        stats: ['a', 'd', 'c'],
        pictureName: 'ext1/DwarfShieldRed'
    },
    {
        title: 'Veille Itinérante',
        type: 'T1',
        desc: [],
        cost: 3,
        stats: ['d', 's', 'c'],
        pictureName: 'ext1/GnomeShield'
    },
    {
        title: 'Espion',
        type: 'T2',
        desc: [
            ['Regardez les 3 prochaines'],
            ['cartes de la pioche.'],
            ['Piochez une de ces carte.']
        ],
        cost: 1,
        stats: [],
        pictureName: 'ext1/HumanSpy'
    },
    {
        title: 'Râtelier d’armes',
        type: 'T2',
        desc: [
            ['Un au choix: ', 'a', ' ou ', 'd', ' ou ', 's'],
            ['ou ', 'g', ' ou ', 'c'],
        ],
        cost: 1,
        stats: [],
        pictureName: 'ext1/ItemWeaponRack'
    },

    // artifact
    {
        title: 'Bonneteau',
        type: 'artifact',
        desc: [
            ['Détruisez cette carte, piochez'],
            ['2 cartes.']
        ],
        cost: 2,
        stats: [],
        attr: ['destroyCurrentCard', 'drawCard', 'drawCard'],
        pictureName: 'ext1/GnomeBonneteau'
    },
    {
        title: 'BOOM!',
        type: 'artifact',
        desc: [
            ['Usage unique, détruisez cette'],
            ['carte une fois jouée.']
        ],
        cost: 2,
        stats: ['a', 'a', 'a'],
        attr: ['destroyCurrentCard'],
        pictureName: 'ext1/GnomeBoom'
    },

    {
        title: 'Brosse',
        type: 'artifact',
        desc: [
            ['g', 'g', ': Détruisez une carte jouée'],
            ['de votre choix.']
        ],
        cost: 5,
        stats: [],
        attr: ['destroyACard'],
        pictureName: 'Brush'
    },
    {
        title: 'Seconde chance',
        type: 'artifact',
        desc: [
            ['Relancez les dés de votre choix']
        ],
        cost: 5,
        stats: [],
        attr: ['rerollDices'],
        pictureName: 'ext1/ItemLuckyClover'
    },
    {
        title: 'Charge Stratégique',
        type: 'artifact',
        desc: [
            ['Chaque ', 's', ' peut être converti'],
            ['en ', 'a']
        ],
        cost: 5,
        stats: [],
        attr: ['walkToAttack'],
        pictureName: 'ext1/GnomeRunningAway'
    },
    {
        title: 'Force Accumulée',
        type: 'artifact',
        desc: [
            ['Ajoutez +1 ', 'a', ' par carte piochée'],
            ['supplémentaire.']
        ],
        cost: 6,
        stats: [],
        attr: ['attackPerDrawnCard'],
        pictureName: 'ext1/HumanNecroRaisingDeads'
    },
    {
        title: 'Bouclier de Feu',
        type: 'artifact',
        desc: [
            ['Chaque ', 'd', ' donne une ', 'a']
        ],
        cost: 5,
        stats: [],
        attr: ['shieldToAttack'],
        pictureName: 'ext1/ItemShieldFire'
    },
    {
        title: 'Conquête des Un',
        type: 'artifact',
        desc: [
            ['Vos 1 sur les dés deviennent'],
            ['des 6.']
        ],
        cost: 6,
        stats: [],
        attr: ['diceOneBecameSix'],
        pictureName: 'ext1/HumanAttila'
    },
    {
        title: 'Relance du Destin',
        type: 'artifact',
        desc: [
            ['Cumulez et relancez chaque 6'],
            ['obtenu.']
        ],
        cost: 6,
        stats: [],
        attr: ['rollNewDiceOnSix'],
        pictureName: 'ext1/DemonPlayingDices'
    },
    {
        title: 'Yams',
        type: 'artifact',
        desc: [
            ['Ajouter des dégats selon vos'],
            ['dés : paire +2, brelan +6, '],
            ['carré +10, yams +20']
        ],
        cost: 5,
        stats: [],
        attr: ['yams'],
        pictureName: 'ext1/HumanPlayingDices'
    },
    {
        title: 'Luxe',
        type: 'artifact',
        desc: [
            ['Payez 2 ', 'g', ' supplémentaires'],
            ['pour jouer directement la carte '],
            ['achetée au lieu de la défausser.'],
            ['S’applique à tous les joueurs.']
        ],
        cost: 3,
        stats: [],
        attr: [],
        pictureName: 'CosyShop'
    },
    {
        title: 'Marché',
        type: 'artifact',
        desc: [
            ['Ajouter un emplacement au'],
            ['magasin.'],
        ],
        cost: 2,
        stats: [],
        attr: [],
        pictureName: 'Market'
    },
    {
        title: 'Tricheur',
        type: 'artifact',
        desc: [
            ['Piochez une carte'],
            ['supplémentaire au début de'],
            ['votre tour.'],

        ],
        cost: 6,
        stats: [],
        attr: [],
        pictureName: 'PlayingCards'
    },
    {
        title: 'Potion de vie',
        type: 'artifact',
        desc: [
            ['Usage unique, détruisez cette'],
            ['carte une fois jouée.'],
            ['Restaurer 1 dé de vie.']
        ],
        cost: 5,
        stats: [],
        attr: [],
        pictureName: 'LifePotion'
    },
    {
        title: 'Potion de vie',
        type: 'artifact',
        desc: [
            ['Usage unique, détruisez cette'],
            ['carte une fois jouée.'],
            ['Restaurer 1 dé de vie.']
        ],
        cost: 0,
        stats: [],
        attr: [],
        pictureName: 'LifePotionChest',
        quantity: 5
    },
    {
        title: 'Petite potion',
        type: 'artifact',
        desc: [
            ['Usage unique, détruisez cette'],
            ['carte une fois jouée.'],
        ],
        cost: 1,
        stats: ['l'],
        attr: [],
        pictureName: 'SmallPotion'
    },
    {
        title: 'Pierre de Noam',
        type: 'artifact',
        desc: [
            ['Usage unique.'],
            ['Ressuscitez tous les joueurs.'],
            ['Ceux-ci perdent définitivement'],
            ['un point de vie.'],
        ],
        cost: 0,
        stats: [],
        attr: [],
        pictureName: 'SoulStone'
    },
    {
        title: 'Argent de poche',
        type: 'artifact',
        desc: [
            ['Gagnez 1 ', 'g'],
            ['Remettez cette carte en haut'],
            ['de la pioche du magasin sous '],
            ['quelques cartes.'],
        ],
        cost: 1,
        stats: [],
        attr: [],
        pictureName: 'SmallPouch'
    },
];


function AddExt1() {
    for (let c of cards_ext1)
        allCards.push(c);
    for (let c of allCards)
        c.stats = c.stats || [];
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

AddExt1();

let players = [];

class Player {
    constructor(name) {
        this.name = name;
        this.deck = new CardGameRun();
        this.maxLife = 7;
        this.life = this.maxLife;
        this.x = 0;
        this.commonGGBought = 0;
    }
    initTurn() {
        this.att = 1;
        this.move = 1;
        this.def = 0;
        this.gold = 0;
        this.competance = 0;
        this.attDist = false;
    }
    playCards() {
        if (this.life <= 0)
            return;
        this.deck.playerDeck.drawToCount(5);
        for (let i = 0; i < this.deck.playerDeck.hand.length; i++) {
            const attr = this.deck.playerDeck.hand[i].attr || [];
            for (let j of attr.filter(a => a == 'drawCard')) {
                this.deck.playerDeck.drawOne();
            }
        }
        const goldCards = this.deck.playerDeck.hand.reduce((acc, card) => acc + card.stats.filter(s => s == 'g').length, 0);
        let playedCard = 0;
        for (let c of this.deck.playerDeck.hand.slice()) {
            if (goldCards < 2 && c.stats.filter(s => s == 'g').length != 0) {
                continue;
            }
            playedCard++;
            this.deck.playerDeck.handToPlayed(c);
            this.applyCardEffect(c);
        }
        this.deck.playerDeck.endTurn();
        console.log(`Player ${this.name} ${this.life}❤️ play ${playedCard} cards for: ${this.att}⚔️, ${this.def}🛡️, ${this.gold}💎, ${this.competance}⭐`)
    }
    applyCardEffect(card) {
        for (let s of card.stats) {
            switch (s) {
                case 'a': this.att++; break;
                case 's': this.move++; break;
                case 'g': this.gold++; break;
                case 'd': this.def++; break;
                case 'l': this.life = Math.min(this.life + 1, this.maxLife); break;
                case 'c': this.competance++; break;
                default: console.log('Unmanaged card stat: ' + s);
            }
        }
        /*   for (let attr of (card.attr || [])) {
               switch (attr) {
                   case 'recycle1': this.popup = new RecycleShopForm(this); break;
                   case 'lost1Life': this.cardEffectLost1Life(); break;
                   case 'loseTrueLive': this.cardEffectLostTrueLife(); break;
                   case 'bow': this.cardEffectBow(); break;
                   case 'drawCard': this.cardEffectDrawCard(); break;
                   case 'rerollDices': this.cardEffectRerollDices(); break;
                   case 'destroyCurrentCard': this.cardEffectDestroyCurrentCard(); break;
                   case 'destroyACard': this.cardEffectDestroyACard(); break;
                   case 'attackPerDrawnCard': this.cardEffectAttackPerDrawnCard(); break;
                   case 'walkToAttack': this.cardEffectWalkToAttack(); break;
                   case 'shieldToAttack': this.cardEffectShieldToAttack(); break;
                   case 'circularAttack': this.cardEffectCircularAttack(); break;
                   case 'x2': this.cardEffectDoubleDamages(); break;
                   case 'd': this.cardEffectAddShield(); break;
                   case 'diceOneBecameSix': this.cardEffectDiceOneBecameSix(); break;
                   case 'rollNewDiceOnSix': this.cardEffectRollNewDiceOnSix(); break;
                   case 'mirror': this.cardEffectMirror(); break;
                   case 'yams': this.cardEffectYams(); break;
                   default: console.log('Unmanaged card attr: ' + attr);
               }
           }
               */
    }

    doDamage(room) {
        const monster = room.getFirstMonster();
        if (monster == null)
            return;
        const dicesCount = this.att + this.move;
        let dices = Array.from({ length: dicesCount }, () => Math.floor(Math.random() * 6 + 1));
        dices.sort();
        if (!this.removeMoves(dices, room.turn == 0 ? 7 : 0) && !this.attDist) {
            console.log(`Player ${this.name} does not move enough`);
            return;
        }
        monster.takeDamage(dices, this);
    }

    removeMoves(dices, minDist) {
        for (let i = 0; i <= dices.length - this.move; i++) {
            var dist = dices.slice(i, i + this.move).reduce((acc, curr) => acc + curr, 0);
            if (dist >= minDist) {
                dices.splice(i, this.move);
                return true;
            }
        }
        return false;
    }

    buyCards() {
        if (this.commonGGBought < 2 && this.gold >= 2) {
            const card = this.deck.commonCards.find(c => c.id == 'commonGG');
            this.gold -= 2;
            this.deck.playerDeck.played.push(card);
            this.commonGGBought++;
            console.log(`Player ${this.name} buy ${card.title} for ${card.cost}`);
        }
        for (let i = 0; i < this.deck.uncommonShop.drawPile.length; i++) {
            const card = this.deck.uncommonShop.drawPile[i];
            if (card.cost > this.gold)
                continue;
            this.gold -= card.cost;
            this.deck.uncommonShop.drawPile.splice(i, 1);
            if (card.type != 'artifact') {
                this.deck.playerDeck.played.push(card);
            } else {
                this.deck.artifacts.push(card);
            }
            console.log(`Player ${this.name} buy ${card.title} for ${card.cost}`);
        }
        if (this.gold < 2) {
            return;
        }
        let randChoice = this.gold == 2 ? ['commonGG', 'commonAG'] : ['commonGC', 'commonAC'];
        const cardId = randChoice[Math.floor(Math.random() * 2)];
        const card = this.deck.commonCards.find(c => c.id == cardId);
        this.deck.playerDeck.played.push(card);
        console.log(`Player ${this.name} buy ${card.title} for ${card.cost}`);
    }
}

class Monster {
    static id = 0;
    constructor(type) {
        this.type = type;
        const monsters = [
            ['G', 'Gobelin', 8, 0, 1, '🗡️'],
            ['A', 'Archer', 6, 0, 1, '🏹'],
            ['S', 'Skeleton', 1, 9, 1, '💀'],
            ['M', 'Momie', 12, 0, 1, '🎃'],
            ['Z', 'Zombie', 20, 4, 1, '🧟‍♂️'],
            ['O', 'Orc', 40, 0, 2, '👹'],
            ['B', 'aBomination', 100, 0, 2, '🦈'],
            ['C', 'ChaosWar', 3, 14, 3, '👘'],
            ['R', 'gaRgouille', 200, 0, 3, '🐉'],
        ]
        const v = monsters.find(m => m[0] == type);
        Monster.id++;
        this.name = `${v[1]}${Monster.id}`;
        this.life = v[2];
        this.def = v[3];
        this.att = v[4];
        this.icon = v[5];
        this.dmgDone = 0;
        this.absoluteDmgTaken = 0;
    }
    doDamage(players, turn) {
        if (players.length == 0)
            return;
        const attBonus = Math.floor(turn / 2);
        const aoe = this.type == 'O'
            || (turn % 2 == 1 && (this.type == 'B' || this.type == 'R'));
        const targets = aoe ? players : [players[Math.floor(Math.random() * players.length)]];
        for (let p of targets) {
            const dmg = this.att + attBonus;
            this.dmgDone += dmg;
            const prot = Math.min(p.def, dmg);
            p.def -= prot;
            const realDmg = dmg - prot;
            if (realDmg <= 0)
                return;
            p.life = Math.max(0, p.life - realDmg);
            console.log(`${this.name} do ${realDmg}💥 to ${p.name}, life: ${p.life}❤️`);
            if (p.life <= 0) {
                console.log(`Player ${p.name} is dead 💀`);
            }
        }
    }
    takeDamage(dices, from) {
        let diceDamages = dices.reduce((acc, curr) => acc + curr, 0);
        this.absoluteDmgTaken += diceDamages;
        if (this.type == 'M') {
            diceDamages = dices.filter(d => d == 6).reduce((acc, curr) => acc + curr, 0);
        }
        let realDamages = diceDamages - this.def;
        if (realDamages <= 0) {
            console.log(`Player ${from.name} does not do enough damage (${diceDamages}) to ${this.name} (${this.life}❤️)`);
            return;
        }
        if (this.type != 'C') {
            this.life = Math.max(0, this.life - realDamages);
        } else {
            this.life = Math.max(0, this.life - 1);
        }
        console.log(`Player ${from.name} do ${diceDamages}💥 damages to ${this.name} (${this.life}❤️)`);
        if (this.life <= 0) {
            console.log(`Monster ${this.name} is dead`);
        }
    }
}
class Room {
    constructor(monsters) {
        this.monsters = monsters;
        this.turn = 0;
        this.xSize = 7;
    }
    getFirstMonster() {
        return this.monsters.find(m => m.life > 0)
    }
}
let dungeon = [];
let currentRoomIndex = 0;
function createDungeon() {
    currentRoomIndex = 0;
    var d = [
        'GGG',
        'GGGA',
        'GSS',
        'SMM',
        'ZZZ',
        'OOZ',
        'B',
        'C',
        'R'
    ];
    return d.map(text => new Room(text.split('').map(c => new Monster(c))));
}

function initGame() {
    players = [new Player("P1"), new Player("P2"), new Player("P3")];
    dungeon = createDungeon();
}

function moveToCurrentRoom() {
    if (currentRoomIndex < dungeon.length) {
        var monster = dungeon[currentRoomIndex].getFirstMonster();
        if (monster) {
            return dungeon[currentRoomIndex];
        }
        currentRoomIndex++;
        console.log(`Enter in room ${currentRoomIndex + 1} / ${dungeon.length}`);
        if (currentRoomIndex < dungeon.length) {
            for (let p of players) {
                if (p.life == 0)
                    p.life == 1;
            }
            return dungeon[currentRoomIndex];
        }
    }
    return null;
}


function monstersDoDamage(room) {
    for (let m of room.monsters.filter(m => m.life > 0)) {
        m.doDamage(players.filter(p => p.life > 0), room.turn);
    }
}


async function play() {
    initGame();
    console.log(`Start game with ${players.length} players and ${allCards.length} cards`);
    for (let i = 0; i < 1000; i++) {
        await delay(1);
        playTurn();
        if (players.filter(p => p.life > 0).length == 0) {
            result = `All heroes are dead at level ${currentRoomIndex + 1} / ${dungeon.length} 💀💀💀`;
            console.log(result);
            displayDungeon(result);
            break;
        }
        if (currentRoomIndex >= dungeon.length) {
            result = "Victory! The dungeon is defeated 🎉🎉🎉";
            console.log(result);
            displayDungeon(result);
            break;
        }
    }
}

function playTurn() {
    for (let p of players) {
        p.initTurn();
    }
    let room = null;
    for (let p of players.filter(p => p.life > 0)) {
        p.playCards();
    }
    for (let p of players.filter(p => p.life > 0)) {
        p.buyCards();
    }
    for (let p of players.filter(p => p.life > 0)) {
        room = moveToCurrentRoom();
        if (room == null)
            return;
        p.doDamage(room);
    }
    if (room != null) {
        monstersDoDamage(room)
        room.turn++;
    }
}

function displayDungeon(result) {
    const div = document.getElementById('summary');
    div.innerHTML = '';
    {
        const p = document.createElement('p');
        p.textContent  = result;
        div.appendChild(p);
    }
    for (let room of dungeon) {
        const p = document.createElement('p');        
        p.textContent = room.monsters.map(m => `${m.icon} ${m.dmgDone}/${m.absoluteDmgTaken}`).join(' ');
        div.appendChild(p);
    }
}
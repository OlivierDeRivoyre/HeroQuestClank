function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let showLog = true;
function log(msg) {
    if (showLog)
        console.log(msg);
}


AddExt1();

let players = [];

class Player {
    constructor(name) {
        this.name = name;
        this.deck = new CardGameRun();
        // Assume players will behave on this one
        this.deck.playerDeck.drawPile = this.deck.playerDeck.drawPile.filter(c => c.id != 'baseMalus');
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
        this.circularAtt = false;
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
        this.applyCompetance();
       log(`Player ${this.name} ${this.life}❤️ play ${playedCard} cards for: ${this.att}⚔️, ${this.def}🛡️, ${this.gold}💎, ${this.competance}⭐`)
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
                default:log('Unmanaged card stat: ' + s);
            }
        }
        for (let attr of (card.attr || [])) {
            switch (attr) {
                case 'recycle1':
                    break;
                case 'lost1Life':
                    if (this.def > 0) {
                        this.def--;
                    }
                    else if (this.life > 0) {
                        this.life--;
                    }
                    break;
                case 'loseTrueLive':
                    if (this.life > 0) {
                        this.life--;
                    }
                    break;
                case 'bow':
                    this.attDist = true;
                    break;
                case 'drawCard':
                    break;
                case 'circularAttack':
                    this.circularAtt = true;
                    break;
                default:log('Unmanaged card attr: ' + attr);
            }
        }

    }

    applyCompetance() {
        this.att += this.competance;
    }

    doDamage(room) {
        const monster = room.getFirstMonster();
        if (monster == null)
            return;
        const dicesCount = this.att + this.move;
        let dices = Array.from({ length: dicesCount }, () => Math.floor(Math.random() * 6 + 1));
        dices.sort();
        if (!this.removeMoves(dices, room.turn == 0 ? 7 : 0) && !this.attDist) {
           log(`Player ${this.name} does not move enough`);
            return;
        }
        if (!this.circularAtt) {
            monster.takeDamage(dices, this);
        } else {
            const monsters = room.monsters.filter(m => m.life > 0).slice(0, 2);
            for (let m of monsters) {
                m.takeDamage(dices, this);
            }
        }
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
           log(`Player ${this.name} buy ${card.title} for ${card.cost}`);
        }
        this.deck.uncommonShop.drawPile.sort((a, b) => b.cost - a.cost);
        for (let i = 0; i < this.deck.uncommonShop.drawPile.length; i++) {
            const card = this.deck.uncommonShop.drawPile[i];
            if (card.type != "T1" || card.cost > this.gold)
                continue;
            this.gold -= card.cost;
            this.deck.uncommonShop.drawPile.splice(i, 1);
            if (card.type != 'artifact') {
                this.deck.playerDeck.played.push(card);
            } else {
                this.deck.artifacts.push(card);
            }
           log(`Player ${this.name} buy ${card.title} for ${card.cost}`);
        }
        if (this.gold < 2) {
            return;
        }
        let randChoice = this.gold == 2 ? ['commonGG', 'commonAG'] : ['commonGC', 'commonAC'];
        const cardId = randChoice[Math.floor(Math.random() * 2)];
        const card = this.deck.commonCards.find(c => c.id == cardId);
        this.deck.playerDeck.played.push(card);
       log(`Player ${this.name} buy ${card.title} for ${card.cost}`);
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
            ['M', 'Momie', 12, 0, 1, '🩹'],
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
        this.realDmgDone = 0;
        this.absoluteDmgTaken = 0;
    }
    doDamage(players, turn) {
        if (players.length == 0)
            return;
        const attBonus = Math.floor(turn / 2);
        const aoe = this.type == 'O'
            || (turn % 2 == 1 && (this.type == 'B' || this.type == 'R'));
        players.sort((b, a) => (a.def * 10 + a.life) - (b.def * 10 + b.life));
        let targets = aoe ?
            (this.type == 'R' ? players : players.filter(p => !p.attDist))
            : [players[0]];
        if (targets.length == 0)
            targets = [players[0]];
        for (let p of targets) {
            const dmg = this.att + attBonus;
            this.dmgDone += dmg;
            const prot = Math.min(p.def, dmg);
            p.def -= prot;
            const realDmg = dmg - prot;
            if (realDmg <= 0)
                return;
            this.realDmgDone += realDmg;
            p.life = Math.max(0, p.life - realDmg);
           log(`${this.name} do ${realDmg}💥 to ${p.name}, life: ${p.life}❤️`);
            if (p.life <= 0) {
               log(`Player ${p.name} is dead 💀`);
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
           log(`Player ${from.name} does not do enough damage (${diceDamages}) to ${this.name} (${this.life}❤️)`);
            return;
        }
        if (this.type != 'C') {
            this.life = Math.max(0, this.life - realDamages);
        } else {
            this.life = Math.max(0, this.life - 1);
        }
       log(`Player ${from.name} do ${diceDamages}💥 damages to ${this.name} (${this.life}❤️)`);
        if (this.life <= 0) {
           log(`Monster ${this.name} is dead`);
        }
    }
}
class Room {
    constructor(monsters) {
        this.monsters = monsters;
        this.turn = 0;
        this.xSize = 7;
        this.metricsHeroLives = [];
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
        'GG',    
        'GGAA',
        'GASS',
        'GMM',
        'ZZZ',
        'OZZ',
        'BZZ',
        'CZZ',
        'R'
    ];
    return d.map(text => new Room(text.split('').map(c => new Monster(c))));
}

function initGame() {
    players = [new Player("P1"), new Player("P2"), new Player("P3")/*, new Player("P4")*/];
    dungeon = createDungeon();
}

function moveToCurrentRoom() {
    if (currentRoomIndex < dungeon.length) {
        var monster = dungeon[currentRoomIndex].getFirstMonster();
        if (monster) {
            return dungeon[currentRoomIndex];
        }
        dungeon[currentRoomIndex].metricsHeroLives = players.map(p => p.life);
        currentRoomIndex++;
       log(`Enter in room ${currentRoomIndex + 1} / ${dungeon.length}`);
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


function playOneGame() {
    initGame();
   log(`Start game with ${players.length} players and ${allCards.length} cards`);
    for (let i = 0; i < 1000; i++) {
        playTurn();
        if (players.filter(p => p.life > 0).length == 0) {
            result = `All heroes are dead at level ${currentRoomIndex + 1} / ${dungeon.length} 💀💀💀`;
           log(result);
            displayDungeon(result);
            break;
        }
        if (currentRoomIndex >= dungeon.length) {
            result = "Victory! The dungeon is defeated 🎉🎉🎉";
           log(result);
            displayDungeon(result);
            break;
        }
    }
}

async function playManyGames() {
    showLog = false;
    initGame();
    const failByRooms = dungeon.map(room => ({ loseHere: 0, dmgDone: 0, turns:0 }));
    let victory = 0;
    let total = 0;
    for (let retry = 0; retry < 1000; retry++) {
        total++;
        initGame();
       log(`Start game ${total} with ${players.length} players and ${allCards.length} cards`);
        for (let i = 0; i < 1000; i++) {
            playTurn();
            if (players.filter(p => p.life > 0).length == 0) {
                result = `All heroes are dead at level ${currentRoomIndex + 1} / ${dungeon.length} 💀💀💀`;
               log(result);
                failByRooms[currentRoomIndex].loseHere++;
                break;
            }
            if (currentRoomIndex >= dungeon.length) {
                victory++;
                result = "Victory! The dungeon is defeated 🎉🎉🎉";
               log(result);
                break;
            }
        }
        for (let i = 0; i < dungeon.length; i++) {
            failByRooms[i].dmgDone += dungeon[i].monsters.reduce((acc, m) => acc + m.realDmgDone, 0);
            failByRooms[i].turns += dungeon[i].turn;
        }
        displayMultiGameSummary(failByRooms, victory, total);
        await delay(1);
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
        p.textContent = result;
        div.appendChild(p);
    }
    for (let room of dungeon) {
        const p = document.createElement('p');
        p.textContent =
            (room.metricsHeroLives.length ? `❤️ ${room.metricsHeroLives.join(",")} ` : '')
            + room.monsters.map(m => `${m.icon} ${m.realDmgDone}/${m.dmgDone}/${m.absoluteDmgTaken}`).join(' ');
        div.appendChild(p);
    }
}

function displayMultiGameSummary(failByRooms, victory, total) {
    const div = document.getElementById('summary');
    div.innerHTML = '';
    {
        const p = document.createElement('p');
        p.textContent = `Victory: ${victory}/${total}`;
        div.appendChild(p);
    }
    {
        const p = document.createElement('p');
        p.textContent = `Fails : ${failByRooms.map(s => s.loseHere).join(', ')}`;
        div.appendChild(p);
    }
    {
        const p = document.createElement('p');
        p.textContent = `Damages : ${failByRooms.map(s => s.dmgDone).join(', ')}`;
        div.appendChild(p);
    }
    {
        const p = document.createElement('p');
        p.textContent = `Turns : ${failByRooms.map(s => s.turns).join(', ')}`;
        div.appendChild(p);
    }
}
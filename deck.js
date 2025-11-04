class Deck {
    constructor(drawPile) {
        this.drawPile = drawPile
        this.hand = [];
        this.played = [];
        this.discard = [];
        Deck.shuffle(this.drawPile);
    }

    static swap(cards, i, j) {
        if (i == j) {
            return;
        }
        const c1 = cards[i];
        cards[i] = cards[j];
        cards[j] = c1;
    }
    static shuffle(cards) {
        for (let i = 0; i < cards.length; i++) {
            Deck.swap(cards, i, Math.floor(Math.random() * cards.length));
        }
    }

    drawOne() {
        if (this.drawPile.length == 0) {
            if (this.discard.length == 0) {
                return;
            }
            this.drawPile = this.discard;
            this.discard = [];
            Deck.shuffle(this.drawPile);
        }
        const picked = this.drawPile.pop();
        this.hand.push(picked);
        return picked;
    }

    drawToCount(count) {
        while (this.hand.length < count) {
            const picked = this.drawOne();
            if (!picked) {
                return;
            }
        }
    }
    handToPlayed(card) {
        const index = this.hand.findIndex(c => c == card);
        const foundCard = this.hand[index];
        this.hand.splice(index, 1);
        this.played.push(foundCard);
    }
    endTurn() {
        for (let c of this.played)
            this.discard.push(c);
        this.played = [];
    }
    handToDiscard(card) {
        const index = this.hand.findIndex(c => c == card);
        const foundCard = this.hand[index];
        this.hand.splice(index, 1);
        this.discard.push(foundCard);
    }
    backup() {
        return {
            drawPile: Array.from(this.drawPile),
            hand: Array.from(this.hand),
            played: Array.from(this.played),
            discard: Array.from(this.discard)
        }
    }
    restore(backup) {
        this.drawPile = backup.drawPile
        this.hand = backup.hand;
        this.played = backup.played;
        this.discard = backup.discard;
    }
}

class CardGameRun {
    constructor() {
        this.playerDeck = CardGameRun.createPlayerDeck();
        this.commonCards = CardGameRun.createCommonCards();
        this.uncommonShop = CardGameRun.createUncommonShop();
    }

    static createPlayerDeck() {
        const deck = [];
        for (let card of allCards) {
            if (card.type === "base") {
                for (let i = 0; i < card.quantity / 4; i++) {
                    deck.push(card);
                }
            }
        }
        return new Deck(deck);
    }
    static createCommonCards() {
        const deck = [];
        for (let card of allCards) {
            if (card.type === "common") {
                deck.push(card);
            }
        }
        return deck;
    }
    static createUncommonShop() {
        const deck = [];
        for (let card of allCards) {
            if (card.type !== "base" && card.type !== "common") {
                for (let i = 0; i < (card.quantity || 1); i++) {
                    deck.push(card);
                }
            }
        }
        return new Deck(deck);
    }
    backup() {
        return {
            playerDeck: this.playerDeck.backup(),
            uncommonShop: this.uncommonShop.backup(),
        }
    }
    restore(backup) {
        this.playerDeck.restore(backup.playerDeck);
        this.uncommonShop.restore(backup.uncommonShop);
    }
}
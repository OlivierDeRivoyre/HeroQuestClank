class Deck {
    constructor(drawPile) {
        this.drawPile = drawPile
        this.hand = [];
        this.discard = [];
    }
    
    static swap(cards, i, j){
        if(i==j){
            return;
        }
        const c1 = cards[i];
        cards[i] = cards[j];
        cards[j] = c1;
    }
   static shuffle(cards){
        for(let i = 0; i < cards.length; i++){
            Deck.swap(cards, i, Math.floor(Math.random() * cards.length));
        }
    }

    drawOne(){
        if(this.drawPile.length == 0){
            if(this.discard.length == 0){
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

    drawToCount(count){
        while(this.hand.length < count){
            const picked = this.drawOne();
            if(!picked){
                return;
            }
        }
    }

    
}

class CardGameRun {
    constructor(){
        this.playerDeck = CardGameRun.createPlayerDeck();
        this.commonShop = CardGameRun.createCommonShop();
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
    static createCommonShop() {
        const deck = [];
        for (let card of allCards) {
            if (card.type === "common") {
                for (let i = 0; i < card.quantity; i++) {
                    deck.push(card);
                }
            }
        }
         return new Deck(deck);
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
}
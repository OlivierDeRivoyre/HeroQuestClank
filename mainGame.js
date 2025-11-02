const TickDuration = 30;//30ms, it is around 30 ticks per second

function runTick() {
    tickNumber++;
    game.update();
    game.paint();
    setTimeout(() => this.runTick(), TickDuration);
}

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search)
const urlLevel = parseInt(params.get('lvl') || 1);
const urlCardIndex = parseInt(params.get('card'));

game = new Game();
if(urlCardIndex){
    game.cards.playerDeck.hand.push(allCards[urlCardIndex])
}
game.currentView = new LevelView(urlLevel);
onCardImageReadyfunc = () => {     
    runTick();
};
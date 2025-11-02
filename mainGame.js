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
const urlCardIndexes = (params.get('card')||'').split(',').map(s => parseInt(s));

game = new Game();
if(urlCardIndexes){
    for(let i of urlCardIndexes)
        if(i)
            game.cards.playerDeck.hand.push(allCards[i])
}
game.currentView = new LevelView(urlLevel);
onCardImageReadyfunc = () => {     
    runTick();
};
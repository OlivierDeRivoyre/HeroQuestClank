const TickDuration = 200;//ms, it is around 5 ticks per second

let lastTime = 0;
function animate(time) {
    if (time - lastTime >= 200) {
        lastTime = time;
        tickNumber++;
        // game.update();
        game.paint();     
    }
    requestAnimationFrame(animate);
}

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search)
const urlLevel = parseInt(params.get('lvl') || 1);
const urlCardIndexes = (params.get('card') || '').split(',').map(s => parseInt(s));

game = new Game();
if (urlCardIndexes) {
    for (let i of urlCardIndexes)
        if (i)
            game.cards.playerDeck.hand.push(allCards[i])
}
game.currentView = new LevelView(urlLevel);
onCardImageReadyfunc = () => {
    requestAnimationFrame(animate);
};
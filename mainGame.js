const TickDuration = 30;//30ms, it is around 30 ticks per second

function runTick() {
    tickNumber++;
    game.update();
    game.paint();
    setTimeout(() => this.runTick(), TickDuration);
}
game = new Game();
game.currentView = new LevelView();
onBigCardPaintedfunc = () => runTick();
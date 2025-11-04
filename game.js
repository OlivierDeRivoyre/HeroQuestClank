let tickNumber = 0;

class Game {
    constructor() {
        this.screen = screen;
        this.cards = new CardGameRun();
        this.currentView = null;
    }
    click(mouseCoord) {
        this.currentView.click(mouseCoord);
        this.paint();
    }
    paint() {
        this.currentView.paint();
    }
    newGame() {
        this.cards = new CardGameRun();
        this.currentView = new LevelView(1);
    }
    save() {
        const msg = {};
        msg.saveVersion = 1.0;
        localStorage.setItem("save", JSON.stringify(msg));
    }
    load() {
        const json = localStorage.getItem("save");
        if (!json) {
            return;
        }
        const msg = JSON.parse(json);
        if (msg.saveVersion != 1.0) {
            console.log("Old save version: " + msg.saveVersion);
            return;
        }

    }
}
let game = null;

function fullScreen() {
    if (game == null) {
        return;
    }
    game.screen.fullScreen();
}
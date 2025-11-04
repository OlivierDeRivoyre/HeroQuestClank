const CanvasCellWidth = 16;
const CanvasCellHeight = 9;
const GameScreenWidth = 64 * CanvasCellWidth;//1024
const GameScreenHeight = 64 * CanvasCellHeight;//576

class Screen {
    constructor() {
        this.width = GameScreenWidth;
        this.heigth = GameScreenHeight;
        this.screenCanvas = document.getElementById("myCanvas");
        this.canvas = new FixedCanvas(GameScreenWidth, GameScreenHeight, this.screenCanvas)
        this.screenCtx = this.screenCanvas.getContext("2d");
        this.windowResize();

        window.addEventListener('resize', () => this.windowResize(), false);
        window.addEventListener('click', (e) => this.click(e), false);
    }
    clear() {
        this.canvas.clear();
    }

    click(e) {
        //console.log(e);
        game.click(this.canvas.toCanvasCoord(e.offsetX, e.offsetY))
    }
    windowResize() {
        if (document.fullscreenElement) {
            this.screenCanvas.width = window.innerWidth;
            this.screenCanvas.height = window.innerHeight;
        } else {
            console.log("devicePixelRatio: " + window.devicePixelRatio)
            let w = (window.innerWidth - 40) * window.devicePixelRatio;
            let h = (window.innerHeight - 40) * window.devicePixelRatio;
            if (h * 16 > w * 9) {
                h = Math.floor(w * 9 / 16);
            } else {
                w = Math.floor(h * 16 / 9);
            }
            this.screenCanvas.width = w;
            this.screenCanvas.height = h;
        }
        this.canvas.onCanvasSizeChanged();
    }
    fullScreen() {
        if (this.screenCanvas.webkitRequestFullScreen) {
            this.screenCanvas.webkitRequestFullScreen();
        }
        else {
            this.screenCanvas.mozRequestFullScreen();
        }
    }
}
const screen = new Screen();
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
        this.screenCanvas.onmouseup = (e) => this.click(e);
    }
    clear() {
        this.canvas.clear();
    }

    click(e) {
        //console.log(e);
        game.click(this.canvas.toCanvasCoord(e.offsetX, e.offsetY))
    }
    windowResize() {
        let w = (window.outerWidth - 40);
        let h = (window.outerHeight - 108);
        if (h * 16 > w * 9) {
            h = Math.floor(w * 9 / 16);
        } else {
            w = Math.floor(h * 16 / 9);
        }
        this.screenCanvas.width = w;
        this.screenCanvas.height = h;

        this.canvas.onCanvasSizeChanged();
    }

}
const screen = new Screen();
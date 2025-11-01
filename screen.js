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
        window.addEventListener('mousemove', (e) => this.mouseMove(e), false);
        window.addEventListener('mousedown', (e) => this.mouseDown(e), false);
        window.addEventListener('mouseup', (e) => this.mouseUp(e), false);
    }
    clear() {
        this.canvas.clear();
    }

    mouseMove(event) {
        input.mouseMove(this.canvas.toCanvasCoord(event.offsetX, event.offsetY));
    }
    mouseButton(e, pressed) {
        let rightclick = false;
        if (e.which) {
            rightclick = (e.which == 3);
        } else if (e.button) {
            rightclick = (e.button == 2);
        }
        input.mouseButton(this.canvas.toCanvasCoord(e.offsetX, e.offsetY), pressed, rightclick);
    }
    mouseDown(event) {
        this.mouseButton(event, true);
    }
    mouseUp(event) {
        this.mouseButton(event, false);
    }
    windowResize() {
        if (document.fullscreenElement) {
            this.screenCanvas.width = window.innerWidth;
            this.screenCanvas.height = window.innerHeight;
        } else {
            let w = window.innerWidth - 40;
            let h = window.innerHeight - 80;
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
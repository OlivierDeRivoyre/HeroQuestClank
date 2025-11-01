const CanvasCellWidth = 16;
const CanvasCellHeight = 9;
const CanvasWidth = 64 * CanvasCellWidth;//1024
const CanvasHeight = 64 * CanvasCellHeight;//576

const canvas = document.createElement("canvas");
canvas.width = CanvasWidth;
canvas.height = CanvasHeight;
canvas.style.imageRendering = 'pixelated';
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

function isInsideRect(coord, rect) {
    const insideX = coord.x >= rect.x && coord.x < rect.x + rect.width;
    const insideY = coord.y >= rect.y && coord.y < rect.y + rect.height;
    return insideX && insideY;
}

class Screen {
    constructor() {
        this.screenCanvas = document.getElementById("myCanvas");
        this.screenCanvas.style.imageRendering = 'pixelated';
        this.screenCtx = this.screenCanvas.getContext("2d");

        this.windowResize();
        window.addEventListener('resize', () => this.windowResize(), false);
        window.addEventListener('mousemove', (e) => this.mouseMove(e), false);
        window.addEventListener('mousedown', (e) => this.mouseDown(e), false);
        window.addEventListener('mouseup', (e) => this.mouseUp(e), false);
    }
    scaleOnScreen() {
        this.screenCtx.imageSmoothingEnabled = false;
        this.screenCtx.clearRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);
        this.screenCtx.drawImage(canvas,
            0, 0, canvas.width, canvas.height,
            0, 0, this.screenCanvas.width, this.screenCanvas.height)
    }
    toCanvasCoord(x, y) {
        return {
            x: Math.floor(x * canvas.width / this.screenCanvas.width),
            y: Math.floor(y * canvas.height / this.screenCanvas.height)
        };
    }
    mouseMove(event) {
        input.mouseMove(this.toCanvasCoord(event.offsetX, event.offsetY));
    }
    mouseButton(e, pressed) {
        let rightclick = false;
        if (e.which) {
            rightclick = (e.which == 3);
        } else if (e.button) {
            rightclick = (e.button == 2);
        }
        input.mouseButton(this.toCanvasCoord(event.offsetX, event.offsetY), pressed, rightclick);
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
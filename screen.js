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

class Screen {

    constructor() {
        this.width = CanvasWidth;
        this.heigth = CanvasHeight;

        this.screenCanvas = document.getElementById("myCanvas");
        // this.screenCanvas.style.imageRendering = 'pixelated';
        this.screenCtx = this.screenCanvas.getContext("2d");
        this.ratio = 1;
        this.windowResize();

        window.addEventListener('resize', () => this.windowResize(), false);
        window.addEventListener('mousemove', (e) => this.mouseMove(e), false);
        window.addEventListener('mousedown', (e) => this.mouseDown(e), false);
        window.addEventListener('mouseup', (e) => this.mouseUp(e), false);
    }
    clear() {
        this.screenCtx.clearRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);
    }
    toCanvas(x) {
        return Math.floor(x * this.ratio);
    }
    drawImage(img, x, y, w, h) {
        this.screenCanvas.style.imageRendering = 'auto';
         this.screenCtx.imageSmoothingEnabled = true;
        this.screenCtx.drawImage(img, this.toCanvas(x), this.toCanvas(y), this.toCanvas(w), this.toCanvas(h));
    }
    drawPixelateImage(img, x, y) {
      
        this.screenCanvas.style.imageRendering = 'pixelated';
        this.screenCtx.imageSmoothingEnabled = false;
        this.screenCtx.drawImage(img,
            0, 0, img.width, img.height,
            this.toCanvas(x), this.toCanvas(y), this.toCanvas(img.width), this.toCanvas(img.height));
    }

    scaleOnScreen() {
        return;
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
        this.ratio = this.screenCanvas.width / this.width;
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
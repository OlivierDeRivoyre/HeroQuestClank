// Draw as if the canvas was of fixed size
class FixedCanvas {
    constructor(width, height, screenCanvas) {
        this.width = width;
        this.height = height;
        this.screenCanvas = screenCanvas;
        this.screenCtx = this.screenCanvas.getContext("2d");
        this.onCanvasSizeChanged();
    }
    onCanvasSizeChanged() {
        this.ratio = this.screenCanvas.width / this.width;
    }
    toCanvas(x) {
        return Math.floor(x * this.ratio);
    }
    clear() {
        this.screenCtx.clearRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);
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
    toCanvasCoord(x, y) {
        return {
            x: Math.floor(x * this.width / this.screenCanvas.width),
            y: Math.floor(y * this.height / this.screenCanvas.height)
        };
    }
}
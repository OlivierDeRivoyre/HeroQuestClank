// Draw as if the canvas was of fixed size
class FixedCanvas {
    constructor(width, height, screenCanvas) {
        this.width = width;
        this.height = height;
        this.screenCanvas = screenCanvas;
        this.screenCtx = this.screenCanvas.getContext("2d");
        this.onCanvasSizeChanged();
        this.fontName = '"MedievalSharp"';
        this.fontSize = '24';
        this.fillStyle = '#002';  
    }
    onCanvasSizeChanged() {
        this.ratio = this.screenCanvas.width / this.width;
    }
    toCanvas(x) {
        return Math.floor(x * this.ratio);
    }
    toCanvasCoord(x, y) {
        return {
            x: Math.floor(x * this.width / this.screenCanvas.width),
            y: Math.floor(y * this.height / this.screenCanvas.height)
        };
    }
    clear() {
        this.screenCtx.clearRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);
    }
    fillColor(color) {
        this.screenCtx.fillStyle = color;
        this.screenCtx.fillRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);
    }
    drawImage(img, x, y, w, h) {
        this.screenCanvas.style.imageRendering = 'auto';
        this.screenCtx.imageSmoothingEnabled = true;
        w = w || img.width;
        h = h || img.height;
        this.screenCtx.drawImage(img, this.toCanvas(x), this.toCanvas(y), this.toCanvas(w), this.toCanvas(h));
    }
    drawPixelateImage(img, x, y) {
        this.screenCanvas.style.imageRendering = 'pixelated';
        this.screenCtx.imageSmoothingEnabled = false;
        this.screenCtx.drawImage(img,
            0, 0, img.width, img.height,
            this.toCanvas(x), this.toCanvas(y), this.toCanvas(img.width), this.toCanvas(img.height));
    }
    getFont() {
        const screenPx = Math.ceil(this.fontSize * this.ratio);
        return screenPx + 'px ' + this.fontName;
    }
    measureTextWidth(text) {
        this.screenCtx.font = this.getFont();
        const textMetrics = this.screenCtx.measureText(text);
        const textWidth = textMetrics.width;
        return Math.ceil(textWidth / this.ratio);
    }
    fillText(text, x, y) {
        this.screenCtx.font = this.getFont();
        this.screenCtx.fillStyle = this.fillStyle; 
        this.screenCtx.fillText(text, this.toCanvas(x), this.toCanvas(y));
    }
    /// Have a canvas with the same dpi than the screenCanvas
    createZoomedCanvas(gameW, gameH, painterW, painterH){
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(gameW * this.ratio);
        canvas.height = Math.floor(gameH * this.ratio);
        const newFixedCanvas = new FixedCanvas(painterW, painterH, canvas);
        newFixedCanvas.validRatio = this.ratio;
        return newFixedCanvas;
    }
    isCanvasSameRatio(otherfixedCanvas){
        if(!otherfixedCanvas)
            return false;
        return this.ratio == otherfixedCanvas.validRatio;
    }
    drawFixedCanvas(otherfixedCanvas, x, y){
        this.drawImage(otherfixedCanvas.screenCanvas, x, y);
    }
}

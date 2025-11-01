const dungeonTileSet = loadImg("0x72_DungeonTilesetII_v1.7.png");
function getDungeonTileSetHeroSprite(j, topMargin) {
    const x = 128;
    const y = j * 32;
    return new Sprite(dungeonTileSet, x, y + topMargin, 16, 32 - topMargin);
}
function getDungeonTileSetVilainSprite(i, topMargin) {
    const x = 368;
    const y = 9 + i * 24;
    return new Sprite(dungeonTileSet, x, y + topMargin, 16, 24 - topMargin);
}


class Sprite {
    constructor(tile, tx, ty, tWidth, tHeight) {
        this.tile = tile;
        this.tx = tx;
        this.ty = ty;
        this.tWidth = tWidth;
        this.tHeight = tHeight;

        this.pixelateCanvas = document.createElement("canvas");
        this.pixelateCanvas.width = tWidth * 2;
        this.pixelateCanvas.height = tHeight * 2;
        this.pixelateCanvas.style.imageRendering = 'pixelated';
        this.pixelateCtx = this.pixelateCanvas.getContext("2d");
        this.pixelateCtx.imageSmoothingEnabled = false;
    }
    paint(x, y, index, reverse) {
        index |= 0;
        if (reverse) {
            this.paintReverse(x, y, index);
            return;
        }
        this.pixelateCtx.clearRect(0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height);
        this.pixelateCtx.drawImage(this.tile,
            this.tx + index * this.tWidth, this.ty, this.tWidth, this.tHeight,
            0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height)
        screen.canvas.drawPixelateImage(this.pixelateCanvas, x, y);
    }

    paintReverse(x, y, index) {
        this.pixelateCtx.clearRect(0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height);
        this.pixelateCtx.save();
        this.pixelateCtx.translate(this.pixelateCanvas.width, 0);
        this.pixelateCtx.scale(-1, 1);
        this.pixelateCtx.drawImage(this.tile,
            this.tx + index * this.tWidth, this.ty, this.tWidth, this.tHeight,
            0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height)       
        this.pixelateCtx.restore();
        screen.canvas.drawPixelateImage(this.pixelateCanvas, x, y);
    }

}

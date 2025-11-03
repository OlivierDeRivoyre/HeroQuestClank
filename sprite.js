const dungeonTileSet = loadImg("0x72_DungeonTilesetII_v1.7.png");
const shikashiTileSet = loadImg("Shikashi.png");
function getDungeonTileSetHeroSprite(j, topMargin) {
    const x = 128;
    const y = j * 32;
    return new Sprite(dungeonTileSet, x, y + topMargin, 16, 32 - topMargin, 2);
}
function getDungeonTileSetVilainSprite(i, topMargin) {
    const x = 368;
    const y = 9 + i * 24;
    return new Sprite(dungeonTileSet, x, y + topMargin, 16, 24 - topMargin, 2);
}
function getDungeonTileSetFloorSprite() {
    const x = 16;
    const y = 64;
    return new Sprite(dungeonTileSet, x, y, 16, 16, 2);
}
function getShikashiSprite(i, j){
     return new Sprite(shikashiTileSet, i * 32, j * 32, 32, 32, 1);
}

class Sprite {
    constructor(tile, sx, sy, sWidth, sHeight, ratio) {
        this.tile = tile;
        this.sourceX = sx;
        this.sourceY = sy;
        this.sourceWidth = sWidth;
        this.sourceHeight = sHeight;

        this.pixelateCanvas = document.createElement("canvas");
        this.pixelateCanvas.width = sWidth * ratio;
        this.pixelateCanvas.height = sHeight * ratio;
        this.pixelateCanvas.style.imageRendering = 'pixelated';
        this.pixelateCtx = this.pixelateCanvas.getContext("2d");
        this.pixelateCtx.imageSmoothingEnabled = false;
    }
    paint(x, y, index, reverse) {
        index ||= 0;
        if (reverse) {
            this.paintReverse(x, y, index);
            return;
        }
        this.pixelateCtx.clearRect(0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height);
        this.pixelateCtx.drawImage(this.tile,
            this.sourceX + index * this.sourceWidth, this.sourceY, this.sourceWidth, this.sourceHeight,
            0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height)
        screen.canvas.drawPixelateImage(this.pixelateCanvas, x, y);
    }

    paintReverse(x, y, index) {
        this.pixelateCtx.clearRect(0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height);
        this.pixelateCtx.save();
        this.pixelateCtx.translate(this.pixelateCanvas.width, 0);
        this.pixelateCtx.scale(-1, 1);
        this.pixelateCtx.drawImage(this.tile,
            this.sourceX + index * this.sourceWidth, this.sourceY, this.sourceWidth, this.sourceHeight,
            0, 0, this.pixelateCanvas.width, this.pixelateCanvas.height)
        this.pixelateCtx.restore();
        screen.canvas.drawPixelateImage(this.pixelateCanvas, x, y);
    }

}

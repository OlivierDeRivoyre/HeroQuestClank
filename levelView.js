class LevelView{

    constructor(){
        this.sampleSprite = getDungeonTileSetHeroSprite(0, 14);
    }

    update(){

    }

    paint(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.sampleSprite.paint(50,50, tickNumber % 20 > 10, true);
    }


}

class Monsters {
    // 6 lives
    static getGobelin(x, y) {
        const monster = new Character();
        monster.type = "gobelin";
        monster.sprite = getDungeonTileSetVilainSprite(0, 12);
        monster.marginY = 6;
        monster.life = monster.maxLife = 6;
        monster.cell = { x, y };
        return monster;
    }
    // 1 heart at 10+
    static getSkeleton(x, y) {
        const monster = new Character();
        monster.type = "skeleton";
        monster.sprite = getDungeonTileSetVilainSprite(3, 10);
        monster.marginY = 2;
        monster.life = monster.maxLife = 1;
        monster.hasStoneHearts = true;
        monster.shield = 10;
        monster.cell = { x, y };
        monster.monsterMaxWalkSteps = 5;
        return monster;
    }
    // 25 life
    static getMummy(x, y) {
        const monster = new Character();
        monster.type = "mummy";
        monster.sprite = getDungeonTileSetVilainSprite(14, 6);
        monster.marginY = -6;
        monster.life = monster.maxLife = 25;
        monster.cell = { x, y };
        monster.monsterMaxWalkSteps = 4;
        return monster;
    }
    // 5 def, 20 life
    static getZomby(x, y) {
        const monster = new Character();
        monster.type = "zomby";
        monster.sprite = getDungeonTileSetVilainSprite(5, 8);
        monster.marginY = 2;
        monster.life = monster.maxLife = 20;
        monster.shield = 5;
        monster.cell = { x, y };
        monster.monsterMaxWalkSteps = 3;
        return monster;
    }
    // 40 life, circular att
    static getOrc(x, y) {
        const monster = new Character();
        monster.type = "orc";
        monster.sprite = getDungeonTileSetVilainSprite(7, 8);
        monster.marginY = 2;
        monster.life = monster.maxLife = 40;
        monster.circularAttack = true;
        monster.cell = { x, y };
        monster.monsterMaxWalkSteps = 6;
        return monster;
    }
    // 10 life, dist att, target weaker
    static getMage(x, y) {
        const monster = new Character();
        monster.type = "mage";
        monster.sprite = getDungeonTileSetVilainSprite(9, 8);
        monster.marginY = 2;
        monster.life = monster.maxLife = 10;
        monster.hasBow = true;
        monster.cell = { x, y };
        monster.monsterMaxWalkSteps = 5;
        return monster;
    }
    // 20 life, 10 att reduc
    static getKnight(x, y) {
        const monster = new Character();
        monster.type = "knight";
        monster.sprite = getDungeonTileSetVilainSprite(13, 4);
        monster.marginY = -6;
        monster.life = monster.maxLife = 20;
        monster.shield = 10;
        monster.cell = { x, y };
        monster.monsterMaxWalkSteps = 5;
        return monster;
    }
    // 5 hearths 12+
    static getGargoyle(x, y) {
        const monster = new Character();
        monster.type = "gobelin";
        monster.sprite = getDungeonTileSetVilainSprite(11, 6);
        monster.marginY = -4;
        monster.life = monster.maxLife = 5;
        monster.shield = 12;
        monster.hasStoneHearts = true;
        monster.cell = { x, y };
        monster.monsterMaxWalkSteps = 5;
        return monster;
    }
    static getEnnemies(levelView) {
        switch (levelView.level) {
            case 1: return [
                Monsters.getGobelin(11, 3)
            ];
            case 2: return [
                Monsters.getMummy(10, 3)
            ];
            case 3: return [
                Monsters.getMummy(11, 1),
                Monsters.getGobelin(10, 4)
            ];
            case 4: return [
                Monsters.getGobelin(9, 0),
                Monsters.getGobelin(10, 1),
                Monsters.getMummy(11, 7)
            ];
            case 5: return [
                Monsters.getSkeleton(10, 3)
            ];
            case 6: return [
                Monsters.getMummy(10, 3),
                Monsters.getSkeleton(11, 7)
            ];
            case 7: return [
                Monsters.getMage(11, 0)
            ];
            case 8: {
                levelView.heroes[0].cell = { x: 4, y: 7 };
                levelView.heroes[1].cell = { x: 6, y: 7 };
                levelView.heroes[2].cell = { x: 5, y: 7 };
                return [
                    Monsters.getMage(11, 0),
                    Monsters.getMage(0, 0),
                ];
            }
            case 9: return [
                Monsters.getZomby(10, 3),
            ];
            case 10: return [
                Monsters.getGobelin(11, 0),
                Monsters.getZomby(10, 3)
            ];
            case 11: {
                levelView.heroes[0].cell = { x: 4, y: 3 };
                levelView.heroes[1].cell = { x: 6, y: 4 };
                levelView.heroes[2].cell = { x: 5, y: 4 };
                return [
                    Monsters.getGobelin(0, 0),
                    Monsters.getGobelin(0, 7),
                    Monsters.getGobelin(11, 0),
                    Monsters.getGobelin(11, 7),
                ];
            }

            case 12: return [
                Monsters.getOrc(10, 3)
            ];
            case 13: return [
                Monsters.getOrc(10, 3),
                Monsters.getGobelin(11, 2),
                Monsters.getGobelin(11, 4),
            ];
            case 14: return [
                Monsters.getOrc(10, 3),
                Monsters.getGobelin(11, 2),
                Monsters.getGobelin(11, 4),
                Monsters.getGobelin(9, 2),
                Monsters.getGobelin(9, 4),
            ];
            case 15: return [
                Monsters.getKnight(10, 3)
            ];
            case 16: return [
                Monsters.getKnight(10, 3),
                Monsters.getGobelin(11, 2),
                Monsters.getGobelin(11, 4),
            ];
            case 17: return [
                Monsters.getOrc(10, 3),
                Monsters.getKnight(11, 2),
                Monsters.getSkeleton(11, 4),
            ];
            case 18: return [
                Monsters.getOrc(10, 3),
                Monsters.getOrc(10, 6),
                Monsters.getMage(11, 0),
            ];
            case 19: return [
                Monsters.getGargoyle(10, 4),
            ];
            default: return [
                Monsters.getGobelin(9, 0),
                Monsters.getSkeleton(10, 1),
                Monsters.getMummy(11, 2),
                Monsters.getZomby(10, 3),
                Monsters.getOrc(9, 4),
                Monsters.getMage(10, 5),
                Monsters.getKnight(11, 6),
                Monsters.getGargoyle(10, 7)
            ];
        }
    }
}
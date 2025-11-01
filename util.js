function square(x) {
    return x * x;
}
function distanceSquare(coord1, coord2) {
    return square(coord1.x - coord2.x) + square(coord1.y - coord2.y);
}
function computeDistance(coord1, coord2) {
    return Math.sqrt(distanceSquare(coord1, coord2));
}
function isInsideRect(coord, rect) {
    const insideX = coord.x >= rect.x && coord.x < rect.x + rect.width;
    const insideY = coord.y >= rect.y && coord.y < rect.y + rect.height;
    return insideX && insideY;
}
/*
function mulberry32(seed) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
let rand = mulberry32(12345);
*/
function getNextRand(previous) {
    return ((previous + 11) * 16807) % 2147483647;
}
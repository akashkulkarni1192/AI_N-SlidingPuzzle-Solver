import {Rectangle} from "./Rectangle";
import {Text} from "./Text";
import {AppConstants} from "./AppConstants";
export class Tile {
    rect:Rectangle;
    text:Text;
    value:number;
    row:number;
    col:number;

    constructor(rectX, rectY, rectSideLength, rectStyle, textX, textY, value, row, col, r) {
        this.value = value;
        this.rect = new Rectangle(rectX, rectY, rectSideLength, rectStyle, r);
        this.text = new Text(textX, textY, this.value);
        this.row = row;
        this.col = col;
    }

    public static highlightTile(tile) {
        tile.childNodes[0].setAttribute("style", AppConstants.tileStyleHighlight);
    }

    public static normalizeTile(tile) {
        tile.childNodes[0].setAttribute("style", AppConstants.tileStyleNormal);
    }

    public static normalizeBlankTile(tile) {
        tile.childNodes[0].setAttribute("style", AppConstants.tileStyleBlank);
    }

    public static isMovableToBlank(main, tileIndex) {
        var selectedTileRow = parseInt(main.puzzle.tiles[tileIndex].row);
        var selectedTileCol = parseInt(main.puzzle.tiles[tileIndex].col);
        var blankTileRow = parseInt(main.puzzle.tiles[main.puzzle.indexBlankTile].row);
        var blankTileCol = parseInt(main.puzzle.tiles[main.puzzle.indexBlankTile].col);
        var rowDiff = Math.abs(selectedTileRow - blankTileRow);
        var colDiff = Math.abs(selectedTileCol - blankTileCol);
        var sumDiff = rowDiff + colDiff;
        return (sumDiff <= 1);
    }

    public canGoUp() {
        return !(this.row <= 0)
    }

    public canGoDown(rowMax) {
        return !(this.row >= rowMax)
    }

    public canGoLeft() {
        return !(this.col <= 0)
    }

    public canGoRight(colMax) {
        return !(this.col >= colMax)
    }

    public getRenderableTileElement(index) {
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute('id', 'tile_' + (index + 1));
        return g;
    }

    public clone(){
        return Object.create(this);
    }
}

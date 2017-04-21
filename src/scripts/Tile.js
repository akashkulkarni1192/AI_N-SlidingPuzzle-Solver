System.register(["./Rectangle", "./Text", "./AppConstants"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rectangle_1, Text_1, AppConstants_1, Tile;
    return {
        setters: [
            function (Rectangle_1_1) {
                Rectangle_1 = Rectangle_1_1;
            },
            function (Text_1_1) {
                Text_1 = Text_1_1;
            },
            function (AppConstants_1_1) {
                AppConstants_1 = AppConstants_1_1;
            }
        ],
        execute: function () {
            Tile = (function () {
                function Tile(rectX, rectY, rectSideLength, rectStyle, textX, textY, value, row, col, r) {
                    this.value = value;
                    this.rect = new Rectangle_1.Rectangle(rectX, rectY, rectSideLength, rectStyle, r);
                    this.text = new Text_1.Text(textX, textY, this.value);
                    this.row = row;
                    this.col = col;
                }
                Tile.highlightTile = function (tile) {
                    tile.childNodes[0].setAttribute("style", AppConstants_1.AppConstants.tileStyleHighlight);
                };
                Tile.normalizeTile = function (tile) {
                    tile.childNodes[0].setAttribute("style", AppConstants_1.AppConstants.tileStyleNormal);
                };
                Tile.normalizeBlankTile = function (tile) {
                    tile.childNodes[0].setAttribute("style", AppConstants_1.AppConstants.tileStyleBlank);
                };
                Tile.isMovableToBlank = function (main, tileIndex) {
                    var selectedTileRow = parseInt(main.puzzle.tiles[tileIndex].row);
                    var selectedTileCol = parseInt(main.puzzle.tiles[tileIndex].col);
                    var blankTileRow = parseInt(main.puzzle.tiles[main.puzzle.indexBlankTile].row);
                    var blankTileCol = parseInt(main.puzzle.tiles[main.puzzle.indexBlankTile].col);
                    var rowDiff = Math.abs(selectedTileRow - blankTileRow);
                    var colDiff = Math.abs(selectedTileCol - blankTileCol);
                    var sumDiff = rowDiff + colDiff;
                    return (sumDiff <= 1);
                };
                Tile.prototype.canGoUp = function () {
                    return !(this.row <= 0);
                };
                Tile.prototype.canGoDown = function (rowMax) {
                    return !(this.row >= rowMax);
                };
                Tile.prototype.canGoLeft = function () {
                    return !(this.col <= 0);
                };
                Tile.prototype.canGoRight = function (colMax) {
                    return !(this.col >= colMax);
                };
                Tile.prototype.getRenderableTileElement = function (index) {
                    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    g.setAttribute('id', 'tile_' + (index + 1));
                    return g;
                };
                Tile.prototype.clone = function () {
                    return {
                        rect: this.rect,
                        text: this.text,
                        value: this.value,
                        row: this.row,
                        col: this.col
                    };
                };
                return Tile;
            }());
            exports_1("Tile", Tile);
        }
    };
});
//# sourceMappingURL=Tile.js.map
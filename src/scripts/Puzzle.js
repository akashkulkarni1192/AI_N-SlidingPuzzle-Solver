System.register(["./Tile", "./AppConstants"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Tile_1, AppConstants_1, Puzzle;
    return {
        setters: [
            function (Tile_1_1) {
                Tile_1 = Tile_1_1;
            },
            function (AppConstants_1_1) {
                AppConstants_1 = AppConstants_1_1;
            }
        ],
        execute: function () {
            Puzzle = (function () {
                function Puzzle(size, puzzle) {
                    this.tiles = [];
                    if (puzzle == null) {
                        this.size = size;
                        this.tileSize = AppConstants_1.AppConstants.tileSize;
                        var r = AppConstants_1.AppConstants.tileRadius;
                        var spacing = AppConstants_1.AppConstants.tileSpacing;
                        var rectX = 0, rectY = 0;
                        var textX = rectX + this.tileSize / 2 - spacing, textY = rectY + this.tileSize / 2 + spacing, value = 0;
                        var initialRectX = rectX, initialTextX = textX;
                        for (var i = 0; i < this.size; ++i) {
                            rectX = initialRectX;
                            textX = initialTextX;
                            for (var j = 0; j < this.size; ++j) {
                                value++;
                                this.tiles.push(new Tile_1.Tile(rectX, rectY, this.tileSize, AppConstants_1.AppConstants.tileStyleNormal, textX, textY, value, i, j, r));
                                rectX = rectX + this.tileSize + spacing;
                                textX = rectX + this.tileSize / 2;
                            }
                            rectY = rectY + this.tileSize + spacing;
                            textY = rectY + this.tileSize / 2;
                        }
                        this.tiles[this.size * this.size - 1].value = -1;
                        this.tiles[this.size * this.size - 1].text.value = -1;
                        this.tiles[this.size * this.size - 1].rect.style = AppConstants_1.AppConstants.tileStyleBlank;
                        this.indexBlankTile = this.size * this.size - 1;
                        this.shuffleTiles();
                    }
                    else {
                        this.size = size;
                        this.tileSize = AppConstants_1.AppConstants.tileSize;
                        this.tiles = [];
                        for (var i = 0; i < puzzle.tiles.length; ++i) {
                            this.tiles.push(Object.create(puzzle.tiles[i]));
                        }
                        this.indexBlankTile = puzzle.indexBlankTile;
                    }
                }
                Puzzle.prototype.shuffleTiles = function () {
                    var currentIndex = this.tiles.length, temporaryValue, temporaryTextValue, temporaryStyle, randomIndex;
                    while (0 !== currentIndex) {
                        randomIndex = Math.floor(Math.random() * (this.size * this.size));
                        currentIndex -= 1;
                        this.swapTile(currentIndex, randomIndex);
                    }
                };
                Puzzle.prototype.makeRandom = function () {
                    this.shuffleTiles();
                };
                Puzzle.prototype.swapTileBackend = function (i, j) {
                    // Swap in BackEnd Array
                    var temporaryValue, temporaryTextValue, temporaryStyle, temporaryRow, temporaryCol;
                    temporaryValue = this.tiles[i].value;
                    temporaryTextValue = this.tiles[i].text.value;
                    temporaryStyle = this.tiles[i].rect.style;
                    this.tiles[i].value = this.tiles[j].value;
                    this.tiles[i].text.value = this.tiles[j].text.value;
                    this.tiles[i].rect.style = this.tiles[j].rect.style;
                    this.tiles[j].value = temporaryValue;
                    this.tiles[j].text.value = temporaryTextValue;
                    this.tiles[j].rect.style = temporaryStyle;
                    // Update new Index of Blank Tile
                    if (this.tiles[i].value == -1 || this.tiles[j].value == -1) {
                        if (this.tiles[j].value == -1) {
                            this.indexBlankTile = j;
                        }
                        else {
                            this.indexBlankTile = i;
                        }
                    }
                };
                Puzzle.prototype.swapTile = function (i, j) {
                    this.swapTileBackend(i, j);
                    // Swap in UI
                    var t1ui = document.getElementById("tile_" + (i + 1));
                    var t2ui = document.getElementById("tile_" + (j + 1));
                    if (t1ui && t2ui) {
                        var t1uiID = "tile_" + (i + 1);
                        var t1rectID = "tile_" + (i + 1) + "_rect";
                        var t1rectX = parseInt(t1ui.childNodes[0].getAttribute("x"));
                        var t1rectY = parseInt(t1ui.childNodes[0].getAttribute("y"));
                        var t1textX = parseInt(t1ui.childNodes[1].getAttribute("x"));
                        var t1textY = parseInt(t1ui.childNodes[1].getAttribute("y"));
                        var t1mouseover = t1ui.mouseover;
                        var t1mouseleave = t1ui.mouseleave;
                        var t1click = t1ui.click;
                        var t2uiID = "tile_" + (j + 1);
                        var t2rectID = "tile_" + (j + 1) + "_rect";
                        var t2rectX = parseInt(t2ui.childNodes[0].getAttribute("x"));
                        var t2rectY = parseInt(t2ui.childNodes[0].getAttribute("y"));
                        var t2textX = parseInt(t2ui.childNodes[1].getAttribute("x"));
                        var t2textY = parseInt(t2ui.childNodes[1].getAttribute("y"));
                        var t2mouseover = t2ui.mouseover;
                        var t2mouseleave = t2ui.mouseleave;
                        var t2click = t2ui.click;
                        t1ui.setAttribute("id", t2uiID);
                        t1ui.childNodes[0].setAttribute("id", t2rectID);
                        t1ui.childNodes[0].setAttribute("x", t2rectX.toString());
                        t1ui.childNodes[0].setAttribute("y", t2rectY.toString());
                        t1ui.childNodes[1].setAttribute("x", t2textX.toString());
                        t1ui.childNodes[1].setAttribute("y", t2textY.toString());
                        t1ui.mouseover = t2mouseover;
                        t1ui.mouseleave = t2mouseleave;
                        t1ui.click = t2click;
                        t2ui.setAttribute("id", t1uiID);
                        t2ui.childNodes[0].setAttribute("id", t1rectID);
                        t2ui.childNodes[0].setAttribute("x", t1rectX.toString());
                        t2ui.childNodes[0].setAttribute("y", t1rectY.toString());
                        t2ui.childNodes[1].setAttribute("x", t1textX.toString());
                        t2ui.childNodes[1].setAttribute("y", t1textY.toString());
                        t2ui.mouseover = t1mouseover;
                        t2ui.mouseleave = t1mouseleave;
                        t2ui.click = t1click;
                    }
                    // Update new Index of Blank Tile
                    // if (this.tiles[i].value == -1 || this.tiles[j].value == -1) {
                    //     if (this.tiles[j].value == -1) {
                    //         this.indexBlankTile = j;
                    //     } else {
                    //         this.indexBlankTile = i;
                    //     }
                    // }
                };
                Puzzle.prototype.getTiles = function () {
                    console.log(this);
                    return this.tiles;
                };
                Puzzle.prototype.moveUp = function () {
                    if (this.tiles[this.indexBlankTile].canGoUp()) {
                        this.swapTile(this.indexBlankTile - this.size, this.indexBlankTile);
                    }
                };
                Puzzle.prototype.moveDown = function () {
                    if (this.tiles[this.indexBlankTile].canGoDown(this.size - 1)) {
                        this.swapTile((this.indexBlankTile + this.size), this.indexBlankTile);
                    }
                };
                Puzzle.prototype.moveLeft = function () {
                    if (this.tiles[this.indexBlankTile].canGoLeft()) {
                        this.swapTile(this.indexBlankTile - 1, this.indexBlankTile);
                    }
                };
                Puzzle.prototype.moveRight = function () {
                    if (this.tiles[this.indexBlankTile].canGoRight(this.size - 1)) {
                        this.swapTile((this.indexBlankTile + 1), this.indexBlankTile);
                    }
                };
                Puzzle.prototype.getRenderablePuzzleSVG = function () {
                    var svgSize = ((this.tileSize + 10) * (this.size));
                    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute('viewBox', "0 " + "0 " + svgSize + " " + svgSize);
                    svg.setAttribute('width', "100%");
                    svg.setAttribute('height', "100%");
                    svg.setAttribute('preserveAspectRatio', "xMidYMid meet");
                    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                    return svg;
                };
                Puzzle.prototype.getUp = function (prev) {
                    var puzzle = null;
                    if (this.tiles[this.indexBlankTile].canGoUp()) {
                        puzzle = new Puzzle(this.size, this);
                        puzzle.swapTileBackend(puzzle.indexBlankTile - puzzle.size, puzzle.indexBlankTile);
                    }
                    return puzzle;
                };
                Puzzle.prototype.getDown = function (prev) {
                    var puzzle = null;
                    if (this.tiles[this.indexBlankTile].canGoDown(this.size - 1)) {
                        puzzle = new Puzzle(this.size, this);
                        puzzle.swapTileBackend((puzzle.indexBlankTile + puzzle.size), puzzle.indexBlankTile);
                    }
                    return puzzle;
                };
                Puzzle.prototype.getLeft = function (prev) {
                    var puzzle = null;
                    if (this.tiles[this.indexBlankTile].canGoLeft()) {
                        puzzle = new Puzzle(this.size, this);
                        puzzle.swapTileBackend(puzzle.indexBlankTile - 1, puzzle.indexBlankTile);
                    }
                    return puzzle;
                };
                Puzzle.prototype.getRight = function (prev) {
                    var puzzle = null;
                    if (this.tiles[this.indexBlankTile].canGoRight(this.size - 1)) {
                        puzzle = new Puzzle(this.size, this);
                        puzzle.swapTileBackend((puzzle.indexBlankTile + 1), puzzle.indexBlankTile);
                    }
                    return puzzle;
                };
                Puzzle.prototype.calculateNoOfDifferentTiles = function () {
                    var diffTileCount = 0;
                    for (var i = 0; i < this.tiles.length; i++) {
                        if (i != this.tiles[i].value)
                            diffTileCount++;
                    }
                    return diffTileCount;
                };
                return Puzzle;
            }());
            exports_1("Puzzle", Puzzle);
        }
    };
});
//# sourceMappingURL=Puzzle.js.map
System.register(["./Puzzle", "./Tile"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Puzzle_1, Tile_1, Main;
    return {
        setters: [
            function (Puzzle_1_1) {
                Puzzle_1 = Puzzle_1_1;
            },
            function (Tile_1_1) {
                Tile_1 = Tile_1_1;
            }
        ],
        execute: function () {
            Main = (function () {
                function Main(puzzleSize) {
                    this.puzzle = new Puzzle_1.Puzzle(puzzleSize, null);
                }
                Main.prototype.highlightTile = function (tile) {
                    Tile_1.Tile.highlightTile(tile);
                };
                Main.prototype.normalizeTile = function (tile) {
                    Tile_1.Tile.normalizeTile(tile);
                };
                Main.prototype.normalizeBlankTile = function (tile) {
                    Tile_1.Tile.normalizeBlankTile(tile);
                };
                Main.prototype.isMovableToBlank = function (tileIndex) {
                    return Tile_1.Tile.isMovableToBlank(this, tileIndex);
                };
                Main.prototype.a_star_algorithm = function () {
                    var frontierList = [];
                    var startState = this.createNode(null);
                    frontierList.push(startState);
                    while (frontierList.length) {
                        var frontierState = this.popWithLeastCost(frontierList);
                        if (this.isGoalState(frontierState)) {
                            // form path to play the result
                        }
                        var neighbourFrontierList = this.getNextFrontiers(frontierState);
                        if (neighbourFrontierList.length > 0)
                            Array.prototype.push.apply(frontierList, neighbourFrontierList);
                    }
                };
                Main.prototype.getNextFrontiers = function (state) {
                    var nextFrontiers = [];
                    var up = state.puzzleState.getUp(state.prevPuzzleNode);
                    if (up) {
                        nextFrontiers.push(up);
                    }
                    var down = state.puzzleState.getDown(state.prevPuzzleNode);
                    if (down) {
                        nextFrontiers.push(down);
                    }
                    var left = state.puzzleState.getLeft(state.prevPuzzleNode);
                    if (left) {
                        nextFrontiers.push(left);
                    }
                    var right = state.puzzleState.getRight(state.prevPuzzleNode);
                    if (right) {
                        nextFrontiers.push(right);
                    }
                    console.log(JSON.stringify(nextFrontiers));
                    return nextFrontiers;
                };
                Main.prototype.popWithLeastCost = function (frontierList) {
                    var min = 9999;
                    var leastFrontierIndex = -1;
                    var leastFrontier = null;
                    for (var i = 0; i < frontierList.length; i++) {
                        var frontier = frontierList[i];
                        if ((frontier.f + frontier.g) < min) {
                            min = frontier.f + frontier.g;
                            leastFrontierIndex = i;
                        }
                    }
                    if (leastFrontierIndex != -1) {
                        leastFrontier = frontierList[leastFrontierIndex];
                        frontierList.splice(leastFrontierIndex, 1);
                    }
                    return leastFrontier;
                };
                Main.prototype.formFinalPath = function () {
                };
                Main.prototype.createNode = function (prevPuzzle) {
                    var node = {
                        puzzleState: this.puzzle,
                        f: 0,
                        g: this.puzzle.calculateNoOfDifferentTiles(),
                        prevPuzzleNode: prevPuzzle
                    };
                    return node;
                };
                Main.prototype.isGoalState = function (state) {
                    for (var i = 0; i < state.puzzleState.tiles.length; i++) {
                        if (i != state.puzzleState.tiles[i].value)
                            return false;
                    }
                    return true;
                };
                return Main;
            }());
            exports_1("Main", Main);
        }
    };
});
//# sourceMappingURL=main.js.map
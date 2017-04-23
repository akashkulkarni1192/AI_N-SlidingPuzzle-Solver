import {Main} from "./main";
import {AppConstants} from "./AppConstants";
import {Tile} from "./Tile";
import {Puzzle} from "./Puzzle";

function renderPuzzle(main) {
    var svg = main.puzzle.getRenderablePuzzleSVG();
    for (var i = 0; i < main.puzzle.tiles.length; i++) {
        (function (i) {
            var g = main.puzzle.tiles[i].getRenderableTileElement(i);
            var rect = main.puzzle.tiles[i].rect.getRenderableRectangleElement(i);
            g.appendChild(rect);
            var text = main.puzzle.tiles[i].text.getRenderableTextElement();

            if (main.puzzle.tiles[i].text.value != -1) {
                text.innerHTML = main.puzzle.tiles[i].text.value;
                g.onmouseover = function () {
                    main.highlightTile(g);
                };
                g.onmouseleave = function () {
                    main.normalizeTile(g);
                };
                g.onclick = function () {
                    var tileID = g.getAttribute("id");
                    var tileIndex = parseInt(tileID.substr(tileID.lastIndexOf("_") + 1)) - 1;
                    if (main.isMovableToBlank(tileIndex)) {
                        main.puzzle.swapTile(tileIndex, main.puzzle.indexBlankTile);
                        main.puzzle.indexBlankTile = tileIndex;
                    }
                }
            } else {
                g.onmouseover = function () {
                    main.normalizeBlankTile(g);
                };
                g.onmouseleave = function () {
                    main.normalizeBlankTile(g);
                };
                g.onclick = function () {
                    return false;
                }
            }
            g.appendChild(text);
            svg.appendChild(g);
        })(i);
    }

    document.getElementById("puzzleWrapper").appendChild(svg);

    var puzzleControls = document.createElement("div");
    puzzleControls.innerHTML = '<div class="btn-group" role="group" aria-label="Large button group"> <button type="button" class="btn btn-primary" id="moveUp">UP</button> <button type="button" class="btn btn-primary" id="moveDown">DOWN</button> <button type="button" class="btn btn-primary" id="moveLeft">LEFT</button> <button type="button" class="btn btn-primary" id="moveRight">RIGHT</button> </div> <div class="clearfix"></div> <br/>';
    puzzleControls.innerHTML += ' <div class="btn-group" role="group" aria-label="Large button group"> <button type="button" class="btn btn-info" id="makeRandom">Make Random</button> <button type="button" class="btn btn-success" id="playResult">Play Result</button> <button type="button" class="btn btn-danger" data-toggle="collapse" aria-expanded="false" data-target="#hintWrapper">Show/Hide Hint</button> </div>';
    document.getElementById("puzzleControls").appendChild(puzzleControls);
    document.getElementById("moveUp").onclick = function () {
        main.puzzle.moveUp();
    };
    document.getElementById("moveDown").onclick = function () {
        main.puzzle.moveDown();
    };
    document.getElementById("moveLeft").onclick = function () {
        main.puzzle.moveLeft();
    };
    document.getElementById("moveRight").onclick = function () {
        main.puzzle.moveRight();
    };
    document.getElementById("makeRandom").onclick = function () {
        main.puzzle.makeRandom();
        while(!isSolvable(main.puzzle)){
            main.puzzle.makeRandom();
        }
        
    };
    document.getElementById("playResult").onclick = function () {
        console.time('A_Start_Time');
        main.a_star_algorithm();
        console.timeEnd('A_Start_Time');
    };

    var hintText = document.getElementById("hintText");
    hintText.innerHTML = "Move UP (2,3)";

    var form = document.getElementById("puzzleForm");
    /*Your Form Element*/
    ;
    if (form.addEventListener) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            bootstrapPuzzle();
        }, false);  //Modern browsers
    } else { //noinspection TypeScriptUnresolvedVariable
        if (form.attachEvent) {
            form.attachEvent('onsubmit', function (e) {
                e.preventDefault();
                bootstrapPuzzle();
            });            //Old IE
        }
    }
}


function clearPuzzle() {
    document.getElementById("puzzleWrapper").innerHTML = "";
    document.getElementById("puzzleControls").innerHTML = "";
    document.getElementById("hintText").innerHTML = "";
}

function bootstrapPuzzle() {

    clearPuzzle();

    var puzzleSize = AppConstants.defaultPuzzleSize;
    var puzzleSizeElement = document.getElementById("puzzleSize");

    if (puzzleSizeElement) {
        puzzleSizeElement.setAttribute("min", AppConstants.minPuzzleSize.toString());
        puzzleSizeElement.setAttribute("max", AppConstants.maxPuzzleSize.toString());
        if ((<HTMLInputElement>puzzleSizeElement).value == "") {
            (<HTMLInputElement>puzzleSizeElement).value = <string><any>puzzleSize;
        }
        else {
            puzzleSize = parseInt((<HTMLInputElement>puzzleSizeElement).value);
        }
    }

    if (puzzleSize >= AppConstants.minPuzzleSize && puzzleSize <= AppConstants.maxPuzzleSize) {
        var main = new Main(puzzleSize);
        renderPuzzle(main);
    }

}

function isSolvable(puzzle){
      var inversionCount = 0;
      var isSolvable = false;
      for (var i = 0; i < puzzle.tiles.length ; i++){
        if(puzzle.tiles[i].value == -1)
          continue;
        for (var j = i + 1; j < puzzle.tiles.length ; j++){
          if(puzzle.tiles[j].value == -1)
            continue;
          if(puzzle.tiles[i].value > puzzle.tiles[j].value){
            inversionCount++;
          }
        }
      }
      if(puzzle.size % 2 == 1){
        if(inversionCount % 2 == 0){
          isSolvable = true;
        }
      }
      if(isSolvable){
          console.log('Solvable');
      }
      else{
          console.log('Not solvable');
      }
      return isSolvable;
    }

bootstrapPuzzle();


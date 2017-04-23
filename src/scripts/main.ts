import {Puzzle} from "./Puzzle";
import {Tile} from "./Tile";

export class Main {
    puzzle:Puzzle;

    constructor(puzzleSize:number) {
        this.puzzle = new Puzzle(puzzleSize, null);
    }

    public highlightTile(tile) {
        Tile.highlightTile(tile);
    }

    public normalizeTile(tile) {
        Tile.normalizeTile(tile);
    }

    public normalizeBlankTile(tile) {
        Tile.normalizeBlankTile(tile);
    }

    public isMovableToBlank(tileIndex) {
        return Tile.isMovableToBlank(this, tileIndex);
    }

    public a_star_algorithm(){
        var frontierList = [];
        var startState = this.createNode(this.puzzle, null);

        frontierList.push(startState);
        var startBlankTile = startState.puzzleState.indexBlankTile;
        while(frontierList.length){
            var frontierState = this.popWithLeastCost(frontierList);
            //console.log('Iter ' + p + ' frontier f = '+frontierState.f + ' g = '+frontierState.g + ' blank = '+frontierState.puzzleState.indexBlankTile);
            if(this.isGoalState(frontierState)){
               // form path to play the result
               console.log('Goal reached blank' + JSON.stringify(frontierState.puzzleState));
               for (var i=0; i< frontierState.puzzleState.tiles.length; i++)
                   console.log(' '+ frontierState.puzzleState.tiles[i].value);

               var finalPath = this.formFinalPath(frontierState);


               console.log('Total Steps : '+finalPath.length);
               for (var x= 0; x < finalPath.length; x++)
                   console.log(finalPath[x]);
               this.playTheResult(finalPath, startBlankTile, frontierState.puzzleState);
               break;
            }
            var neighbourFrontierList = this.getNextFrontiers(frontierState);
            if( neighbourFrontierList.length > 0)
                Array.prototype.push.apply(frontierList, neighbourFrontierList);
        }
    }

    public playTheResult(finalPath, startBlankTile, puzzle){
       var blankTile = startBlankTile;
       console.log('Playing The Result ');
       for (var i = finalPath.length - 1; i >=0 ; i--){
         console.log('Blank Tile moved from '+blankTile + ' to '+finalPath[i]);
         //puzzle.swapTile(blankTile, finalPath[i]);
         blankTile = finalPath[i];  
       }
    }
    public getNextFrontiers(state){
       var nextFrontiers = [];
       var up = state.puzzleState.getUp(state.prevPuzzleNode);
       if(up) {

          nextFrontiers.push(this.createNode(up,state));
       }
       var down = state.puzzleState.getDown(state.prevPuzzleNode);
       if(down) {
            nextFrontiers.push(this.createNode(down,state));   
       }
       var left = state.puzzleState.getLeft(state.prevPuzzleNode);
       if(left) {
           nextFrontiers.push(this.createNode(left,state));
       }
       var right = state.puzzleState.getRight(state.prevPuzzleNode);
       if(right) {
           nextFrontiers.push(this.createNode(right,state));
       }
       return nextFrontiers;
    }

    popWithLeastCost(frontierList){
        var min = 9999;
        var leastFrontierIndex = -1;
        var leastFrontier = null;
        for(var i=0 ; i < frontierList.length ; i++){
             var frontier = frontierList[i];
            if((frontier.f + frontier.g) < min){
                min = frontier.f + frontier.g;
                leastFrontierIndex = i;
            }
        }
        if(leastFrontierIndex != -1){
            leastFrontier = frontierList[leastFrontierIndex];
            frontierList.splice(leastFrontierIndex, 1);
        }
        return leastFrontier;
    }

    createNode(curPuzzle, prevPuzzle){
        var backwardCost = 0;
        var forwardCost = this.calculateManhattanDistance(curPuzzle);
        if(prevPuzzle != null && prevPuzzle.f != undefined)
            backwardCost = prevPuzzle.f + 1;
        var node = {
            puzzleState : curPuzzle,
            f : backwardCost,
            g : forwardCost,
            prevPuzzleNode : prevPuzzle
        }
        return node;
    }



    isGoalState(state){
        for (var i = 0; i < state.puzzleState.tiles.length ; i++){
            if(state.puzzleState.tiles[i].value != -1 && i != state.puzzleState.tiles[i].value-1)
                return false;
        }
        return true;    
    }

    public calculateNoOfDifferentTiles(puzzle) {
        var diffTileCount = 0;
        for (var i = 0; i < puzzle.tiles.length ; i++){
            if(i != puzzle.tiles[i].value-1 && puzzle.tiles[i].value != -1)
                diffTileCount++;
        }
        return diffTileCount;
    }

    formFinalPath(goalState){
        var iterState = goalState;
        var path = [];
        while(iterState.prevPuzzleNode != null){
            path.push(iterState.puzzleState.indexBlankTile);
            iterState = iterState.prevPuzzleNode;
        }
        return path;
    }

    calculateManhattanDistance(puzzle){
      var manDistance = 0;
      var rowDistance = 0;
      var colDistance = 0;
      var tileValue = 0;
        for (var i = 0; i < puzzle.tiles.length ; i++){
          tileValue = puzzle.tiles[i].value;
          if(tileValue != -1){
            rowDistance = Math.abs( ((tileValue-1)%3) - ((i)%3) );
            colDistance = Math.abs( Math.floor((tileValue-1)/3) - Math.floor((i)/3) );
            manDistance+=(rowDistance+colDistance);
          }
                
        }
        return manDistance;
    }
}
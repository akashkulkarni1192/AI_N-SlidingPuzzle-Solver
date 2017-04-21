export class AppConstants {

    static get minPuzzleSize():number {
        return this._minPuzzleSize;
    }

    static get maxPuzzleSize():number {
        return this._maxPuzzleSize;
    }

    static get defaultPuzzleSize():number {
        return this._defaultPuzzleSize;
    }

    static get tileRadius():number {
        return this._tileRadius;
    }

    static get tileSpacing():number {
        return this._tileSpacing;
    }

    static get tileSize():number {
        return this._tileSize;
    }

    static get tileStyleNormal():string {
        return this._tileStyleNormal;
    }

    static get tileStyleHighlight():string {
        return this._tileStyleHighlight;
    }

    static get tileStyleBlank():string {
        return this._tileStyleBlank;
    }

    private static _minPuzzleSize: number = 1;
    private static _maxPuzzleSize: number = 10;
    private static _defaultPuzzleSize: number = 3;
    private static _tileRadius: number = 5;
    private static _tileSpacing: number = 3;
    private static _tileSize: number = 100;
    private static _tileStyleNormal: string = "fill:#337ab7;stroke:#e2e2e2;stroke-width:1;cursor: pointer;";
    private static _tileStyleHighlight: string = "fill:#004c8e;stroke:#e2e2e2;stroke-width:1;cursor:pointer";
    private static _tileStyleBlank: string = "fill: #efefef;stroke: #c7c7c7;stroke-width: 1;";

}
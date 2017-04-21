System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppConstants;
    return {
        setters: [],
        execute: function () {
            AppConstants = (function () {
                function AppConstants() {
                }
                Object.defineProperty(AppConstants, "minPuzzleSize", {
                    get: function () {
                        return this._minPuzzleSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "maxPuzzleSize", {
                    get: function () {
                        return this._maxPuzzleSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "defaultPuzzleSize", {
                    get: function () {
                        return this._defaultPuzzleSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "tileRadius", {
                    get: function () {
                        return this._tileRadius;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "tileSpacing", {
                    get: function () {
                        return this._tileSpacing;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "tileSize", {
                    get: function () {
                        return this._tileSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "tileStyleNormal", {
                    get: function () {
                        return this._tileStyleNormal;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "tileStyleHighlight", {
                    get: function () {
                        return this._tileStyleHighlight;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppConstants, "tileStyleBlank", {
                    get: function () {
                        return this._tileStyleBlank;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AppConstants;
            }());
            AppConstants._minPuzzleSize = 1;
            AppConstants._maxPuzzleSize = 10;
            AppConstants._defaultPuzzleSize = 3;
            AppConstants._tileRadius = 5;
            AppConstants._tileSpacing = 3;
            AppConstants._tileSize = 100;
            AppConstants._tileStyleNormal = "fill:#337ab7;stroke:#e2e2e2;stroke-width:1;cursor: pointer;";
            AppConstants._tileStyleHighlight = "fill:#004c8e;stroke:#e2e2e2;stroke-width:1;cursor:pointer";
            AppConstants._tileStyleBlank = "fill: #efefef;stroke: #c7c7c7;stroke-width: 1;";
            exports_1("AppConstants", AppConstants);
        }
    };
});
//# sourceMappingURL=AppConstants.js.map
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Text;
    return {
        setters: [],
        execute: function () {
            Text = (function () {
                function Text(x, y, value) {
                    this.x = x;
                    this.y = y;
                    this.value = value;
                }
                Text.prototype.getRenderableTextElement = function () {
                    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    text.setAttribute('x', this.x.toString());
                    text.setAttribute('y', this.y.toString());
                    text.setAttribute('fill', "white");
                    text.setAttribute('font-size', "250%");
                    text.setAttribute("text-anchor", "middle");
                    text.setAttribute("alignment-baseline", "middle");
                    text.setAttribute("style", "cursor:pointer");
                    return text;
                };
                return Text;
            }());
            exports_1("Text", Text);
        }
    };
});
//# sourceMappingURL=Text.js.map
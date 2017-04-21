export class Text {
    x:number;
    y:number;
    value:number;

    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    public getRenderableTextElement() {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', this.x.toString());
        text.setAttribute('y', this.y.toString());
        text.setAttribute('fill', "white");
        text.setAttribute('font-size', "250%");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("alignment-baseline", "middle");
        text.setAttribute("style", "cursor:pointer");
        return text;
    }
}
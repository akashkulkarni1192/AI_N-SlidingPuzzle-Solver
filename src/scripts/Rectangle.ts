export class Rectangle {
    x:number;
    y:number;
    r:number;
    sideLength:number;
    style:string;

    constructor(x, y, sideLength, style, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.sideLength = sideLength;
        this.style = style;
    }

    public getRenderableRectangleElement(index) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute('id', 'tile_' + (index + 1) + '_rect');
        rect.setAttribute('x', this.x.toString());
        rect.setAttribute('y', this.y.toString());
        rect.setAttribute('rx', this.r.toString());
        rect.setAttribute('ry', this.r.toString());
        rect.setAttribute('width', this.sideLength.toString());
        rect.setAttribute('height', this.sideLength.toString())
        rect.setAttribute('style', this.style);
        return rect;
    }
}
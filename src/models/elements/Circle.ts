
import BaseElement from './BaseElement';
import SvgItem from './SvgItem';
import SvgPoint from './SvgPoint';
export default class Circle extends BaseElement {
    r: number = 0;


    calculateRadius = (point1: SvgPoint, point2: SvgPoint) => {
        const radiusX: number = point2.x - point1.x;
        const radiusY: number = point2.y - point1.y;
        const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
        this.r = radius;
    }

    html = () => {
        const c = this;
        return `<circle stroke-width="`+this.strokeWidth+`" stroke="` + this.strokeColor + `"  cx="` + c.x + `" cy="` + c.y + `" r="` + c.r + `"  />`;
    }

    public static newInstance = (ref:SvgItem, middlePoint:SvgPoint, radiusPoint:SvgPoint) => {
        const c = new Circle();
        c.init(ref);
        c.x = middlePoint.x;
        c.y = middlePoint.y;

        c.calculateRadius(middlePoint, radiusPoint);
        return c;
    }
}
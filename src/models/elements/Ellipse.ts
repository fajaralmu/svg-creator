
import BaseElement from './BaseElement';
import SvgItem from './SvgItem';
import SvgPoint from './SvgPoint';
export default class Ellipse extends BaseElement {
    rx: number = 0;
    ry: number = 0;


    calculateRadius = (middlePoint: SvgPoint, point2: SvgPoint) : number=> {
        const radiusX: number = point2.x - middlePoint.x;
        const radiusY: number = point2.y - middlePoint.y;
        const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
        return radius;
    }

    html = () => {
        const c = this;
        return `<ellipse  stroke-width="`+this.strokeWidth+`" stroke="` + this.strokeColor + `"  cx="` + c.x + `" cy="` + c.y + `" rx="` + c.rx + `"  ry="` + c.ry + `"  />`;
    }

    public static newInstance = (ref:SvgItem, middle:SvgPoint, radiusXPoint:SvgPoint, radiusYPoint: SvgPoint) => {
        const c = new Ellipse();
        c.init(ref);
        c.x = middle.x;
        c.y = middle.y;

        c.rx = c.calculateRadius(middle, radiusXPoint);
        c.ry = c.calculateRadius(middle, radiusYPoint);
        return c;
    }
}
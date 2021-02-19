

import { ElementType } from '../ElementType';
import SvgPoint from './SvgPoint';
import Rect from './Rect';
import Circle from './Circle';
export default
    class SvgItem {
    points: SvgPoint[] = [];
    closePath: boolean = false;
    strokeColor: string = "#20f08d";
    type: ElementType = ElementType.PATH;

    addPoint = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement, straightLine: boolean) => {
        let point: SvgPoint;
        if ((this.type == ElementType.RECT || this.type == ElementType.CIRCLE) && this.points.length >= 1) {
            this.points[1] = SvgPoint.newInstance(e, target);
            return;
        }

        if (straightLine && this.points.length > 0) {
            const prevPoint = this.points[this.points.length - 1];
            point = SvgPoint.newStraightLineInstance(e, target, prevPoint);
        } else {
            point = SvgPoint.newInstance(e, target);
        }
        this.points.push(point);
    }

    getCircleElement = (): Circle => {
        if (this.type != ElementType.CIRCLE || this.points.length < 2) {
            return new Circle();
        }
        this.adjustXY();
        let point1 = this.points[0];
        let point2 = this.points[1];

        const c = new Circle();
        c.x = point1.x;
        c.y = point1.y;

        c.r = calculateRadius(point1, point2);
        return c;
    }

    getRectElement = (): Rect => {
        if (this.type != ElementType.RECT || this.points.length < 2) {
            return new Rect();
        }
        this.adjustXY();
        let point1 = this.points[0];
        let point2 = this.points[1];

        const r = new Rect();
        r.x = point1.x;
        r.y = point1.y;
        r.width = point2.x - point1.x;
        r.height = point2.y - point1.y;

        return r;
    }
    adjustXY = () => {
        let point1 = this.points[0];
        let point2 = this.points[1];
        //swap if negative
        if (point2.x < point1.x) {
            const xTemp = point2.x;
            point2.x = point1.x;
            point1.x = xTemp;
        }
        //swap if negative
        if (point2.y < point1.y) {
            const yTemp = point2.y;
            point2.y = point1.y;
            point1.y = yTemp;
        }
    }
    getPath = () => {
        if (this.points.length < 2) { return "" }

        let firstPoint = this.points[0];
        let path = "M " + firstPoint.x + " " + firstPoint.y;
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            path += " L " + point.x + " " + point.y + " ";
        }
        return path + (this.closePath ? "Z" : "");
    }
    html = () => {
        if (this.type == ElementType.RECT) {
            const r = this.getRectElement();
            return `<rect stroke="` + this.strokeColor + `"  x="` + r.x + `" y="` + r.y + `" height="` + r.width + `" width="` + r.height + `"  />`;

        }
        if (this.type == ElementType.CIRCLE) {
            const c = this.getCircleElement();
            return `<circle stroke="` + this.strokeColor + `"  cx="` + c.x + `" cy="` + c.y + `" r="` + c.r + `"  />`;

        }
        return `<path stroke="` + this.strokeColor + `" d="` + this.getPath() + `" />`;
    }
    public static newInstance = (type: ElementType) => {
        const res = new SvgItem();
        res.type = type;
        return res;
    }

    public static getOutput = (items: SvgItem[], size: number): string => {
        let svg = `<svg width="` + size + `" height="` + size + `"><g stroke="black" fill="transparent" stroke-width="2">
        {SVG}</g></svg>`;
        let paths = "";
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            paths += element.html();
        }
        return svg.replace("{SVG}", paths);
    }
}

const calculateRadius = (point1: SvgPoint, point2: SvgPoint) => {
    const radiusX: number = point2.x - point1.x;
    const radiusY: number = point2.y - point1.y;
    const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
    return radius;
}
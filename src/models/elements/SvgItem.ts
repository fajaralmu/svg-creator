import SvgPoint from './SvgPoint';
import Rect from './Rect';
import Circle from './Circle';
import QuadraticCurve from './QuadraticCurve';
import { uniqueId } from './../../utils/StringUtil';
import { ElementType } from '../../constant/ElementType';
import Ellipse from './Ellipse';
import BaseElement from './BaseElement';
import Path from './Path';
export default
    class SvgItem {
    points: SvgPoint[] = [];
    closePath: boolean = false;
    strokeColor: string = "#20f08d";
    strokeWidth: number = 2;
    type: ElementType = ElementType.PATH;
    id: string = uniqueId();

    public setClosePath = (val: boolean): SvgItem => {
        this.closePath = val;
        return this;
    }
    public setStrokeColor = (strokeColor: string): SvgItem => {
        this.strokeColor = strokeColor;
        return this;
    }

    public getPointByIndex = (index: number): SvgPoint | undefined => {
        try {
            return this.points[index];
        } catch (e) { return undefined; }
    }

    public addPoint = (p: SvgPoint) => {
        if ((this.type == ElementType.RECT || this.type == ElementType.CIRCLE) && this.points.length >= 1) {
            this.points[1] = p;
            return;
        }
        if ((this.type == ElementType.CURVE || this.type == ElementType.ELLIPSE) && this.points.length >= 2) {
            this.points[2] = p;
            return;
        }

        this.points.push(p);
    }
    public addPointByEvent = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement, straightLine: boolean) => {
        let point: SvgPoint;
        if ((this.type == ElementType.RECT || this.type == ElementType.CIRCLE) && this.points.length >= 1) {
            this.points[1] = SvgPoint.newInstance(e, target);
            return;
        }
        if ((this.type == ElementType.CURVE || this.type == ElementType.ELLIPSE) && this.points.length >= 2) {
            this.points[2] = SvgPoint.newInstance(e, target);
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

    public getCircleElement = (): Circle => {
        if (this.type != ElementType.CIRCLE || this.points.length < 2) {
            return new Circle();
        }
        this.adjustPoints1And2();
        let point1 = this.points[0];
        let point2 = this.points[1];
        return Circle.newInstance(this, point1, point2);
    }

    public getQuadCurveElement = (): QuadraticCurve => {
        if (this.type != ElementType.CURVE || this.points.length < 3) {
            return new QuadraticCurve();
        }
        let point1 = this.points[0];
        let point2 = this.points[1];
        let point3 = this.points[2];
        return QuadraticCurve.newInstance(this, point1, point2, point3);

    }
    public getEllipseElement = (): Ellipse => {
        if (this.type != ElementType.ELLIPSE || this.points.length < 3) {
            return new Ellipse();
        }
        let point1 = this.points[0];
        let point2 = this.points[1];
        let point3 = this.points[2];
        return Ellipse.newInstance(this, point1, point2, point3);

    }

    public getRectElement = (): Rect => {
        if (this.type != ElementType.RECT || this.points.length < 2) {
            return new Rect();
        }
        this.adjustPoints1And2();
        let point1 = this.points[0];
        let point2 = this.points[1];
        return Rect.newInstance(this, point1, point2);
    }
    adjustPoints1And2 = () => {
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
    getPathElement = () => {
        const path = Path.newInstance(this);
        return path;
    }
    getElement = (): BaseElement => {
        if (this.type == ElementType.RECT) {
            return this.getRectElement();
        }
        if (this.type == ElementType.CIRCLE) {
            return this.getCircleElement();

        }
        if (this.type == ElementType.CURVE) {
            return this.getQuadCurveElement();

        }
        if (this.type == ElementType.ELLIPSE) {
            return this.getEllipseElement();
        }

        return this.getPathElement();
    }
    html = () => {
        const el = this.getElement();
        return el.html();
    }
    getBoundingRect = ():Rect => {
        const xMax = this.getMaxAxis('x');
        const yMax = this.getMaxAxis('y');
        const xMin = this.getMinAxis('x', xMax);
        const yMin = this.getMinAxis('y', yMax);

        const r = new Rect();
        r.x = xMin;
        r.y = yMin;
        r.width = xMax - xMin;
        r.height = yMax - yMin;
        r.strokeColor = '#ccc';
        r.strokeWidth = 1;
        return r;
    }
    getMaxAxis = (axis: string): number => {
        let value = 0;
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            if (p[axis] > value) { value = p[axis] }
        }
        return value;
    }
    getMinAxis = (axis: string, max: number): number => {
        let value = max;
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            if (p[axis] < value) { value = p[axis] }
        }
        return value;
    }
    public static newInstance = (type: ElementType) => {
        const res = new SvgItem();
        res.type = type;
        return res;
    }

    public static getOutput = (items: SvgItem[], size: number): string => {
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="` + size + `" height="` + size + `"><g stroke="black" fill="transparent" stroke-width="2">
        {SVG}</g></svg>`;
        let paths = "";
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            paths += element.html();
        }
        const output = svg.replace("{SVG}", paths);

        return output;
    }
}

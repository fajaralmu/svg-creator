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
    fillColor: string = "none";
    strokeColor: string = "#20f08d";
    strokeWidth: number = 2;
    type: ElementType = ElementType.PATH;
    id: string = uniqueId();

    insertAfter = (index: number): boolean => {
        console.debug("Insert After: ", index);
        if (this.pointCount() <= index) return false;
        const ref = this.getPointByIndex(index);
        if (!ref) return false;
        if (this.pointCount() == index - 1) {
            this.addPoint(SvgPoint.newInstanceFromReference(ref));
            return true;
        }
        this.points.splice(index + 1, 0, SvgPoint.newInstanceFromReference(ref));
        return true;
    }
    insertBefore = (index: number): boolean => {
        console.debug("insertBefore: ", index);
        if (0 == this.pointCount()) return false;
        const ref = this.getPointByIndex(index);
        if (!ref) return false;
        this.points.splice(index, 0, SvgPoint.newInstanceFromReference(ref));
        return true;
    }

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
        if ((this.type == ElementType.RECT || this.type == ElementType.CIRCLE) && this.pointCount() >= 1) {
            this.points[1] = p;
            return;
        }
        if ((this.type == ElementType.ELLIPSE) && this.pointCount() >= 2) {
            this.points[2] = p;
            return;
        }

        this.points.push(p);
    }

    pointCount = () => {
        return this.points.length;
    }

    public addPointByEvent = (e: React.MouseEvent<SVGRectElement>, straightLine: boolean) => {
        let point: SvgPoint;

        if ((this.type == ElementType.RECT || this.type == ElementType.CIRCLE) && this.pointCount() >= 1) {
            this.points[1] = SvgPoint.newInstanceFromEvent(e);
            return;
        }
        if ((this.type == ElementType.ELLIPSE) && this.pointCount() >= 2) {
            this.points[2] = SvgPoint.newInstanceFromEvent(e);
            return;
        }


        if (straightLine && this.pointCount() > 0) {
            const prevPoint = this.points[this.pointCount() - 1];
            point = SvgPoint.newStraightLineInstance(e, prevPoint);
        } else {
            point = SvgPoint.newInstanceFromEvent(e);
        }
        this.points.push(point);
    }

    public getCircleElement = (): Circle => {
        if (this.type != ElementType.CIRCLE || this.pointCount() < 2) {
            return new Circle();
        }
        this.adjustPoints1And2();
        let point1 = this.points[0];
        let point2 = this.points[1];
        return Circle.newInstance(this, point1, point2);
    }

    public getQuadCurveElement = (): QuadraticCurve => {
        if (this.type != ElementType.CURVE || this.pointCount() < 3) {
            return new QuadraticCurve();
        }
        return QuadraticCurve.newInstance(this, ...this.points);

    }
    public getEllipseElement = (): Ellipse => {
        if (this.type != ElementType.ELLIPSE || this.pointCount() < 3) {
            return new Ellipse();
        }
        let point1 = this.points[0];
        let point2 = this.points[1];
        let point3 = this.points[2];
        return Ellipse.newInstance(this, point1, point2, point3);

    }

    public getRectElement = (): Rect => {
        if (this.type != ElementType.RECT || this.pointCount() < 2) {
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
    getBoundingRect = (): Rect => {
        const xMax = this.getMaxAxis('x');
        const yMax = this.getMaxAxis('y');
        const xMin = this.getMinAxis('x', xMax);
        const yMin = this.getMinAxis('y', yMax);
        return Rect.getBoundingRect(xMin, xMax, yMin, yMax);
    }
    getMaxAxis = (axis: string): number => {
        let value = 0;
        for (let i = 0; i < this.pointCount(); i++) {
            const p = this.points[i];
            if (p[axis] > value) { value = p[axis] }
        }
        return value;
    }
    getMinAxis = (axis: string, max: number): number => {
        let value = max;
        for (let i = 0; i < this.pointCount(); i++) {
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

    public static getOutput = (items: SvgItem[], w: number, h: number): string => {
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 `+w+` `+h+`" width="` + w + `" height="` + h + `"><g stroke="black" fill="transparent" stroke-width="2">
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

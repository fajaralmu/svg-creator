

import { ElementType } from '../ElementType';
import SvgPoint from './SvgPoint';
import Rect from './Rect';
import Circle from './Circle';
import QuadraticCurve from './QuadraticCurve';
import { uniqueId } from './../../utils/StringUtil';
export default
    class SvgItem {
    points: SvgPoint[] = [];
    closePath: boolean = false;
    strokeColor: string = "#20f08d";
    type: ElementType = ElementType.PATH;
    id:string = uniqueId();

    public setClosePath = (val:boolean) :SvgItem => {
        this.closePath = val;
        return this;
    }
    public setStrokeColor = (strokeColor:string) :SvgItem => {
        this.strokeColor = strokeColor;
        return this;
    }

    getPoint = (index:number) : SvgPoint|undefined => {
        try {
            return this.points[index];
        } catch (e) {
            return undefined;
        }
    }

    addPoint = (p:SvgPoint) => {
        if ((this.type == ElementType.RECT || this.type == ElementType.CIRCLE) && this.points.length >= 1) {
            this.points[1] = p;
            return;
        }
        if ((this.type == ElementType.CURVE) && this.points.length >= 2) {
            this.points[2] = p;
            return;
        }
        this.points.push(p);
    }
    addPointByEvent = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement, straightLine: boolean) => {
        let point: SvgPoint;
        if ((this.type == ElementType.RECT || this.type == ElementType.CIRCLE) && this.points.length >= 1) {
            this.points[1] = SvgPoint.newInstance(e, target);
            return;
        }
        if ((this.type == ElementType.CURVE) && this.points.length >= 2) {
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

    getCircleElement = (): Circle => {
        if (this.type != ElementType.CIRCLE || this.points.length < 2) {
            return new Circle();
        }
        this.adjustPoints1And2();
        let point1 = this.points[0];
        let point2 = this.points[1];
        return Circle.newInstance(point1, point2);
    }

    getQuadCurveElement = (): QuadraticCurve => {
        if (this.type != ElementType.CURVE || this.points.length < 3) {
            return new QuadraticCurve();
        }
        let point1 = this.points[0];
        let point2 = this.points[1];
        let point3 = this.points[2]; 
        return QuadraticCurve.newInstance(point1, point2, point3);

    }

    getRectElement = (): Rect => {
        if (this.type != ElementType.RECT || this.points.length < 2) {
            return new Rect();
        }
        this.adjustPoints1And2();
        let point1 = this.points[0];
        let point2 = this.points[1];
        return Rect.newInstance(point1, point2);
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
            return r.html(this.strokeColor);
        }
        if (this.type == ElementType.CIRCLE) {
            const c = this.getCircleElement();
            return c.html(this.strokeColor);

        } if (this.type == ElementType.CURVE) {
            const c = this.getQuadCurveElement();
            return c.html(this.strokeColor);

        }
        return `<path stroke="` + this.strokeColor + `" d="` + this.getPath() + `" />`;
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

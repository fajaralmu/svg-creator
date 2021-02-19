
 
import { ElementType } from './ElementType';
import SvgPoint from './SvgPoint';
import Rect from './Rect';
export default 
class SvgItem {
    points: SvgPoint[] = [];
    closePath: boolean = false;
    strokeColor:string =  "#20f08d";
    type:ElementType  = ElementType.PATH;

    addPoint = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement, straightLine:boolean) => {
        let point:SvgPoint;
        if (this.type == ElementType.RECT && this.points.length >= 1) {
            this.points[1] = SvgPoint.newInstance(e, target);
            return;
        }

        if (straightLine && this.points.length > 0) {
            const prevPoint = this.points[this.points.length - 1];
            point = SvgPoint.newInstanceWithPrevPoint(e, target, prevPoint);
        } else {
            point = SvgPoint.newInstance(e, target);
        }
        this.points.push(point);
    }

    getRectElement = () :Rect => {
        if (this.type!= ElementType.RECT || this.points.length < 2) {
            return new Rect();
        }
        const r = new Rect();
        let point1 = this.points[0];
        let point2 = this.points[1];
        if (point2.x < point1.x) {
            const xTemp = point2.x;
            point2.x = point1.x;
            point1.x = xTemp;
        }
        if (point2.y < point1.y) {
            const yTemp = point2.y;
            point2.y = point1.y;
            point1.y = yTemp;
        }
        r.x = point1.x;
        r.y = point1.y;
        r.width = point2.x - point1.x;
        r.height = point2.y - point1.y;

        return r;
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
    public static newInstance = (type:ElementType) => {
        const res = new SvgItem();
        res.type = type;
        return res;
    }

    public static getOutput = (items:SvgItem[], size:number):string => {
        let svg = `<svg width="`+size+`" height="`+size+`"><g stroke="black" fill="transparent" stroke-width="2">
        {SVG}</g></svg>`;
        let paths = "";
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            paths += `<path stroke="`+element.strokeColor+`" d="`+element.getPath()+`" />`;
        }
        return svg.replace("{SVG}", paths);
    }
}

import BaseElement from './BaseElement';
import SvgItem from './SvgItem';
import SvgPoint from './SvgPoint';
export default class Path extends BaseElement {
 
    points: SvgPoint[] = [];
    closePath: boolean = false;
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
        return `<path stroke-width="`+this.strokeWidth+`" stroke="` + this.strokeColor + `" d="` + this.getPath() + `" />`;
    }

    public static newInstance = (ref:SvgItem) => {
        const p = new Path();
        p.init(ref);
        p.closePath = ref.closePath;
        p.points = ref.points;
        return p;
    }
}
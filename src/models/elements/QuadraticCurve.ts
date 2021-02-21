
import BaseElement from './BaseElement';
import SvgItem from './SvgItem';
import SvgPoint from './SvgPoint';
export default class QuadraticCurve extends BaseElement {
    closePath: boolean = false;
    endPoints: SvgPoint[] = [];
    slopePoints: SvgPoint[] = [];
    getPath = (): string => {
        let fullPath = "M " + this.x + " " + this.y + " ";
        for (let i = 0; i < this.endPoints.length; i++) {
            try {
                const end = this.endPoints[i];
                const slope = this.slopePoints[i];
                const path = "Q " + slope.x + " " + slope.y + " " + end.x + " " + end.y;
                fullPath += path;
            } catch (e) { }
        }
        if (this.closePath) {
            fullPath += " Z ";
        }
        return fullPath;
    }
    html = () => {
        return `<path stroke-width="` + this.strokeWidth + `" stroke="` + this.strokeColor + `"  d="` + this.getPath() + `"/>`;
    }

    public static newInstance = (ref: SvgItem, ...points: SvgPoint[]): QuadraticCurve => {
        const c = new QuadraticCurve();
        c.init(ref);
        if (!points || points.length == 0) {
            return c;
        }
        const startPoint = points[0];
        c.x = startPoint.x;
        c.y = startPoint.y;
        c.closePath = ref.closePath;
        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            if (i % 2 == 0) {
                c.slopePoints.push(p);
            } else {
                c.endPoints.push(p);
            }

        }
        return c;
    }
}
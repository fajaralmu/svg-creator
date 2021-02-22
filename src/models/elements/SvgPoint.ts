
import BaseElement from './BaseElement';
export default class SvgPoint extends BaseElement {

    updatePosition = (e: React.MouseEvent<SVGRectElement>) => { 
        const target = e.target as SVGRectElement;
        var dim = target.getBoundingClientRect();

        this.x = parseInt((e.clientX - dim.left).toFixed(2));
        this.y = parseInt((e.clientY - dim.top).toFixed(2));
    }
    public static newInstanceFromReference = (refPoint: SvgPoint): SvgPoint => {
        const p = new SvgPoint();
        p.x = refPoint.x;
        p.y = refPoint.y;
        return p;
    }
    /**
     * make straight LINE
     * @param e 
     * @param target 
     * @param prevPoint 
     */
    public static newStraightLineInstance = (e: React.MouseEvent<SVGRectElement>, prevPoint: SvgPoint): SvgPoint => {
        var dim = (e.target as SVGRectElement).getBoundingClientRect();
        const p = new SvgPoint();

        p.x = e.clientX - dim.left;
        p.y = e.clientY - dim.top;;
        const absX = Math.abs(prevPoint.x - p.x);
        const abxY = Math.abs(prevPoint.y - p.y);
        if (absX < abxY) {
            p.x = prevPoint.x;
        } else {
            p.y = prevPoint.y;
        }
        return p;
    }
    public static newInstanceFromEvent = (e: React.MouseEvent<any>): SvgPoint => {
         const p = new SvgPoint();
        p.updatePosition(e); 
        return p;
    }
}
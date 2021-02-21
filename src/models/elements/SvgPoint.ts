
import BaseElement from './BaseElement';
import { uniqueId } from './../../utils/StringUtil';
export default class SvgPoint extends BaseElement{
    id:string = uniqueId();

    public static newInstanceFromReference = (refPoint:SvgPoint) : SvgPoint => {
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
    public static newStraightLineInstance  = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement, prevPoint:SvgPoint): SvgPoint => {
        var dim = target.getBoundingClientRect();
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
    public static  newInstance = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement): SvgPoint => {
        var dim = target.getBoundingClientRect();
        const p = new SvgPoint();

        p.x = parseInt((e.clientX - dim.left).toFixed(2));
        p.y = parseInt((e.clientY - dim.top).toFixed(2));
        return p;
    }
}
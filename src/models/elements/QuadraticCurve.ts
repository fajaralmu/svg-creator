
import BaseElement from './BaseElement';
import SvgItem from './SvgItem';
import SvgPoint from './SvgPoint';
export default class QuadraticCurve extends BaseElement { 
    endX:number = 0;
    endY:number = 0;
    slopeX:number=  0;
    slopeY:number = 0;
    getPath = () :string => {
        let path = "M "+this.x+ " "+this.y+ " "
        + "Q "+this.slopeX+ " "+this.slopeY + " "+this.endX + " "+ this.endY;

        return path;
    }
    html = () => {
        return `<path stroke-width="`+this.strokeWidth+`" stroke="` + this.strokeColor + `"  d="`+this.getPath()+`"/>`;
    }

    public static newInstance = (ref:SvgItem, startPoint:SvgPoint, endPoint:SvgPoint, slopePoint:SvgPoint) :QuadraticCurve => {
        const c = new QuadraticCurve();
        c.init(ref);
        c.x = startPoint.x;
        c.y = startPoint.y;
        c.slopeX = slopePoint.x;
        c.slopeY = slopePoint.y;
        c.endX = endPoint.x;
        c.endY = endPoint.y;
        return c;
    }
}
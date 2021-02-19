
import BaseElement from './BaseElement';
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
    html = (strokeColor?:string) => {
        return `<path stroke="` + strokeColor + `"  d="`+this.getPath()+`"/>`;
    }

    public static newInstance = (startPoint:SvgPoint, endPoint:SvgPoint, slopePoint:SvgPoint) :QuadraticCurve => {
        const c = new QuadraticCurve();
        c.x = startPoint.x;
        c.y = startPoint.y;
        c.slopeX = slopePoint.x;
        c.slopeY = slopePoint.y;
        c.endX = endPoint.x;
        c.endY = endPoint.y;
        return c;
    }
}
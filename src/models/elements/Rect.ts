
import BaseElement from './BaseElement';
import SvgItem from './SvgItem';
import SvgPoint from './SvgPoint';

export default class Rect extends BaseElement {
    
    width:number = 0;
    height:number = 0;

    html = ( )=> {
        const r=  this;
        return `<rect stroke-width="`+this.strokeWidth+`" stroke="` + this.strokeColor + `"  x="` + r.x + `" y="` + r.y + `" width="` + r.width + `" height="` + r.height + `"  />`;

    }

    public static newInstance = (ref:SvgItem, start:SvgPoint, end:SvgPoint) :Rect => {
        const r = new Rect();
        r.init(ref);
        r.x = start.x;
        r.y = start.y;
        r.width = end.x - start.x;
        r.height = end.y - start.y;
        return r;
    }

    public static  getBoundingRect = (xMin:number, xMax:number, yMin:number, yMax:number):Rect => {
        
        const r = new Rect();
        r.x = xMin;
        r.y = yMin;
        r.width = xMax - xMin;
        r.height = yMax - yMin;
        r.strokeColor = '#ccc';
        r.strokeWidth = 1;
        return r;
    }
}
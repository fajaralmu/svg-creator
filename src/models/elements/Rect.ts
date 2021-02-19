
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
}

import BaseElement from './BaseElement';
import SvgPoint from './SvgPoint';

export default class Rect extends BaseElement {
    
    width:number = 0;
    height:number = 0;

    html = (strokeColor?:string)=> {
        const r=  this;
        return `<rect stroke="` + strokeColor + `"  x="` + r.x + `" y="` + r.y + `" width="` + r.width + `" height="` + r.height + `"  />`;

    }

    public static newInstance = (start:SvgPoint, end:SvgPoint) :Rect => {
        const r = new Rect();
        r.x = start.x;
        r.y = start.y;
        r.width = end.x - start.x;
        r.height = end.y - start.y;
        return r;
    }
}
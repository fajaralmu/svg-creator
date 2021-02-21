import SvgItem from "./SvgItem";
import { uniqueId } from './../../utils/StringUtil';

export default class BaseElement {
    id:string = uniqueId();
    x:number = 0; y: number = 0;
    strokeColor:string = "#000";
    strokeWidth:number = 2;
    fillColor:string = "none";

    init = (ref:SvgItem) => {
        this.fillColor = ref.fillColor;
        this.strokeColor = ref.strokeColor;
        this.strokeWidth = ref.strokeWidth;
    }

    html = (strokeColor?:string) => {
        return '<g></g>';
    }

    protected baseProperties = (): string => {
        return ` fill="`+this.fillColor+`" stroke-width="`+this.strokeWidth+`" stroke="` + this.strokeColor + `" `;
    }
}
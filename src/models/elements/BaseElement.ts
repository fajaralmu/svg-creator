import SvgItem from "./SvgItem";
import { uniqueId } from './../../utils/StringUtil';

export default class BaseElement {
    id:string = uniqueId();
    x:number = 0; y: number = 0;
    strokeColor:string = "#000";
    strokeWidth:number = 2;

    init = (ref:SvgItem) => {
        this.strokeColor = ref.strokeColor;
        this.strokeWidth = ref.strokeWidth;
    }

    html = (strokeColor?:string) => {
        return '<g></g>';
    }
}
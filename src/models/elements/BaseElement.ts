import SvgItem from "./SvgItem";

export default class BaseElement {
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
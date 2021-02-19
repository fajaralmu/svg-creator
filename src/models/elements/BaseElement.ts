
export default class BaseElement {
    x:number = 0; y: number = 0;

    html = (strokeColor?:string) => {
        return '<g></g>';
    }
}
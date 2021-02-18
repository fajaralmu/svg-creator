
import SvgPoint from './SvgPoint';
export default 
class SvgItem {
    points: SvgPoint[] = [];
    closePath: boolean = false;
    strokeColor:string =  "#20f08d";
    getPath = () => {
        if (this.points.length < 2) { return "" }

        let firstPoint = this.points[0];
        let path = "M " + firstPoint.x + " " + firstPoint.y;
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            path += " L " + point.x + " " + point.y + " ";
        }
        return path + (this.closePath ? "Z" : "");
    }

    public static getOutput = (items:SvgItem[], size:number):string => {
        let svg = `<svg width="`+size+`" height="`+size+`"><g stroke="black" fill="transparent" stroke-width="2">
        {SVG}</g></svg>`;
        let paths = "";
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            paths += `<path stroke="`+element.strokeColor+`" d="`+element.getPath()+`" />`;
        }
        return svg.replace("{SVG}", paths);
    }
}
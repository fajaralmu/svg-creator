
export default class SvgPoint {
    x: number = 0; y: number = 0;

    /**
     * make straight LINE
     * @param e 
     * @param target 
     * @param prevPoint 
     */
    public static newInstanceWithPrevPoint  = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement, prevPoint:SvgPoint): SvgPoint => {
        var dim = target.getBoundingClientRect();
        const p = new SvgPoint();

        p.x = e.clientX - dim.left;
        p.y = e.clientY - dim.top;;
        const absX = Math.abs(prevPoint.x - p.x);
        const abxY = Math.abs(prevPoint.y - p.y);
        if (absX < abxY) {
            p.x = prevPoint.x;
        } else {
            p.y = prevPoint.y;
        }
        return p;
    }
    public static  newInstance = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement): SvgPoint => {
        var dim = target.getBoundingClientRect();
        const p = new SvgPoint();

        p.x = e.clientX - dim.left;
        p.y = e.clientY - dim.top;;
        return p;
    }
}
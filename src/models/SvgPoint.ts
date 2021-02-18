
export default class SvgPoint {
    x: number = 0; y: number = 0;

    public static  newInstance = (e: React.MouseEvent<SVGRectElement>, target: SVGRectElement): SvgPoint => {
        var dim = target.getBoundingClientRect();
        const p = new SvgPoint();

        p.x = e.clientX - dim.left;
        p.y = e.clientY - dim.top;;
        return p;
    }
}
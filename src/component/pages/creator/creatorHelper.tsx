import React from 'react'
import SvgItem from '../../../models/elements/SvgItem';
export const WorksheetRect = (props:{size:number,addPoint(e: React.MouseEvent<SVGRectElement>): void}) => {
    const size = props.size;
    return (
        <rect  
            focusable="true" id="svg-screen"
            onClick={props.addPoint}
            //  onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}onMouseMove={this.onMouseMove}
            fill="transparent" x={0} y={0} width={size} height={size} />
    )
}


export const Points = (props: {active:boolean, pointColor: string, onClick(id:string, index: number): any, element: SvgItem }) => {
    const strokeColor = props.active ? 'rgb(0,0,0)': '#fff';
    return (
        <g fill={props.pointColor} stroke={strokeColor} strokeWidth={1} className="svg-points">
            {        props.element.points.map((p, i) => {
                return (
                    <circle strokeWidth={i == 0 ? 3 : 1} className="svg-point" onClick={(e) => {
                        e.preventDefault();
                        props.onClick(props.element.id, i);
                    }} key={"point-" + "_" + i} cx={p.x} cy={p.y} r={3} />
                )
            })
            }
        </g>
    )
}
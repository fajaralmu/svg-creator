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



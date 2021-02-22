import React from 'react'
import SvgItem from '../../../models/elements/SvgItem';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import Rect from './../../../models/elements/Rect';
import SvgPoint from './../../../models/elements/SvgPoint';
export const WorksheetRect = (props: { size: number, addPoint(e: React.MouseEvent<SVGRectElement>): void }) => {
    const size = props.size;
    return (
        <rect
            focusable="true" id="svg-screen"
            onClick={props.addPoint}
            //  onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}onMouseMove={this.onMouseMove}
            fill="transparent" x={0} y={0} width={size} height={size} />
    )
}

export const BoundingRect = (props: { rect: Rect }) => {
    const boundingRect = props.rect;
    return (
        <rect x={boundingRect.x} y={boundingRect.y} width={boundingRect.width} height={boundingRect.height}
            fill="none" stroke={boundingRect.strokeColor} strokeWidth={boundingRect.strokeWidth}
        />
    )
}

export const PointInfo = (props: { onDelete(): any, point: SvgPoint  }) => {
    const p: SvgPoint = props.point;
    return (
        <ul className="list-group" style={{ marginTop: '5px' }}>
            <li className="list-group-item bg-info text-light">Point Info</li>
            <li className="list-group-item">x:{p.x} y:{p.y}</li>

            <li className="list-group-item ">
                <AnchorWithIcon iconClassName="fas fa-times" className="btn btn-danger" 
                        onClick={props.onDelete} children="Press D"
                />
            </li>

        </ul>
    )
}



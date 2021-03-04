import React  from 'react'
import { ElementType } from '../../../constant/ElementType';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import Rect from './../../../models/elements/Rect';
import SvgPoint from './../../../models/elements/SvgPoint';
import AnchorWithSvg from './../../navigation/AnchorWithSvg';
export const WorksheetRect = (props: {
    height: number, width:number,
    onMouseMove(e: React.MouseEvent<SVGRectElement>): any,
    addPoint(e: React.MouseEvent<SVGRectElement>): void
}) => { 
    return (
        <rect
            focusable="true" id="svg-screen"
            onMouseMove={props.onMouseMove}
            onClick={props.addPoint}
            //  onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}onMouseMove={this.onMouseMove}
            fill="transparent" x={0} y={0} width={props.width} height={props.height} />
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

export const PointInfo = (props: { onDelete(): any, point: SvgPoint, dragMode:boolean }) => {
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
            <li className="list-group-item">
                Press <span className={props.dragMode?
                "badge badge-success":"badge badge-dark"}>M</span> to toggle dragging
            </li>

        </ul>
    )
}

export const AddItemButtons = (props:{elementCount:number, addItem  (type:ElementType):any}) => {

    return (
        <div className=" btn-group-vertical">
        <span className="btn btn-dark">Items:  {props.elementCount}
        </span>
        <AnchorWithIcon onClick={(e) => { props.addItem(ElementType.PATH) }} iconClassName="fas fa-draw-polygon" />
        <AnchorWithIcon onClick={(e) => { props.addItem(ElementType.CIRCLE) }} iconClassName="far fa-circle" />
        <AnchorWithIcon onClick={(e) => { props.addItem(ElementType.RECT) }} iconClassName="far fa-square" />
        <AnchorWithSvg onClick={(e) => { props.addItem(ElementType.CURVE) }} icon="curve" />
        <AnchorWithSvg onClick={(e) => { props.addItem(ElementType.ELLIPSE) }} icon="ellips" />

    </div>
    )
}



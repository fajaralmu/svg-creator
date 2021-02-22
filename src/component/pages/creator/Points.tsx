
import React, { Component } from 'react';
import SvgItem from '../../../models/elements/SvgItem';
interface Props {
    active: boolean, activeIndex?: number, pointColor: string,
    onClick(elementId: string, index: number): any,
    onMouseDown?(e: React.MouseEvent<SVGCircleElement>, index: number): any,
    onMouseUp?(e: React.MouseEvent<SVGCircleElement>): any,
    
    element: SvgItem
}
export default class Points extends Component<Props, any> {

    render() {
        const props = this.props;

        return (
            <g fill={props.pointColor} strokeWidth={1} className="svg-points">
                {props.element.points.map((p, i) => {
                    const activeIndex = props.activeIndex == i;
                    const strokeColor = activeIndex ? 'rgb(100,255,100)' : props.active ? 'rgb(0,0,0)' : '#fff';
                    const strokeWidth = i == 0 ? 3 : 1;
                    return (
                        <g stroke={strokeColor} key={"point-" + p.id}>
                            <circle
                                 onMouseDown={(e) => { if (props.onMouseDown) props.onMouseDown(e, i) }}
                                onMouseUp={(e) => { if (props.onMouseUp) props.onMouseUp(e) }}
                                strokeWidth={strokeWidth} className="svg-point" onClick={(e) => {
                                    e.preventDefault();
                                    props.onClick(props.element.id, i);
                                }} cx={p.x} cy={p.y} r={3} />
                        </g>
                    )
                })
                }
            </g>
        )
    }
}
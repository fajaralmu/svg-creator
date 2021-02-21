
import React, { Component } from 'react';
import SvgItem from '../../../models/elements/SvgItem';
import SvgPoint from './../../../models/elements/SvgPoint';
interface Props {
    active: boolean, onMouseOver(p:SvgPoint), onMouseOut(p:SvgPoint), pointColor: string, onClick(id: string, index: number): any, element: SvgItem
}
export default class Points extends Component<Props, any> {

    render() {
        const props = this.props;
        const strokeColor = props.active ? 'rgb(0,0,0)' : '#fff';
        return (
            <g fill={props.pointColor} stroke={strokeColor} strokeWidth={1} className="svg-points">
                {props.element.points.map((p, i) => {
                    return (
                        <g><circle
                            onMouseOut={(e)=>{ props.onMouseOut(p) }}
                            onMouseOver={(e)=>{  props.onMouseOver(p) }} strokeWidth={i == 0 ? 3 : 1} className="svg-point" onClick={(e) => {
                            e.preventDefault();
                            props.onClick(props.element.id, i);
                        }} key={"point-" + "_" + i} cx={p.x} cy={p.y} r={3} />
                        </g>
                    )
                })
                }
            </g>
        )
    }
}
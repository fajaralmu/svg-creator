
import React, { Component } from 'react';
import SvgItem from '../../../models/elements/SvgItem';
import SvgPoint from './../../../models/elements/SvgPoint';
interface Props {
    active: boolean, activeIndex?:number,   pointColor: string, onClick(elementId: string, index: number): any, element: SvgItem
}
export default class Points extends Component<Props, any> {

    render() {
        const props = this.props;
       
        return (
            <g fill={props.pointColor} strokeWidth={1} className="svg-points">
                {props.element.points.map((p, i) => {
                    const activeIndex = props.activeIndex == i;
                    const strokeColor = activeIndex? 'rgb(100,255,100)': props.active ? 'rgb(0,0,0)' : '#fff';
                    const strokeWidth = i == 0 ? 3 : 1;
                    return (
                        <g stroke={strokeColor}  key={"point-"  + p.id}><circle 
                            // onMouseOut={(e)=>{ props.onMouseOut(p) }}
                            // onMouseOver={(e)=>{  props.onMouseOver(p) }}
                             strokeWidth={strokeWidth} className="svg-point" onClick={(e) => {
                            e.preventDefault();
                            props.onClick(props.element.id, i);
                        }}  cx={p.x} cy={p.y} r={3} />
                        </g>
                    )
                })
                }
            </g>
        )
    }
}
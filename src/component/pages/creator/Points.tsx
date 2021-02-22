
import React, { Component } from 'react';
import SvgItem from '../../../models/elements/SvgItem';
import SvgPoint from './../../../models/elements/SvgPoint';
interface Props {
    active: boolean, activeIndex?: number, pointColor: string,
    onClick(elementId: string, index: number): any,
    element: SvgItem,
    removePoint?(index:number): any,
    movePoint?(index:number): any
}
class State {
    selectedIndex?: number;
    contextMenu: boolean = false;
}
export default class Points extends Component<Props, State> {

    state: State = new State();
    onContextMenu = (e: React.MouseEvent<SVGCircleElement>, index: number) => {
        e.preventDefault();

        this.setState({ contextMenu: true, selectedIndex: index });
    }
    getSelectedPoint = (): SvgPoint | undefined => {
        console.debug("this.state.selectedIndex: ", this.state.selectedIndex);
        if (this.state.selectedIndex == undefined) return undefined;
        try {

            return this.props.element.points[this.state.selectedIndex];
        } catch (error) {
            return undefined;
        }
    }
    closeContextMenu = () => {
        this.setState({contextMenu: false});
    }
    removePoint = ( ) => {
        if (this.state.selectedIndex && this.props.removePoint)
            this.props.removePoint(this.state.selectedIndex);
        this.closeContextMenu();
    }
    movePoint = ( ) => {
        if (this.state.selectedIndex && this.props.movePoint)
            this.props.movePoint(this.state.selectedIndex);
        this.closeContextMenu();
    }
    render() {
        const props = this.props;
        const contextMenu = this.state.contextMenu;
        const selectedPoint = this.getSelectedPoint();
        return (
            <g fill={props.pointColor} strokeWidth={1} className="svg-points">
                {props.element.points.map((p, i) => {
                    const activeIndex = props.activeIndex == i;
                    const strokeColor = activeIndex ? 'rgb(100,255,100)' : props.active ? 'rgb(0,0,0)' : '#fff';
                    const strokeWidth = i == 0 ? 1 : 1;
                    return (
                        <g stroke={strokeColor} key={"point-" + p.id}>
                            <circle onContextMenu={(e) => this.onContextMenu(e, i)} strokeWidth={strokeWidth} className="svg-point" onClick={(e) => {
                                e.preventDefault();
                                props.onClick(props.element.id, i);
                            }} cx={p.x} cy={p.y} r={3} />

                        </g>
                    )
                })
                }
                {props.active && contextMenu && selectedPoint ?
                    <g>
                        <rect stroke="#ccc" x={selectedPoint.x - 25} y={selectedPoint.y} width={70} height={100} fill="#fff" />

                        <foreignObject x={selectedPoint.x - 25 } y={selectedPoint.y - 5 } width={70} height={100}>
                            <a className="text-dark" style={{ padding:1, margin: 0,  cursor:'pointer', fontSize: 9 }} onClick={this.movePoint} >Move</a>
                            <br/>
                            <a className="text-dark" style={{ padding:1, margin: 0,  cursor:'pointer', fontSize: 9 }} onClick={this.closeContextMenu} >Close</a>
                            <br/>
                            <a className="text-danger"style={{ padding:1, margin: 0,  cursor:'pointer', fontSize: 9 }} onClick={this.removePoint} >Remove</a>
                        </foreignObject>
                    </g>
                    : null
                }
            </g>
        )
    }
}
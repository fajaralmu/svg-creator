
import React, { Component } from 'react';
import SvgItem from '../../../models/elements/SvgItem';
import SvgPoint from './../../../models/elements/SvgPoint';
interface Props {
    active: boolean, activeIndex?: number, pointColor: string,
    onClick(elementId: string, index: number): any,
    element: SvgItem,
    removePoint?(index: number): any,
    movePoint?(index: number): any,
    svgWidth: number, svgHeight: number
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
        this.setState({ contextMenu: false });
    }
    removePoint = () => {
        if (undefined !== this.state.selectedIndex && this.props.removePoint)
            this.props.removePoint(this.state.selectedIndex);
        this.closeContextMenu();
    }
    movePoint = () => {
        if (undefined !== this.state.selectedIndex && this.props.movePoint)
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
                    <ContextMenu point={selectedPoint}
                        movePoint={this.movePoint}
                        removePoint={this.removePoint}
                        closeMenu={this.closeContextMenu}
                        svgWidth={props.svgWidth}
                        svgHeight={props.svgHeight}
                    />
                    : null
                }
            </g>
        )
    }
}
interface ContextMenuProps {
    point: SvgPoint, closeMenu(): any
    movePoint(): any, removePoint(): any,
    svgWidth: number, svgHeight: number
}
class ContextMenu extends Component<ContextMenuProps, any> {
    menuHeight = 75;
    menuWidth = 55;
    calculatePosY = (): number => {
        const p = this.props.point;
        if (this.exceedMaxHeight()) {
            return p.y - this.menuHeight;
        }
        return p.y;
    }
    exceedMaxHeight = () => {
        return this.props.point.y + this.menuHeight > this.props.svgHeight;
    }
    render = () => {
        const props = this.props;
        const p = props.point;
        const x = p.x - 25;
        const y = this.calculatePosY();

        return (
            <g>
                <rect rx={5} ry={5} stroke="#343a40" x={x} y={y} width={this.menuWidth} height={this.menuHeight} fill="#fff" />

                <foreignObject x={x} y={y - 5} width={this.menuWidth} height={this.menuHeight}>
                    <a className="text-info" style={{ padding: 1, margin: 0, cursor: 'pointer', fontSize: 9 }} onClick={props.movePoint} >Move</a>
                    <br />
                    <a className="text-danger" style={{ padding: 1, margin: 0, cursor: 'pointer', fontSize: 9 }} onClick={props.removePoint} >Remove</a>
                    <br />
                    <a className="text-dark" style={{ padding: 1, margin: 0, cursor: 'pointer', fontSize: 9 }} onClick={props.closeMenu} >Close</a>
                </foreignObject>
            </g>
        )
    }
}
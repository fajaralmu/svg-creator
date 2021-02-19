import React, { ChangeEvent } from 'react'
import Modal from '../../container/Modal';
import FormGroup from '../../form/FormGroup';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import BaseComponent from '../../BaseComponent';
import './SvgCreator.css'
import { mapCommonUserStateToProps } from '../../../constant/stores';
import { connect } from 'react-redux';
import ToggleButton from '../../navigation/ToggleButton';
import SvgItem from '../../../models/elements/SvgItem';
import SvgPoint from '../../../models/elements/SvgPoint';
import { ElementType } from '../../../models/ElementType';
import GeneralForm from './GeneralForm';
import { withRouter } from 'react-router-dom';

class State {
    svgElements: SvgItem[] = [new SvgItem()];
    pointColor: string = "#cccccc";
    size: number = 400;
    selectedIndex: number = 0;
    editMode: boolean = true;
    output?: string;
}
class SvgCreator extends BaseComponent {
    state: State = new State();
    svgWorkSheetRef: React.RefObject<SVGRectElement> = React.createRef();
    straightLine: boolean = false;
    isMouseDown: boolean = false;
    constructor(props) {
        super(props, false);
        this.initKeyListener();
    }
    initKeyListener = () => {
        window.onkeypress = this.onkeypress;
        window.onkeyup = this.onkeyup;
    }
    setActiveIndex = (index: number) => {
        if (this.state.editMode) return;
        this.setState({ selectedIndex: index });
    }
    onkeyup: (((this: Window | GlobalEventHandlers, ev: KeyboardEvent) => any) & ((this: Window, ev: KeyboardEvent) => any)) =
        event => {
            this.straightLine = false;
        }
    onkeypress: (((this: Window | GlobalEventHandlers, ev: KeyboardEvent) => any) & ((this: Window, ev: KeyboardEvent) => any)) =
        event => {
            if (event instanceof KeyboardEvent) {
                const keyEvent: KeyboardEvent = event as KeyboardEvent;
                if (keyEvent.key == 'h') {
                    this.straightLine = true;
                } else if (keyEvent.key == 'z') {
                    this.updateClosePath(!this.getSelectedElement().closePath);
                }
            }
        }

    onMouseDown = (e: React.MouseEvent<SVGRectElement>): void => { this.isMouseDown = true }
    onMouseUp = (e: React.MouseEvent<SVGRectElement>): void => { this.isMouseDown = false }
    onMouseMove = (e: React.MouseEvent<SVGRectElement>): void => {
        if (!this.isMouseDown) {
            return;
        }
    }
    addPoint = (e: React.MouseEvent<SVGRectElement>): void => {
        const target = e.target as SVGRectElement;
        if (!target) return;
        if (target.id !== 'svg-screen') {
            console.debug("TAG NAME: ", target.tagName);
            return;
        }

        console.debug("straightLine: ", this.straightLine);
        const element: SvgItem = this.getSelectedElement();
        element.addPointByEvent(e, target, this.straightLine);
        this.updateSelectedElement(element);
    }
    getSelectedElement = (): SvgItem => {
        const elements = this.state.svgElements;
        const el = elements[this.state.selectedIndex];
        return el;
    }
    setElementType = (e: ChangeEvent) => {
        if (this.state.editMode) { return; }
        const target = e.target as HTMLSelectElement;
        this.setState({ elementType: target.value });
    }
    addPointToCurrentElement = (p: SvgPoint) => {

        const element = this.getSelectedElement();
        element.points.push(p);
        this.updateSelectedElement(element);
    }
    updateSelectedElementStrokeColor = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const element = this.getSelectedElement();
        element.strokeColor = target.value;
        this.updateSelectedElement(element);
    }
    updateSelectedElement = (element: SvgItem) => {
        const elements = this.state.svgElements;
        elements[this.state.selectedIndex] = element;
        this.setState({ svgElements: elements });
    }
    updateClosePath = (value: boolean) => {
        const element = this.getSelectedElement();
        element.closePath = value;
        this.updateSelectedElement(element);
    }
    addSvgElement = (type: ElementType) => {
        const elements = this.state.svgElements;
        elements.push(SvgItem.newInstance(type));
        this.setState({ editMode: true, svgElements: elements, selectedIndex: elements.length - 1 });
    }
    removeSelectedElement = () => {
        const elements = this.state.svgElements;
        if (elements.length <= 1) {
            try {
                elements[this.state.selectedIndex].points = [];
                this.setState({ svgElements: elements });
            } catch (error) { console.error(error) }
            return;
        }
        for (let i = 0; i < elements.length; i++) {
            if (i == this.state.selectedIndex) {
                elements.splice(i, 1);
                break;
            }
        }
        this.setState({ svgElements: elements, selectedIndex: elements.length - 1 });
    }
    onPointClick = (id:string, index:number) => {
        if (id == this.getSelectedElement().id) {
            this.removePoint(index);
            return;
        }
        this.addPointFromReferencePoint(id, index);

    }
    addPointFromReferencePoint = (id:string, index:number) => {
        const elements = this.state.svgElements;
        const otherElements:SvgItem[] = elements.filter((e=>e.id == id));
        if (otherElements.length == 0) return;
        const otherElement  = otherElements[0];
        const refPoint = otherElement.getPoint(index);
        if (!refPoint) {
            return;
        }
        const p = new SvgPoint();
        p.x = refPoint.x;
        p.y = refPoint.y;
        const element = this.getSelectedElement();
        element.addPoint(p);
        this.updateSelectedElement(element);
    }
    removePoint = (index: number) => {
        console.debug("removePoint : ", index);
        const element = this.getSelectedElement();
        for (let i = 0; i < element.points.length; i++) {
            if (i == index) {
                element.points.splice(i, 1);
                break;
            }
        }
        this.updateSelectedElement(element);
    }
    setEditMode = (val: boolean) => {
        this.setState({ editMode: val });
    }
    showOutput = () => {
        this.setState({ output: SvgItem.getOutput(this.state.svgElements, this.state.size) });
    }

    render = () => {
        const elements: SvgItem[] = this.state.svgElements;
        const element: SvgItem = this.getSelectedElement();
        const pointColor = this.state.pointColor;
        const size = this.state.size;
        const selectedIndex = this.state.selectedIndex;
        const editMode = this.state.editMode;
        return <Modal title="Draw Your Svg Path">
            <div className="row">
                <div className="col-md-8 svg-wrapper text-center" style={{
                    backgroundImage: 'url(' + this.props.imageData + ')',
                }}>
                    <svg className=" svg-sheet" width={size} height={size}>
                        <g fill="none" className="svg-path">
                            {elements.map((element, i) => {
                                // console.debug("element.type === ElementType.RECT: ",element.type, ElementType.RECT, (element.type == ElementType.RECT));
                                if (element.type == ElementType.PATH) {
                                    return <path stroke={element.strokeColor} onClick={(e) => this.setActiveIndex(i)} className={this.state.editMode == false ? "path-selectable" : "path-regular"}
                                        strokeWidth={selectedIndex == i ? 4 : 2} key={"path-" + i} d={element.getPath()} />
                                }
                                if (element.type == ElementType.RECT) {

                                    const rect = element.getRectElement();
                                    return <rect stroke={element.strokeColor} onClick={(e) => this.setActiveIndex(i)}
                                        className={this.state.editMode == false ? "path-selectable" : "path-regular"}
                                        strokeWidth={selectedIndex == i ? 4 : 2} key={"rect-" + i}
                                        x={rect.x} y={rect.y}
                                        width={rect.width} height={rect.height}
                                    />
                                }
                                if (element.type == ElementType.CIRCLE) {

                                    const circle = element.getCircleElement();
                                    return <circle stroke={element.strokeColor} onClick={(e) => this.setActiveIndex(i)}
                                        className={this.state.editMode == false ? "path-selectable" : "path-regular"}
                                        strokeWidth={selectedIndex == i ? 4 : 2} key={"circle-" + i}
                                        cx={circle.x} cy={circle.y}
                                        r={circle.r}
                                    />
                                }
                                if (element.type == ElementType.CURVE) {
                                    const c = element.getQuadCurveElement();
                                    return <path stroke={element.strokeColor} onClick={(e) => this.setActiveIndex(i)} className={this.state.editMode == false ? "path-selectable" : "path-regular"}
                                        strokeWidth={selectedIndex == i ? 4 : 2} key={"curve-" + i} d={c.getPath()} />
                                }
                                return <>{ElementType[element.type]}</>
                            })}
                        </g>
                         
                        {editMode ?
                            <g>
                                <rect ref={this.svgWorkSheetRef}
                                    focusable="true" id="svg-screen"
                                    onClick={this.addPoint} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}
                                    onMouseMove={this.onMouseMove}
                                    fill="transparent" x={0} y={0} width={size} height={size} />

                                {elements.map((el, i) => {
                                    if (i == this.state.selectedIndex) return null
                                    return (
                                        <Points key={"pts-" + i} active ={false} pointColor={pointColor} element={el} onClick={this.onPointClick} />
                                    )
                                })}
                                <Points  active pointColor={pointColor} element={element} onClick={this.onPointClick} />
                            </g> : null
                        }
                    </svg>

                </div>
                <div className="col-md-4">
                    <form className="container-fluid  " onSubmit={(e) => e.preventDefault()}>
                        <h4><i className="fas fa-palette" />&nbsp;Options</h4>
                        <FormGroup label="Type">
                            {ElementType[element.type]}
                        </FormGroup>
                        <FormGroup label="Selected Index">
                            {this.state.selectedIndex}
                        </FormGroup>
                        <FormGroup label="Close Path">
                            <ToggleButton active={element.closePath}
                                onClick={this.updateClosePath} />
                            <br />
                            <p>Press <span className="badge badge-dark">Z</span> to toggle Close Path</p>
                        </FormGroup>
                        <FormGroup label="Stroke Color">
                            <input type="color" className="form-control" value={element.strokeColor}
                                onChange={this.updateSelectedElementStrokeColor}
                            />
                        </FormGroup>
                        <FormGroup  >
                            <p>HOLD <span className="badge badge-dark">H</span> to make straightline</p>
                            <AnchorWithIcon onClick={this.removeSelectedElement} iconClassName="fas fa-times"
                                className="btn btn-danger btn-sm">Delete Path</AnchorWithIcon>
                        </FormGroup>
                    </form>
                </div>
            </div>
            <p />
            <GeneralForm elements={elements}
                handleInputChange={this.handleInputChange}
                setEditMode={this.setEditMode} showOutput={this.showOutput}
                addSvgElement={this.addSvgElement}
                editMode={this.state.editMode}
                selectedIndex={this.state.selectedIndex} size={this.state.size}
                pointColor={this.state.pointColor}
                output={this.state.output}
            />
        </Modal>
    }
}


const Points = (props: {active:boolean, pointColor: string, onClick(id:string, index: number): any, element: SvgItem }) => {
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

export default withRouter(connect(
    mapCommonUserStateToProps
)(SvgCreator))
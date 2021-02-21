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
import GeneralForm from './SettingForm';
import { withRouter } from 'react-router-dom';
import { BoundingRect, WorksheetRect } from './creatorHelper';
import { ElementType } from '../../../constant/ElementType';
import AnchorWithSvg from './../../navigation/AnchorWithSvg';
import Points from './Points';

class State {
    svgElements: SvgItem[] = [new SvgItem()];
    pointColor: string = "#cccccc";
    width: number = 400;
    height: number = 400;
    selectedIndex: number = 0;
    editMode: boolean = true;
    output?: string;
    selectedPoint: SvgPoint | undefined;
}
class SvgCreator extends BaseComponent {
    state: State = new State();
    straightLine: boolean = false;
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
        event => { this.straightLine = false; }

    onkeypress: (((this: Window | GlobalEventHandlers, ev: KeyboardEvent) => any) & ((this: Window, ev: KeyboardEvent) => any)) =
        event => {
            if (event instanceof KeyboardEvent) {
                const keyEvent: KeyboardEvent = event as KeyboardEvent;
                if (keyEvent.key == 'h') {
                    this.straightLine = true;
                } else if (keyEvent.key == 'z') {
                    this.updateClosePath(!this.getSelectedElement().closePath);
                } else if (keyEvent.key == 'e') {
                    this.setEditMode(!this.state.editMode);
                }
            }
        }
    addPoint = (e: React.MouseEvent<SVGRectElement>): void => {
        const target = e.target as SVGRectElement;
        if (!target) return;
        if (target.id !== 'svg-screen') {
            console.debug("TAG NAME: ", target.tagName);
            return;
        }

        const element: SvgItem = this.getSelectedElement();
        element.addPointByEvent(e, target, this.straightLine);
        this.updateSelectedElement(element);
    }
    getSelectedElement = (): SvgItem => {
        const elements = this.state.svgElements;
        return elements[this.state.selectedIndex];
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
    setElementNoColor = () => {
        const element = this.getSelectedElement();
        element.fillColor = "none";
        this.updateSelectedElement(element);
    }
    updateSelectedElementProp = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const name = target.name;
        const val = target.type == 'number' ? parseInt(target.value) : target.value;
        const element = this.getSelectedElement();
        element[name] = val;
        this.updateSelectedElement(element);
    }
    updateSelectedElement = (element: SvgItem) => {
        const elements = this.state.svgElements;
        elements[this.state.selectedIndex] = element;
        this.setState({ svgElements: elements });
    }
    updateClosePath = (value: boolean) => {
        const element = this.getSelectedElement().setClosePath(value);
        this.updateSelectedElement(element);
    }
    addSvgElement = (type: ElementType) => {
        const elements = this.state.svgElements;
        elements.push(SvgItem.newInstance(type));
        this.setState({ editMode: true, svgElements: elements, selectedIndex: elements.length - 1 });
    }
    orderFront = (e) => {
        const elements = this.state.svgElements;
        const element = Object.assign(new SvgItem, this.getSelectedElement());
        if (this.removeSelectedElement()) {
            elements.push(element);
            this.setState({ svgElements: elements, selectedIndex:elements.length-1 });
        }
    }
    orderBack = (e) => {
        const elements = this.state.svgElements;
        const element = Object.assign(new SvgItem, this.getSelectedElement());
        if (this.removeSelectedElement()) {
            elements.unshift(element)
            this.setState({ svgElements: elements, selectedIndex: 0});
        }
    }
    removeSelectedElement = () => {
        const elements = this.state.svgElements;
        if (elements.length <= 1) {
            try {
                elements[this.state.selectedIndex].points = [];
                this.setState({ svgElements: elements });
            } catch (error) { console.error(error) }
            return false;
        }
        for (let i = 0; i < elements.length; i++) {
            if (i == this.state.selectedIndex) {
                elements.splice(i, 1);
                break;
            }
        }
        this.setState({ svgElements: elements, selectedIndex: elements.length - 1 });
        return true;
    }
    onPointClick = (id: string, index: number) => {
        if (id == this.getSelectedElement().id) {
            this.removePoint(index);
            return;
        }
        this.addPointFromReferencePoint(id, index);

    }
    addPointFromReferencePoint = (id: string, index: number) => {
        const elements = this.state.svgElements;
        const filteredElements: SvgItem[] = elements.filter((e => e.id == id));
        if (filteredElements.length == 0) return;
        const refElement = filteredElements[0];
        const refPoint = refElement.getPointByIndex(index);
        if (!refPoint) {
            return;
        }
        const element = this.getSelectedElement();
        element.addPoint(SvgPoint.newInstanceFromReference(refPoint));
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
    setEditMode = (val: boolean) => { this.setState({ editMode: val }); }
    showOutput = () => {
        this.setState({ output: SvgItem.getOutput(this.state.svgElements, this.state.width, this.state.height) });
    }
    setSelectedPoint = (p?: SvgPoint) => {
        this.setState({ selectedPoint: p });
    }
    removeSelectedPoint = (p: SvgPoint) => {
        this.setSelectedPoint(undefined);
    }
    render = () => {
        const elements: SvgItem[] = this.state.svgElements;
        const element: SvgItem = this.getSelectedElement();
        const pointColor = this.state.pointColor;
        const w = this.state.width, h = this.state.height;
        const editMode = this.state.editMode;
        const boundingRect = element.getBoundingRect();
        const selectedPoint: SvgPoint | undefined = this.state.selectedPoint;

        return <Modal title="Draw Your Svg Path">
            <div className="row">
                <div className="col-md-7 svg-wrapper text-center" style={{ backgroundImage: 'url(' + this.props.imageData + ')', }}>
                    <svg className=" svg-sheet" width={w} height={h}>
                        <g fill="none" className="svg-path">
                            {elements.map((element, i) => {
                                const strokeWidth = element.strokeWidth, strokeColor = element.strokeColor;
                                const fill = element.fillColor;
                                const className = this.state.editMode == false ? "path-selectable" : "path-regular";
                                // console.debug("element.type === ElementType.RECT: ",element.type, ElementType.RECT, (element.type == ElementType.RECT));
                                const baseProps = {  onClick: (e) => this.setActiveIndex(i), className: className, stroke: strokeColor, fill: fill, strokeWidth: strokeWidth }
                                if (element.type == ElementType.RECT) {
                                    const rect = element.getRectElement();
                                    return <rect  {...baseProps} key={"rect-" + i}
                                        x={rect.x} y={rect.y} width={rect.width} height={rect.height}/>
                                }
                                if (element.type == ElementType.CIRCLE) {
                                    const circle = element.getCircleElement();
                                    return <circle {...baseProps} key={"circle-" + i} cx={circle.x} cy={circle.y} r={circle.r}/>
                                }
                                if (element.type == ElementType.CURVE) {
                                    const curve = element.getQuadCurveElement();
                                    return <path  {...baseProps} key={"curve-" + i} d={curve.getPath()} />
                                }
                                if (element.type == ElementType.ELLIPSE) {
                                    const ellipse = element.getEllipseElement();
                                    return <ellipse {...baseProps} key={"curve-" + i} cx={ellipse.x} cy={ellipse.y} rx={ellipse.rx} ry={ellipse.ry} />
                                }
                                const path = element.getPathElement();

                                return <path {...baseProps} key={"path-" + i} d={path.getPath()} />
                            })}
                        </g>
                        <BoundingRect rect={boundingRect} />
                        {editMode ?
                            <g>
                                <WorksheetRect size={w} addPoint={this.addPoint} />
                                {elements.map((el, i) => {
                                    if (i == this.state.selectedIndex) return null
                                    return (
                                        <Points onMouseOver={this.setSelectedPoint} onMouseOut={this.removeSelectedPoint} key={"pts-" + i} active={false} pointColor={pointColor} element={el} onClick={this.onPointClick} />
                                    )
                                })}
                                {/* bounding rect */}

                                {/* selected element point */}
                                <Points onMouseOver={this.setSelectedPoint} onMouseOut={this.removeSelectedPoint} active pointColor={pointColor} element={element} onClick={this.onPointClick} />
                            </g> : null
                        }
                    </svg>
                </div>
                <div className="col-md-1">
                    <div className=" btn-group-vertical">
                        <span className="btn btn-dark">Items:  {elements.length}
                        </span>
                        <AnchorWithIcon onClick={(e) => { this.addSvgElement(ElementType.PATH) }} iconClassName="fas fa-draw-polygon" />
                        <AnchorWithIcon onClick={(e) => { this.addSvgElement(ElementType.CIRCLE) }} iconClassName="far fa-circle" />
                        <AnchorWithIcon onClick={(e) => { this.addSvgElement(ElementType.RECT) }} iconClassName="far fa-square" />
                        <AnchorWithSvg onClick={(e) => { this.addSvgElement(ElementType.CURVE) }} icon="curve" />
                        <AnchorWithSvg onClick={(e) => { this.addSvgElement(ElementType.ELLIPSE) }} icon="ellips" />
                        {selectedPoint ?
                            <i>x:{selectedPoint.x} y:{selectedPoint.y}</i>
                            : null}
                    </div>
                </div>
                <div className="col-md-4">
                    <form className="container-fluid  " onSubmit={(e) => e.preventDefault()}>
                        <h4><i className="fas fa-palette" />&nbsp;Options</h4>
                        <FormGroup label="Type" children={element.id+" "+ElementType[element.type] + " [" + this.state.selectedIndex + "]"} />
                        <FormGroup label="Close Path">
                            <ToggleButton active={element.closePath} onClick={this.updateClosePath} /><br />
                            <p>Press <span className={element.closePath ? "badge badge-success" : "badge badge-dark"}>Z</span> to toggle Close Path</p>
                        </FormGroup>
                        <FormGroup label="Fill Color">
                            <input type="color" className="form-control" name="fillColor" value={element.fillColor}
                                onChange={this.updateSelectedElementProp} />
                        </FormGroup>
                        <FormGroup label="Stroke Color">
                            <input type="color" className="form-control" name="strokeColor" value={element.strokeColor}
                                onChange={this.updateSelectedElementProp} />
                            <AnchorWithIcon iconClassName="fas fa-times" className="btn btn-dark btn-sm" onClick={this.setElementNoColor} >No Color</AnchorWithIcon>
                        </FormGroup>
                        <FormGroup label="Stroke Width">
                            <input type="number" className="form-control" name="strokeWidth" value={element.strokeWidth}
                                onChange={this.updateSelectedElementProp} />
                        </FormGroup>
                        <FormGroup label="Order">
                           <div className="btn-group">
                               <AnchorWithIcon onClick={this.orderFront} iconClassName="fas fa-layer-group" >Front</AnchorWithIcon>
                               <AnchorWithIcon  onClick={this.orderBack}  iconClassName="fas fa-layer-group" >Back</AnchorWithIcon>
                           </div>
                        </FormGroup>
                        <FormGroup label="Edit Mode">
                            <ToggleButton active={this.state.editMode == true} onClick={this.setEditMode} />
                            <i>&nbsp;&nbsp;{this.state.editMode == false ? "Select path to edit" : null}</i>
                        </FormGroup>
                        <FormGroup  >
                            <p>Hold <span className="badge badge-dark">H</span> to make Straight Line</p>
                            <p>Press <span className={this.state.editMode ? "badge badge-success" : "badge badge-dark"}>E</span> to toggle Edit Mode</p>
                            <AnchorWithIcon onClick={this.removeSelectedElement} iconClassName="fas fa-times"
                                className="btn btn-danger btn-sm">Delete Path</AnchorWithIcon>
                        </FormGroup>
                    </form>
                </div>
            </div>
            <p />
            <GeneralForm elements={elements} handleInputChange={this.handleInputChange}
                showOutput={this.showOutput}
                selectedIndex={this.state.selectedIndex} width={this.state.width} height={this.state.height}
                pointColor={this.state.pointColor} output={this.state.output}
            />
        </Modal>
    }
}

export default withRouter(connect(
    mapCommonUserStateToProps
)(SvgCreator))
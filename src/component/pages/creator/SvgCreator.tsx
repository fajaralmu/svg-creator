import React, { Fragment } from 'react'
import Modal from '../../container/Modal';
import FormGroup from '../../form/FormGroup';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import BaseComponent from '../../BaseComponent';
import './SvgCreator.css'
import { mapCommonUserStateToProps } from '../../../constant/stores';
import { connect } from 'react-redux';
import ToggleButton from '../../navigation/ToggleButton';
import SvgItem from '../../../models/SvgItem';
import SvgPoint from './../../../models/SvgPoint';

class State {
    svgElements: SvgItem[] = [new SvgItem()];
    pointColor: string = "#20f08d";
    size: number = 400;
    selectedIndex: number = 0;
    editMode: boolean = true;
    output?:string;
}
class SvgCreator extends BaseComponent {
    state: State = new State();
    constructor(props) {
        super(props, false);
    }
    setActiveIndex = (index: number) => {
        if (this.state.editMode) return;
        this.setState({ selectedIndex: index });
    }
    addPoint = (e: React.MouseEvent<SVGRectElement>): void => {
        const target = e.target as SVGRectElement;
        if (!target) return;
        if (target.id !== 'svg-screen') {
            console.debug("TAG NAME: ", target.tagName);
            return;
        }
        const point: SvgPoint = SvgPoint.newInstance(e, target);
        // console.debug("addPoint x: ", point.x, "y: ", point.y);
        this.addPointToCurrentElement(point);
    }
    getSelectedElement = (): SvgItem => {
        const elements = this.state.svgElements;
        return elements[this.state.selectedIndex];
    }
    addPointToCurrentElement = (p: SvgPoint) => {
        const element = this.getSelectedElement();
        element.points.push(p);
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
    addSvgElement = () => {
        const elements = this.state.svgElements;
        elements.push(new SvgItem);
        this.setState({ svgElements: elements, selectedIndex: elements.length - 1 });
    }
    removeSelectedElement = () => {
        const elements = this.state.svgElements;
        if (elements.length <= 1) return;
        for (let i = 0; i < elements.length; i++) {
            if (i == this.state.selectedIndex) {
                elements.splice(i, 1);
                break;
            }
        }
        this.setState({ svgElements: elements, selectedIndex: elements.length - 1 });
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
        this.setState({output: SvgItem.getOutput(this.state.svgElements, this.state.size)});
    }
    render = () => {
        const elements: SvgItem[] = this.state.svgElements;
        const element: SvgItem = this.getSelectedElement();
        const pointColor = this.state.pointColor;
        const size = this.state.size;
        const selectedIndex = this.state.selectedIndex;
        const editMode = this.state.editMode;
        return <Modal title="Svg Creator Content">
            <div className="row">
                <div className="col-md-8 svg-wrapper text-center" style={{
                    backgroundImage: 'url(' + this.props.imageData + ')',
                }}>
                    <svg className="border border-dark svg-sheet" width={size} height={size}>
                        <g fill="transparent" stroke={pointColor} className="svg-path">
                            {elements.map((element, i) => {
                                return <path onClick={(e) => this.setActiveIndex(i)} className={this.state.editMode == false ? "path-selectable" : "path-regular"} strokeWidth={selectedIndex == i ? 3 : 1} key={"path-" + i} d={element.getPath()} />
                            })}
                        </g>
                        {editMode ?
                            <g>
                                <rect id="svg-screen" onClick={this.addPoint} fill="transparent" x={0} y={0} width={size} height={size} />
                                <Points pointColor={pointColor} element={element} removePoint={this.removePoint} />
                            </g> : null}
                    </svg>

                </div>
                <div className="col-md-4">
                    <form className="container-fluid border border-info" onSubmit={(e) => e.preventDefault()}>
                        <h4>Options</h4>
                        <FormGroup label="Element Count">
                            <AnchorWithIcon className="btn btn-dark btn-sm" iconClassName="fas fa-plus" onClick={this.addSvgElement} >
                                {this.state.svgElements.length}
                            </AnchorWithIcon>
                        </FormGroup>
                        <FormGroup label="Selected Index">
                            {this.state.selectedIndex}
                        </FormGroup>
                        <FormGroup label="Close Path">
                            <ToggleButton active={element.closePath}
                                onClick={this.updateClosePath} />
                        </FormGroup>
                        <FormGroup  >
                            <AnchorWithIcon onClick={this.removeSelectedElement} iconClassName="fas fa-times"
                                className="btn btn-danger btn-sm">Delete Path</AnchorWithIcon>
                        </FormGroup>
                    </form>
                </div>
            </div>
            <p />
            <form onSubmit={(e) => e.preventDefault()}>
                <FormGroup label="Edit Mode">
                    <ToggleButton active={this.state.editMode == true} onClick={this.setEditMode} />
                    <p><i>{this.state.editMode == false ? "Select path to edit" : null}</i></p>
                </FormGroup>
                <FormGroup label="Size">
                    <input autoComplete="off" type="number" value={size} onChange={this.handleInputChange}
                        name="size" className="form-control" />
                </FormGroup>
                <FormGroup label="Point Color">
                    <input autoComplete="off" type="color" value={pointColor} onChange={this.handleInputChange}
                        name="pointColor" className="form-control" />
                </FormGroup>
                <FormGroup >
                    <AnchorWithIcon onClick={this.showOutput} >Show Output</AnchorWithIcon>
                </FormGroup>
                <FormGroup label="Ouput">
                    <code>
                        {this.state.output}
                    </code>
                </FormGroup>
                
            </form>
        </Modal>
    }
}

const Points = (props: { pointColor: string, removePoint(index: number): any, element: SvgItem }) => {
    return (
        <g fill={props.pointColor} stroke="rgb(0,0,0)" strokeWidth={1} className="svg-points">
            {        props.element.points.map((p, i) => {
                return (
                    <circle strokeWidth={i == 0 ? 3 : 1} className="svg-point" onClick={(e) => {
                        e.preventDefault();
                        props.removePoint(i);
                    }} key={"point-" + "_" + i} cx={p.x} cy={p.y} r={3} />
                )
            })
            }
        </g>
    )
}

export default connect(
    mapCommonUserStateToProps
)(SvgCreator)
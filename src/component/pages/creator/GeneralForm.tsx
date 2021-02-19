import React, { ChangeEvent, Component, Fragment } from 'react'
import SvgItem from '../../../models/elements/SvgItem';
import { ElementType } from '../../../models/ElementType';
import FormGroup from './../../form/FormGroup';
import AnchorWithIcon from './../../navigation/AnchorWithIcon';
import ToggleButton from './../../navigation/ToggleButton'; 

interface Props {
    elements: SvgItem[],
    handleInputChange(e: ChangeEvent): any,
    setEditMode(val: boolean): any,
    addSvgElement(type: ElementType): any,
    editMode: boolean,
    selectedIndex: number,
    size: number,
    output?: string,
    showOutput(): any,
    pointColor: string,
}
export default class GeneralForm extends Component<Props, any> {

    add = (type: ElementType) => {
        this.props.addSvgElement(type);
    }
    render() {
        const elements = this.props.elements;
        return (
            <Fragment>
                <hr/>
                <h2 className="text-center">Setting</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <FormGroup label="Add Items">

                        <div className="btn-group">
                            <span className="btn btn-dark">  {elements.length}
                            </span>
                            <AnchorWithIcon onClick={(e) => { this.add(ElementType.PATH) }} iconClassName="fas fa-draw-polygon" />
                            <AnchorWithIcon onClick={(e) => { this.add(ElementType.CIRCLE) }} iconClassName="far fa-circle" />
                            <AnchorWithIcon onClick={(e) => { this.add(ElementType.RECT) }} iconClassName="far fa-square" />
                            <a className="btn btn-outline-secondary" onClick={(e) => { this.add(ElementType.CURVE) }}>
                                <img width="24" src="resources/assets/svg/curve.svg" />
                            </a>
                        </div>
                    </FormGroup>
                    <FormGroup label="Edit Mode">
                        <ToggleButton active={this.props.editMode == true} onClick={this.props.setEditMode} />
                        <p><i>{this.props.editMode == false ? "Select path to edit" : null}</i></p>
                    </FormGroup>
                    <FormGroup label="Select Element">
                        <select name="selectedIndex" value={this.props.selectedIndex} onChange={this.props.handleInputChange} className="form-control">
                            {array(elements.length).map((val, i) => {
                                return <option key={"select-index-" + i} value={val}>{val}</option>
                            })}
                        </select>
                    </FormGroup>
                    <FormGroup label="Size">
                        <input autoComplete="off" type="number" value={this.props.size} onChange={this.props.handleInputChange}
                            name="size" className="form-control" />
                    </FormGroup>
                    <FormGroup label="Point Color">
                        <input autoComplete="off" type="color" value={this.props.pointColor} onChange={this.props.handleInputChange}
                            name="pointColor" className="form-control" />
                    </FormGroup>
                    <FormGroup >
                        <AnchorWithIcon onClick={this.props.showOutput} >Show Output</AnchorWithIcon>
                    </FormGroup>
                    <FormGroup label="Ouput">
                        <code>{this.props.output}</code>
                    </FormGroup>
                </form>
            </Fragment>
        )
    }
}

const array = (max: number) => {
    const arr: Array<number> = [];
    for (let i = 0; i < max; i++) {
        arr.push(i);
    }
    return arr;
}
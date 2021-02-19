import React, { ChangeEvent, Component } from 'react' 
import SvgItem from '../../../models/elements/SvgItem';
import FormGroup from './../../form/FormGroup';
import AnchorWithIcon from './../../navigation/AnchorWithIcon';
import ToggleButton from './../../navigation/ToggleButton';

interface Props {
    elements: SvgItem[],
    handleInputChange(e: ChangeEvent): any,
    setEditMode(val: boolean): any,
    addSvgElement(): any,
    editMode: boolean,
    selectedIndex: number,
    size: number,
    output?: string,
    showOutput(): any,
    pointColor: string,
}
export default class GeneralForm extends Component<Props, any> {

    render(){
        const elements = this.props.elements;
        return (
            <form onSubmit={(e) => e.preventDefault()}>
                <FormGroup label="Element Count">
                    <AnchorWithIcon className="btn btn-dark btn-sm" iconClassName="fas fa-plus" onClick={this.props.addSvgElement} >
                        {elements.length}
                    </AnchorWithIcon>
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
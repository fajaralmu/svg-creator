import React, { ChangeEvent, Component, Fragment } from 'react'
import { ElementType } from '../../../constant/ElementType';
import SvgItem from '../../../models/elements/SvgItem';
import FormGroup from '../../form/FormGroup';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import AnchorWithSvg from '../../navigation/AnchorWithSvg';

interface Props {
    elements: SvgItem[],
    handleInputChange(e: ChangeEvent): any,
    selectedIndex: number,
    width: number, height: number,
    output?: string,
    showOutput(): any,
    pointColor: string,
}
export default class GeneralForm extends Component<Props, any> {


    render() {
        const elements = this.props.elements;
        return (
            <Fragment>
                <hr />
                <h2 className="text-center"><i className="fas fa-cog" style={{marginRight:'5px'}}/>Setting</h2>
                <form className="row" onSubmit={(e) => e.preventDefault()}>
                    <div className="col-md-12 text-center"  ><p /></div>
                    <FormGroup className="col-md-6" label="Select Element">
                        <select name="selectedIndex" value={this.props.selectedIndex} onChange={this.props.handleInputChange} className="form-control">
                            {array(elements.length).map((val, i) => {
                                return <option key={"select-index-" + i} value={val}>{val}</option>
                            })}
                        </select>
                    </FormGroup>
                    <FormGroup className="col-md-6" label="Size">
                        <div className="input-group">
                            <input className="form-control" disabled value="width" />
                            <input autoComplete="off" type="number" value={this.props.width} onChange={this.props.handleInputChange}
                                name="width" className="form-control" />
                            <input className="form-control" disabled value="height" />
                            <input autoComplete="off" type="number" value={this.props.height} onChange={this.props.handleInputChange}
                                name="height" className="form-control" />
                        </div>
                    </FormGroup>
                    <FormGroup className="col-md-6" label="Point Color">
                        <input autoComplete="off" type="color" value={this.props.pointColor} onChange={this.props.handleInputChange}
                            name="pointColor" className="form-control" />
                    </FormGroup>
                    <div className="col-md-12 text-center " style={{ marginBottom: '20px' }}>
                        <AnchorWithIcon onClick={this.props.showOutput} >Show Output</AnchorWithIcon>
                    </div>
                    <div className="col-md-12 ">
                        <div className="alert alert-info"><code>{this.props.output}</code></div>
                    </div>
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
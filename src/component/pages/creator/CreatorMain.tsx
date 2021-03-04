
import React, { ChangeEvent, Component } from 'react';
import { toBase64v2 } from '../../../utils/ComponentUtil';
import SimpleError from '../../alert/SimpleError';
import Modal from '../../container/Modal';
import BaseComponent from '../../BaseComponent';
import FormGroup from '../../form/FormGroup';
import SvgCreator from './SvgCreator';
import { BASE_TEMPLATE } from './baseTemplate';
import ToggleButton from '../../navigation/ToggleButton';
class State {
    imageData: string = BASE_TEMPLATE;
    blankBackground: boolean = false;
}
export default class CreatorMain extends BaseComponent {
    state: State = new State();
    constructor(props) {
        super(props, false);
    }
    onFileChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        toBase64v2(target).then((data) => {
            this.setState({ imageData: data });
        })
    }
    render = () => {
        const background:string = this.state.blankBackground? BASE_TEMPLATE : this.state.imageData;
        return (
            <section className="container-fluid" style={{ marginTop: '50px' }}>
                <h2>Generate Path SVG</h2>
                <div className="row">
                    <div className="col-md-6">
                        <InputImage 
                        blankBackground={this.state.blankBackground}
                        toggleBlankBackground={
                            (val)=>{
                                this.setState({blankBackground:val});
                            }
                        }
                        onChange={this.onFileChange} />
                    </div>
                    {/* <div className="col-md-6 text-center">
                        <Modal title="Preview">
                            {this.state.imageData ?
                                <img src={this.state.imageData} width="200" height="200" /> :
                                <SimpleError>No data</SimpleError>
                            }
                        </Modal>
                    </div> */}
                    <div className="col-12">
                          
                         <SvgCreator imageData={background} /> 
                    </div>
                </div>
            </section>
        )
    }
}

const InputImage = (props: { onChange(e: ChangeEvent): any, blankBackground:boolean, toggleBlankBackground(val:boolean):any }) => {

    return (
        <Modal title="Select Template Image">
            <form>
                <FormGroup label="Select" >
                    <input onChange={props.onChange} type="file" className="form-control" />
                </FormGroup>
                <FormGroup label="Blank Background">
                    <ToggleButton onClick={props.toggleBlankBackground}
                    active={props.blankBackground} />
                </FormGroup>
            </form>
        </Modal>
    )
}
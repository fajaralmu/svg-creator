
import React, { ChangeEvent, Component } from 'react';
import { toBase64v2 } from '../../../utils/ComponentUtil';
import SimpleError from '../../alert/SimpleError';
import Modal from '../../container/Modal';
import BaseComponent from './../../BaseComponent';
import FormGroup from './../../form/FormGroup';
import SvgCreator from './SvgCreator';
class State {
    imageData?: string;
}
export default class HomeMain extends BaseComponent {
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

        return (
            <section className="container-fluid" style={{ marginTop: '50px' }}>
                <h2>Generate SVG</h2>
                <div className="row">
                    <div className="col-md-6">
                        <InputImage onChange={this.onFileChange} />
                    </div>
                    <div className="col-md-6 text-center">
                        <Modal title="Preview">
                            {this.state.imageData ?
                                <img src={this.state.imageData} width="200" height="200" /> :
                                <SimpleError>No data</SimpleError>
                            }
                        </Modal>
                    </div>
                    <div className="col-12">
                         {this.state.imageData ?
                         <SvgCreator imageData={this.state.imageData} />:null}
                    </div>
                </div>
            </section>
        )
    }
}

const InputImage = (props: { onChange(e: ChangeEvent): any }) => {

    return (
        <Modal title="Select Image">
            <form>
                <FormGroup label="Select" >
                    <input onChange={props.onChange} type="file" className="form-control" />
                </FormGroup>
            </form>
        </Modal>
    )
}

import React, { ChangeEvent, Component } from 'react';
import { toBase64v2 } from '../../../utils/ComponentUtil';
import SimpleError from '../../alert/SimpleError';
import Modal from '../../container/Modal';
import BaseComponent from './../../BaseComponent';
import FormGroup from './../../form/FormGroup';
import SvgCreator from '../creator/SvgCreator';
import { BASE_TEMPLATE } from '../creator/baseTemplate';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
 
export default class HomeMain extends BaseComponent {
    
    constructor(props) {
        super(props, false);
    }
    
    render = () => {

        return (
            <section className="container-fluid text-center" style={{ marginTop: '50px' }}>
                <h1>Welcome</h1>
                <p/>
                <AnchorWithIcon className="btn btn-success btn-lg" iconClassName="fas fa-play" to={"/creator"} >Start</AnchorWithIcon>
            </section> 
        )
    }
}
 
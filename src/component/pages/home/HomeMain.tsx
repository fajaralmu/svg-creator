
import React, { ChangeEvent, Component } from 'react';
import './Home.css'
import BaseComponent from './../../BaseComponent';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';

export default class HomeMain extends BaseComponent {

    constructor(props) {
        super(props, false);
    }

    render = () => {

        return (
            <section className="container-fluid text-center" style={{ marginTop: '50px' }}>
                <Welcome />
                <p />
                <AnchorWithIcon className="btn btn-success btn-lg" iconClassName="fas fa-play" to={"/creator"} >Start</AnchorWithIcon>
            </section>
        )
    }
}

const Welcome = (props) => {
    return (
        <svg width="400" height="300"><g stroke="black" fill="transparent" stroke-width="4">
            <rect className="welcome-rect-svg" x={20} y={130} width={360} height={100} />
            <g className="welcome-svg" >
                <path stroke="#20f08d" d="M 30.66668701171875 156.60000610351562 L 30.66668701171875 156.60000610351562 L 40.66668701171875 202.60000610351562 L 58.66668701171875 157.60000610351562 L 72.66668701171875 203.60000610351562 L 85.66668701171875 158.60000610351562 " /><path stroke="#20f08d" d="M 99.66668701171875 158.60000610351562 L 99.66668701171875 158.60000610351562 L 97.66668701171875 202.60000610351562 L 129.66668701171875 200.60000610351562 " /><path stroke="#20f08d" d="M 97.66668701171875 177.60000610351562 L 97.66668701171875 177.60000610351562 L 125.66668701171875 178.60000610351562 " /><path stroke="#20f08d" d="M 97.66668701171875 157.60000610351562 L 97.66668701171875 157.60000610351562 L 127.66668701171875 160.60000610351562 " /><path stroke="#20f08d" d="M 142.66668701171875 157.60000610351562 L 142.66668701171875 157.60000610351562 L 143.66668701171875 202.60000610351562 L 167.66668701171875 203.60000610351562 " /><path stroke="#20f08d" d="M 214.66668701171875 189.60000610351562 L 214.66668701171875 189.60000610351562 L 193.66668701171875 205.60000610351562 L 175.66668701171875 176.60000610351562 L 190.66668701171875 157.60000610351562 L 211.66668701171875 163.60000610351562 " /><path stroke="#20f08d" d="M 249.66668701171875 160.60000610351562 L 249.66668701171875 160.60000610351562 L 268.66668701171875 180.60000610351562 L 248.66668701171875 200.60000610351562 L 228.66668701171875 180.60000610351562 Z" /><path stroke="#20f08d" d="M 281.66668701171875 202.60000610351562 L 281.66668701171875 202.60000610351562 L 282.66668701171875 156.60000610351562 L 301.66668701171875 199.60000610351562 L 318.66668701171875 155.60000610351562 L 322.66668701171875 203.60000610351562 " /><path stroke="#20f08d" d="M 365.66668701171875 161.60000610351562 L 365.66668701171875 161.60000610351562 L 335.66668701171875 159.60000610351562 L 337.66668701171875 202.60000610351562 L 368.66668701171875 200.60000610351562 " /><path stroke="#20f08d" d="M 337.66668701171875 179.60000610351562 L 337.66668701171875 179.60000610351562 L 366.66668701171875 180.60000610351562 " />
            </g>
        </g>
        </svg>
    )
}

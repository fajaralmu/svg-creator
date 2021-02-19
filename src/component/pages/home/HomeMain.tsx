
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
        <svg   width="400" height="250">
            <g fill="transparent" className="svg-path welcome-svg">
                <path stroke="#20f08d" stroke-width="4" d="M 24.899993896484375 163.53334045410156 L 24.899993896484375 163.53334045410156  L 36.899993896484375 209.53334045410156  L 54.899993896484375 161.53334045410156  L 67.89999389648438 208.53334045410156  L 82.89999389648438 163.53334045410156 "></path>
                <path stroke="#20f08d" stroke-width="4" d="M 125.89999389648438 167.53334045410156 L 125.89999389648438 167.53334045410156  L 96.89999389648438 167.53334045410156  L 96.89999389648438 209.53334045410156  L 128.89999389648438 209.53334045410156 "></path>
                <path stroke="#20f08d" stroke-width="4" d="M 96.89999389648438 186.53334045410156 L 96.89999389648438 186.53334045410156  L 124.89999389648438 186.53334045410156 "></path><path stroke="#20f08d" stroke-width="4" d="M 139.89999389648438 163.53334045410156 L 139.89999389648438 163.53334045410156  L 139.89999389648438 209.53334045410156  L 168.89999389648438 209.53334045410156 "></path>
                <path stroke="#20f08d" stroke-width="4" d="M 217.89999389648438 164.13333129882812 L 217.89999389648438 164.13333129882812  L 180.89999389648438 164.13333129882812  L 180.89999389648438 208.13333129882812  L 213.89999389648438 208.13333129882812 "></path><circle stroke="#20f08d" stroke-width="4" cx="248.89999389648438" cy="187.53334045410156" r="23.40939982143925"></circle>
                <path stroke="#20f08d" stroke-width="4" d="M 281.8999938964844 211.53334045410156 L 281.8999938964844 211.53334045410156  L 281.8999938964844 163.53334045410156  L 305.8999938964844 206.53334045410156  L 325.8999938964844 163.53334045410156  L 325.8999938964844 213.53334045410156 "></path><path stroke="#20f08d" stroke-width="4" d="M 372.8999938964844 166.53334045410156 L 372.8999938964844 166.53334045410156  L 340.8999938964844 166.53334045410156  L 340.8999938964844 210.53334045410156  L 372.8999938964844 210.53334045410156 "></path>
                <path stroke="#20f08d" stroke-width="4" d="M 369.8999938964844 187.53334045410156 L 369.8999938964844 187.53334045410156  L 340.8999938964844 187.53334045410156 "></path>
                <rect className="welcome-rect-svg" stroke="#000"   stroke-width="4" x="9.899993896484375" y="150.8333282470703" width="376" height="69"></rect></g><g><rect focusable="true" id="svg-screen" fill="transparent" x="0" y="0" width="400" height="400"></rect><g fill="#cccccc" stroke="rgb(0,0,0)" stroke-width="1" className="svg-points">
                </g>
            </g>
        </svg>
    )
}


import React from 'react';
import './Home.css'
import BaseComponent from './../../BaseComponent';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import { mapCommonUserStateToProps } from './../../../constant/stores';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class HomeMain extends BaseComponent {

    constructor(props) {
        super(props, false);
    }

    render = () => {

        return (
            <section className="container-fluid text-center" style={{ marginTop: '50px' }}>
                <Welcome />
                <p />
                <AnchorWithIcon className="btn btn-success btn-lg" iconClassName="fas fa-play" to={"/creator"} >Start</AnchorWithIcon>
                <span style={{ margin: 3 }} />
                <a href="https://github.com/fajaralmu/svg-creator" target="_blank" className="btn btn-dark btn-lg"  >
                    <span style={{ marginRight: '5px' }}><i className="fas fa-code" /></span>
                   Source
                </a>
            </section>
        )
    }
}

const Welcome = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
            <g className="welcome-svg-rect" stroke="black" fill="transparent" stroke-width="2">
                <rect  x="28.25" y="19.26666259765625" width="339" height="120" /></g>
            <g className="welcome-svg" stroke="black" fill="transparent" stroke-width="2">
                <path stroke="#20f08d" d="M 142.8333282470703 39.93333435058594 Q 103.83332824707031 24.933334350585938 92.83332824707031 53.93333435058594" /><path stroke="#20f08d" d="M 92.83332824707031 53.93333435058594 Q 91.83332824707031 77.93333435058594 126.83332824707031 88.93333435058594" />
                <path stroke="#20f08d" d="M 126.83332824707031 88.93333435058594 Q 132.8333282470703 100 119.83332824707031 103" />
                <path stroke="#20f08d" d="M 119.83332824707031 103 Q 117 106 95.25 98.66667175292969" />
                <path stroke="#20f08d" d="M 92.25 112.66667175292969 Q 133.25 130.6666717529297 147.25 98.66667175292969" />
                <path stroke="#20f08d" d="M 147.25 98.66667175292969 Q 149.25 80.66667175292969 127.25 69.66667175292969" />
                <path stroke="#20f08d" d="M 127.25 69.66667175292969 Q 108.25 62.66667175292969 115.25 52.66667175292969" /><path stroke="#20f08d" d="M 115.25 52.66667175292969 Q 126.25 46.66667175292969 139.25 54.66667175292969" />
                <path stroke="#20f08d" d="M 139.25 54.66667175292969 L 139.25 54.66667175292969 L 142.8333282470703 39.93333435058594 " />
                <path stroke="#20f08d" d="M 299.25 38.66667175292969 Q 245.25 26.666671752929688 233.25 67.66667175292969" />
                <path stroke="#20f08d" d="M 233.25 67.66667175292969 Q 226.25 105.66667175292969 263.25 117.66667175292969" />
                <path stroke="#20f08d" d="M 263.25 117.66667175292969 Q 286.25 120.66667175292969 303.25 112.66667175292969" /><path stroke="#20f08d" d="M 303.25 112.66667175292969 L 303.25 112.66667175292969 L 303.25 70.66667175292969 L 271.25 70.66667175292969 L 271.25 84.66667175292969 L 285.25 84.66667175292969 L 285.25 100.66667175292969 " />
                <path stroke="#20f08d" d="M 285.25 100.66667175292969 Q 263.25 106.66667175292969 252.25 88.66667175292969" /><path stroke="#20f08d" d="M 252.25 88.66667175292969 Q 245.25 61.66667175292969 267.25 52.66667175292969" /><path stroke="#20f08d" d="M 267.25 52.66667175292969 Q 281.25 48.66667175292969 294.25 54.66667175292969" />
                <path stroke="#20f08d" d="M 294.25 54.66667175292969 L 294.25 54.66667175292969 L 299.25 38.66667175292969 " />
                <path id="V" stroke="#20f08d" d="M 92.25 112.66667175292969 L 92.25 112.66667175292969 L 95.25 98.66667175292969 " />
            </g>
            <g className="welcome-svg-v" stroke="black" fill="transparent" stroke-width="4">

                <path   d="M 152.25 36.66667175292969 L 152.25 36.66667175292969 L 177.25 115.66667175292969 L 199.25 115.66667175292969 L 227.25 37.66667175292969 L 207.25 37.66667175292969 L 189.25 94.66667175292969 L 173.25 36.66667175292969 Z" />

            </g>
        </svg>
    )
}

export default withRouter(connect(
    mapCommonUserStateToProps
)(HomeMain))

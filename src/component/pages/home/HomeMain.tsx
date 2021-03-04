
import React, { Fragment } from 'react';
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
        <Fragment>
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="150">
                <g className="welcome-svg-rect" stroke="#343a40" fill="transparent" stroke-width="4">
                    <rect x="28.25" y="19.26666259765625" width="339" height="120" /></g>
                <g className="welcome-svg" stroke="black" fill="transparent" stroke-width="4">
                    <path stroke="#28a745" d="M 142.8333282470703 39.93333435058594 Q 103.83332824707031 24.933334350585938 92.83332824707031 53.93333435058594" /><path stroke="#28a745" d="M 92.83332824707031 53.93333435058594 Q 91.83332824707031 77.93333435058594 126.83332824707031 88.93333435058594" />
                    <path stroke="#28a745" d="M 126.83332824707031 88.93333435058594 Q 132.8333282470703 100 119.83332824707031 103" />
                    <path stroke="#28a745" d="M 119.83332824707031 103 Q 117 106 95.25 98.66667175292969" />
                    <path stroke="#28a745" d="M 92.25 112.66667175292969 Q 133.25 130.6666717529297 147.25 98.66667175292969" />
                    <path stroke="#28a745" d="M 147.25 98.66667175292969 Q 149.25 80.66667175292969 127.25 69.66667175292969" />
                    <path stroke="#28a745" d="M 127.25 69.66667175292969 Q 108.25 62.66667175292969 115.25 52.66667175292969" /><path stroke="#28a745" d="M 115.25 52.66667175292969 Q 126.25 46.66667175292969 139.25 54.66667175292969" />
                    <path stroke="#28a745" d="M 139.25 54.66667175292969 L 139.25 54.66667175292969 L 142.8333282470703 39.93333435058594 " />
                    <path stroke="#28a745" d="M 299.25 38.66667175292969 Q 245.25 26.666671752929688 233.25 67.66667175292969" />
                    <path stroke="#28a745" d="M 233.25 67.66667175292969 Q 226.25 105.66667175292969 263.25 117.66667175292969" />
                    <path stroke="#28a745" d="M 263.25 117.66667175292969 Q 286.25 120.66667175292969 303.25 112.66667175292969" /><path stroke="#28a745" d="M 303.25 112.66667175292969 L 303.25 112.66667175292969 L 303.25 70.66667175292969 L 271.25 70.66667175292969 L 271.25 84.66667175292969 L 285.25 84.66667175292969 L 285.25 100.66667175292969 " />
                    <path stroke="#28a745" d="M 285.25 100.66667175292969 Q 263.25 106.66667175292969 252.25 88.66667175292969" /><path stroke="#28a745" d="M 252.25 88.66667175292969 Q 245.25 61.66667175292969 267.25 52.66667175292969" /><path stroke="#28a745" d="M 267.25 52.66667175292969 Q 281.25 48.66667175292969 294.25 54.66667175292969" />
                    <path stroke="#28a745" d="M 294.25 54.66667175292969 L 294.25 54.66667175292969 L 299.25 38.66667175292969 " />
                    <path id="V" stroke="#28a745" d="M 92.25 112.66667175292969 L 92.25 112.66667175292969 L 95.25 98.66667175292969 " />
                </g>
                <g className="welcome-svg-v" stroke="#343a40" fill="transparent" stroke-width="4">
                    <path d="M 152.25 36.66667175292969 L 152.25 36.66667175292969 L 177.25 115.66667175292969 L 199.25 115.66667175292969 L 227.25 37.66667175292969 L 207.25 37.66667175292969 L 189.25 94.66667175292969 L 173.25 36.66667175292969 Z" />
                </g>
            </svg>
            <p />
            <PenSvg />
        </Fragment>
    )
}
  
const KIIS = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><g className="welcome-svg " stroke="black" fill="transparent" stroke-width="2"> 
    <path fill="none" stroke-width="2" stroke="#20f08d" d="" /><path fill="none" stroke-width="5" stroke="#000000" d="M 159 276 Q 136 288 122 314Q 118 323 155 321Q 218 322 296 310Q 322 311 338 342Q 333 356 317 367Q 140 410 92 383Q 82 372 77 337"/><path fill="none" stroke-width="5" stroke="#000000" d="M 78 251 Q 82 293 84 330Q 83 375 149 371Q 254 374 324 345Q 312 331 287 334Q 202 350 117 345Q 105 339 112 319Q 120 282 159 247"/><path fill="none" stroke-width="5" stroke="#000000" d="M 159 276 L 159 276 L 159 247 " />
    <path fill="none" stroke-width="5" stroke="#000000" d="M 78 251 L 78 251 L 67 263 L 77 337 " />
    <path className="icon-svg-long" fill="#ffffff" stroke-width="5" stroke="#008000" d="M 93 286 Q 215 159 313 182Q 378 209 319 302Q 245 418 105 445Q 4 453 62 325Q 9 438 114 434Q 253 407 324 270Q 362 186 264 185Q 182 205 128 256 Z "/>
    <circle className="welcome-svg-slow" fill="#ffffff" stroke-width="5" stroke="#ff0080" cx="253" cy="186" r="16.401219466856727" /></g></svg>
}
const PenSvg = (props) => { 
    // return <KIIS/   return <Icon/>
    
    return (
        <svg  xmlns="http://www.w3.org/2000/svg" width="400" height="100">
            <g id="pen-body" className="welcome-svg "stroke="#343a40" fill="transparent" stroke-width="2">

                <path stroke-width="4" d="M 372.25 47.26666259765625 L 372.25 47.26666259765625 L 73.41667175292969 47.26666259765625 L 103.41667175292969 33.76666259765625 L 108.41667175292969 40.76666259765625 L 108.41667175292969 52.76666259765625 L 102.41667175292969 60.76666259765625 L 79.41667175292969 51.76666259765625 " />
                <path stroke="#28a745" d="M 177.4166717529297 30.76666259765625 L 177.4166717529297 30.76666259765625 L 177.4166717529297 61.76666259765625 L 363.8999938964844 58.46665954589844 L 372.25 47.26666259765625 L 364.4166717529297 35.76666259765625 Z" /><path stroke="#28a745" d="M 177.4166717529297 30.76666259765625 Q 149.4166717529297 36.76666259765625 128.4166717529297 29.76666259765625" />
                <path stroke="#28a745" d="M 177.4166717529297 61.76666259765625 Q 149.4166717529297 55.76666259765625 127.41667175292969 62.76666259765625" />
                <path stroke="#28a745" d="M 128.4166717529297 29.76666259765625 L 128.4166717529297 29.76666259765625 L 114.41667175292969 36.76666259765625 L 114.41667175292969 54.76666259765625 L 127.41667175292969 62.76666259765625 Z" />
            </g>
            <g id="line" className="welcome-svg-slow " stroke="#343a40" fill="transparent" stroke-width="4">
                <path d="M 14.66668701171875 53.600006103515625 Q 7.66668701171875 17.600006103515625 40.66668701171875 18.600006103515625" />
                <path d="M 40.66668701171875 18.600006103515625 Q 53 20 49.66668701171875 47.600006103515625" />
                <path d="M 49.66668701171875 47.600006103515625 Q 47.66668701171875 64.60000610351562 67.66668701171875 62.600006103515625" />
                <path d="M 67.66668701171875 62.600006103515625 Q 81.66668701171875 64.60000610351562 73.41667175292969 47.26666259765625" />

            </g>
        </svg>
    )
}
export default withRouter(connect(
    mapCommonUserStateToProps
)(HomeMain))

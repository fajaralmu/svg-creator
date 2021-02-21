
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
 
const Icon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><g   className="welcome-svg "stroke="black" fill="transparent" stroke-width="2"> <path stroke-width="2" stroke="#20f08d" d="" /><path stroke-width="5" stroke="#ff0080" d="M 238 3 Q 262 40 235 69Q 214 91 194 111Q 158 140 172 175Q 185 196 201 219Q 168 193 152 163Q 135 137 169 111Q 200 89 220 68Q 237 50 241 35 Z "/><path stroke-width="5" stroke="#ff0080" d="M 286 83 Q 252 99 233 122Q 211 146 240 179Q 251 205 212 232Q 236 199 214 185Q 187 152 209 126Q 230 106 258 92 Z "/><path stroke-width="5" stroke="#004000" d="M 285 234 Q 162 250 117 240Q 105 238 126 228Q 138 224 155 219Q 99 224 85 240Q 83 249 132 254Q 194 258 263 244 Z "/><path stroke-width="5" stroke="#004000" d="M 251 274 Q 185 286 132 275Q 132 270 138 264Q 96 280 133 290Q 192 302 266 283 Z "/><path stroke-width="5" stroke="#004000" d="M 240 316 Q 192 333 143 316Q 142 311 147 309Q 119 316 133 330Q 185 351 260 328 Z "/><path stroke-width="5" stroke="#004000" d="M 318 339 Q 335 362 213 367Q 135 369 77 354Q 82 340 115 337Q 22 352 69 369Q 192 394 314 362Q 325 356 326 347 Z "/><path stroke-width="5" stroke="#004000" d="M 339 365 Q 316 385 281 388Q 258 393 215 393Q 201 394 178 393Q 142 394 105 385"/><path stroke-width="5" stroke="#004000" d="M 289 223 Q 333 215 327 250Q 324 272 283 293Q 335 276 344 243Q 339 220 310 215 Z "/></g></svg>
}

const PenSvg = (props) => { 
    // return <Icon/>
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

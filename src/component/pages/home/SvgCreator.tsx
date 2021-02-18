import React from 'react'
import Modal from '../../container/Modal';
import FormGroup from '../../form/FormGroup';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import BaseComponent from './../../BaseComponent';
import './SvgCreator.css'
import { mapCommonUserStateToProps } from './../../../constant/stores';
import { connect } from 'react-redux';
class SvgPoint {
    x: number = 0; y: number = 0;
}
class SvgElement {
    points: SvgPoint[] = [];
}
class State {
    svgElement: SvgElement = new SvgElement();
    pointColor: string = "#ffffff"
}
const size: number = 400;
class SvgCreator extends BaseComponent {


    state: State = new State();
    constructor(props) {
        super(props, false);
    }

    addPoint = (e: React.MouseEvent<SVGSVGElement>): void => {
        const target = e.target as SVGSVGElement;
        if (!target) return;
        if (target.tagName !== 'svg') {
            return;
        }
        const point: SvgPoint = this.getPoint(e, target);
        // console.debug("addPoint x: ", point.x, "y: ", point.y);
        this.addPointToCurrentElement(point);
    }
    addPointToCurrentElement = (p: SvgPoint) => {
        const element = this.state.svgElement;
        element.points.push(p);
        this.setState({ svgElement: element });

    }
    getPoint = (e: React.MouseEvent<SVGSVGElement>, target: SVGSVGElement): SvgPoint => {
        var dim = target.getBoundingClientRect();
        const p = new SvgPoint();

        p.x = e.clientX - dim.left;
        p.y = e.clientY - dim.top;;
        return p;
    }
    removePoint = (index: number) => {
        console.debug("removePoint : ", index);
        const element = this.state.svgElement;
        for (let i = 0; i < element.points.length; i++) {
            if (i == index) {
                element.points.splice(i, 1);
                break;
            }

        }
        this.setState({ svgElement: element });
    }
    clearPoints = (e) => {
        const element = this.state.svgElement;
        this.showConfirmationDanger("Clear points?")
            .then((ok) => {
                if (!ok) return;
                element.points = [];
                this.setState({ svgElement: element });
            })
    }
    render = () => {
        const bgImage = this.props.imageData;
        const element = this.state.svgElement;
        const pointColor = this.state.pointColor;
        return <Modal title="Svg Creator Content">
            <div className="svg-wrapper text-center" style={{
                backgroundImage: 'url(' + bgImage + ')',

            }}>
                <svg onClick={this.addPoint} className="border border-dark" width={size} height={size}>
                    <g fill={pointColor} stroke={pointColor} strokeWidth={1} className="svg_points">
                        {element.points.map((p, i) => {

                            return (
                                <circle className="svg-point" onClick={(e) => {
                                    e.preventDefault();
                                    this.removePoint(i);
                                }} key={"point-" + i} cx={p.x} cy={p.y} r={3} />
                            )
                        })}
                    </g>

                </svg>

            </div>
            <p />
            <form onSubmit={(e)=>e.preventDefault()}>
                <FormGroup label="Point Color">
                    <input type="color" value={pointColor} onChange={this.handleInputChange}
                        name="pointColor" className="form-control" />
                </FormGroup>
                <FormGroup label="Option">
                    <AnchorWithIcon className="btn btn-danger" iconClassName="fas fa-times" onClick={this.clearPoints} children="Clear Points" />
                </FormGroup>
            </form>
        </Modal>
    }
}

export default connect(
    mapCommonUserStateToProps
)(SvgCreator)
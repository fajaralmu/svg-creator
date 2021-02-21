
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
interface Props {
    onClick?:(e?:any)=>any; 
    show?:boolean,
    className?:string,
    style?:any,
    iconClassName?:string,
    to?:string,
    attributes?:any
}
export default class AnchorWithIcon extends Component<Props, any>
{
    constructor(props: any) {
        super(props);
    }
    render() {
        if (this.props.show == false) return null;
        const btnClassName = this.props.className ?? "btn btn-outline-secondary";
        if (this.props.to) {
            return <Link {...this.props.attributes} to={this.props.to} style={this.props.style} onClick={this.props.onClick} className={btnClassName} >
                {this.props.iconClassName ?
                    <span style={{ marginRight: this.props.children?'5px':'0px' }}><i className={this.props.iconClassName} /></span>
                    :
                    null}
                {this.props.children}
            </Link>
        }
        return (
            <a {...this.props.attributes} tyle={this.props.style} onClick={this.props.onClick} className={btnClassName} >
                {this.props.iconClassName ?
                    <span style={{ marginRight: this.props.children?'5px':'0px' }}><i className={this.props.iconClassName} /></span>
                    :
                    null}
                {this.props.children}
            </a>
        )
    }
}
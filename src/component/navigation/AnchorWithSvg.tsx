
import React, { Component } from 'react'; 
interface Props {
    onClick(e:any):any,
    icon:string,
    show?:boolean,
    className?:string,
    style?:any
}
export default class AnchorWithSvg extends Component<Props, any>
{
    constructor(props: any) {
        super(props);
    }
    render() {
        if (this.props.show == false) return null;
        const btnClassName = this.props.className ?? "btn btn-outline-secondary";
        
        return (
            <a   style={this.props.style} onClick={this.props.onClick} className={btnClassName} >
                <img style={{ marginRight: this.props.children?'5px':'0px' }} width="24" src={"resources/assets/svg/"+this.props.icon+".svg"} />
                {this.props.children}
            </a>
        )
    }
}


import React, { Component, Fragment } from 'react';
import BaseComponent from './../BaseComponent';
import { mapCommonUserStateToProps } from './../../constant/stores';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'; 
import BaseMainMenus from './BaseMainMenus';
import Menu from '../../models/common/Menu'; 
import HomeMain from './../pages/home/HomeMain';

class ApplicationContent extends BaseComponent {

    ref: React.RefObject<BaseMainMenus> = React.createRef();
    constructor(props: any) {
        super(props, false);
    }
    setSidebarMenus = (menus: Menu[]) => {
        this.props.setSidebarMenus(menus);
    }
    render() {
        return (
            <Fragment>
                <Switch>
                     
                    {/* -------- home -------- */}
                    <Route exact path="/home" render={
                        (props: any) =>
                            <HomeMain />
                    } />
                    <Route exact path="/" render={
                        (props: any) =>
                            <HomeMain />
                    } />
                     </Switch>
            </Fragment>
        )
    } 

} 


const mapDispatchToProps = (dispatch: Function) => ({})


export default withRouter(connect(
    mapCommonUserStateToProps,
    mapDispatchToProps
)(ApplicationContent))
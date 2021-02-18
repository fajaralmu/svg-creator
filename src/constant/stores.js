
export const mapCommonUserStateToProps = (state) => {
    return {
        applicationProfile: state.userState.applicationProfile, 
        loggedUser: state.userState.loggedUser,
        loginStatus: state.userState.loginStatus,
        requestId: state.userState.requestId, 
        services: state.servicesState.services,

        //app
        mainApp: state.appState.mainApp,
        inventoryData: state.appState.inventoryData,
        inventoryConfig: state.appState.inventoryConfig,
    }
}
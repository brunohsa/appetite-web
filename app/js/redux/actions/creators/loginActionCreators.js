import actionTypes from '../actionTypes';

let loginActions = {

    loginRealizado() {
        return {
            type: actionTypes.LOGIN_REALIZADO
        }
    },
    
    fazerLogout() {
        return {
            type: actionTypes.FAZER_LOGOUT
        }
    },

    logoutRealizado() {
        return {
            type: actionTypes.LOGOUT_REALIZADO
        }
    },

    startLoaderTelaLogin() {
        return {
            type: actionTypes.LOADER_TELA_LOGIN,
            startLoaderTelaLogin: true
        }
    },

    stopLoaderTelaLogin() {
        return {
            type: actionTypes.LOADER_TELA_LOGIN,
            startLoaderTelaLogin: false
        }
    },
}

export default loginActions;
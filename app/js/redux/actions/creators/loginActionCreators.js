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
    }
}

export default loginActions;
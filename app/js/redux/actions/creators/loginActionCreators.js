import actionTypes from '../actionTypes';

let loginActions = {

    loginRealizado() {
        return {
            type: actionTypes.LOGIN_REALIZADO, 
            login: { loginRealizado: true }
        }
    }
}

export default loginActions;
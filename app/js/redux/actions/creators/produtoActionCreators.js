import actionTypes from '../actionTypes';

let loginActions = {

    doLogin(login) {
        return {
            type: actionTypes.DO_LOGIN, 
            login
        }
    }
}

export default loginActions;
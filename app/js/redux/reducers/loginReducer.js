import actionTypes from '../actions/actionTypes';

export function loginReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.LOGIN_REALIZADO:
            return {
                ...state,
                loginRealizado: true,
                fazerLogout: false
            }
        case actionTypes.FAZER_LOGOUT:
            return {
                ...state,
                fazerLogout: true,
                loginRealizado: false
            }
        case actionTypes.LOGOUT_REALIZADO:
            return {
                ...state,
                fazerLogout: false
            }
        default:
            return state;
    }
}
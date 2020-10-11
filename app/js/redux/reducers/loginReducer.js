import actionTypes from '../actions/actionTypes';

export function loginReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.LOGIN_REALIZADO:
            return action.login
        default:
            return state;
    }
}
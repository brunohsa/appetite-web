import actionTypes from '../actions/actionTypes';

export function pedidoReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.FAZER_LOGIN:
            return action.login;
        default:
            return state;
    }
}
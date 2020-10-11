import actionTypes from '../actions/actionTypes';

export function erroReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.APRESENTAR_ERROS:
            return action.erro;
        default:
            return state;
    }
}
import actionTypes from '../actions/actionTypes';

export function carrinhoReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.RESUMO_PEDIDOS_ENCONTRADOS:
            return { 
                ...state, 
                pedidos: action.pedidos
            };
        default:
            return state;
    }
}
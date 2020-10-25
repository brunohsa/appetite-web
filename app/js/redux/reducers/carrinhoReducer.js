import actionTypes from '../actions/actionTypes';

export function carrinhoReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.RESUMO_PEDIDOS_ENCONTRADOS:
            return { 
                ...state, 
                pedidos: action.pedidos
            };
        case actionTypes.PEDIDOS_PENDENTE_PREPARACAO_ENCONTRADOS:
            return { 
                ...state, 
                pedidosPendentePreparacao: action.pedidos
            };
        case actionTypes.PEDIDOS_EM_PREPARO_ENCONTRADOS:
            return { 
                ...state, 
                pedidosEmPreparo: action.pedidos
            };
        case actionTypes.PEDIDOS_CONCLUIDOS_ENCONTRADOS:
            return { 
                ...state, 
                pedidosConcluidos: action.pedidos
            };
        default:
            return state;
    }
}
import actionTypes from '../actions/actionTypes';

export function carrinhoReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.RESUMO_PEDIDOS_ENCONTRADOS:
            return { 
                ...state, 
                pedidos: action.pedidos,
                buscandoResumoDePedidos: false
            };
        case actionTypes.LOADER_RESUMO_PEDIDOS:
            return { 
                ...state,
                buscandoResumoDePedidos: action.buscandoResumoDePedidos
            };
        case actionTypes.PEDIDOS_PENDENTE_PREPARACAO_ENCONTRADOS:
            return { 
                ...state, 
                pedidosPendentePreparacao: action.pedidos,
                buscandoPedidosPendentePreparacao: false
            };
        case actionTypes.LOADER_PEDIDOS_PENDENTE_PREPARACAO:
            return { 
                ...state,
                buscandoPedidosPendentePreparacao: action.buscandoPedidosPendentePreparacao
            };
        case actionTypes.PEDIDOS_EM_PREPARO_ENCONTRADOS:
            return { 
                ...state, 
                pedidosEmPreparo: action.pedidos,
                buscandoPedidosEmPreparo: false
            };
        case actionTypes.LOADER_PEDIDOS_EM_PREPARO:
            return { 
                ...state,
                buscandoPedidosEmPreparo: action.buscandoPedidosEmPreparo
            };
        case actionTypes.PEDIDOS_CONCLUIDOS_ENCONTRADOS:
            return { 
                ...state, 
                pedidosConcluidos: action.pedidos,
                buscandoPedidosConcluidos: false
            };
        case actionTypes.LOADER_PEDIDOS_CONCLUIDOS:
            return { 
                ...state,
                buscandoPedidosConcluidos: action.buscandoPedidosConcluidos
            };
        case actionTypes.PEDIDOS_CANCELADOS_ENCONTRADOS:
            return { 
                ...state, 
                pedidosCancelados: action.pedidos,
                buscandoPedidosCancelados: false
            };
        case actionTypes.LOADER_PEDIDOS_CANCELADOS:
            return { 
                ...state,
                buscandoPedidosCancelados: action.buscandoPedidosCancelados
            };
        default:
            return state;
    }
}
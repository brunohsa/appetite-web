import actionTypes from '../actionTypes';

let carrinhoActions = {

    resumoPedidosEncontrados(pedidos) {
        return {
            type: actionTypes.RESUMO_PEDIDOS_ENCONTRADOS, 
            pedidos: pedidos
        }
    },

    pedidosPendentePreparacao(pedidos) {
        return {
            type: actionTypes.PEDIDOS_PENDENTE_PREPARACAO_ENCONTRADOS, 
            pedidos: pedidos
        }
    },

    pedidosEmPreparo(pedidos) {
        return {
            type: actionTypes.PEDIDOS_EM_PREPARO_ENCONTRADOS, 
            pedidos: pedidos
        }
    },

    pedidosConcluidos(pedidos) {
        return {
            type: actionTypes.PEDIDOS_CONCLUIDOS_ENCONTRADOS, 
            pedidos: pedidos
        }
    }
}

export default carrinhoActions;
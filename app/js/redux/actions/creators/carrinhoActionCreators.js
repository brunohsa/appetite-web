import actionTypes from '../actionTypes';

let carrinhoActions = {

    resumoPedidosEncontrados(pedidos) {
        return {
            type: actionTypes.RESUMO_PEDIDOS_ENCONTRADOS, 
            pedidos: pedidos
        }
    },

    startLoaderResumoPedidos() {
        return {
            type: actionTypes.LOADER_RESUMO_PEDIDOS, 
            buscandoResumoDePedidos: true
        }
    },

    stopLoaderResumoPedidos() {
        return {
            type: actionTypes.LOADER_RESUMO_PEDIDOS, 
            buscandoResumoDePedidos: false
        }
    },

    pedidosPendentePreparacao(pedidos) {
        return {
            type: actionTypes.PEDIDOS_PENDENTE_PREPARACAO_ENCONTRADOS, 
            pedidos: pedidos
        }
    },

    startLoaderPedidosPendentePreparacao() {
        return {
            type: actionTypes.LOADER_PEDIDOS_PENDENTE_PREPARACAO, 
            buscandoPedidosPendentePreparacao: true
        }
    },

    stopLoaderPedidosPendentePreparacao() {
        return {
            type: actionTypes.LOADER_PEDIDOS_PENDENTE_PREPARACAO, 
            buscandoPedidosPendentePreparacao: false
        }
    },

    pedidosEmPreparo(pedidos) {
        return {
            type: actionTypes.PEDIDOS_EM_PREPARO_ENCONTRADOS, 
            pedidos: pedidos
        }
    },

    startLoaderPedidosEmPreparacao() {
        return {
            type: actionTypes.LOADER_PEDIDOS_EM_PREPARO, 
            buscandoPedidosEmPreparo: true
        }
    },

    stopLoaderPedidosEmPreparacao() {
        return {
            type: actionTypes.LOADER_PEDIDOS_EM_PREPARO, 
            buscandoPedidosEmPreparo: false
        }
    },

    pedidosConcluidos(pedidos) {
        return {
            type: actionTypes.PEDIDOS_CONCLUIDOS_ENCONTRADOS, 
            pedidos: pedidos
        }
    },
    startLoaderPedidosConcluidos() {
        return {
            type: actionTypes.LOADER_PEDIDOS_CONCLUIDOS, 
            buscandoPedidosConcluidos: true
        }
    },
    stopLoaderPedidosConcluidos() {
        return {
            type: actionTypes.LOADER_PEDIDOS_CONCLUIDOS, 
            buscandoPedidosConcluidos: false
        }
    },
    pedidosCancelados(pedidos) {
        return {
            type: actionTypes.PEDIDOS_CANCELADOS_ENCONTRADOS, 
            pedidos: pedidos
        }
    },
    startLoaderPedidosCancelados() {
        return {
            type: actionTypes.LOADER_PEDIDOS_CANCELADOS, 
            buscandoPedidosCancelados: true
        }
    },
    stopLoaderPedidosCancelados() {
        return {
            type: actionTypes.LOADER_PEDIDOS_CANCELADOS, 
            buscandoPedidosCancelados: false
        }
    },
}

export default carrinhoActions;
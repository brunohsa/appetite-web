import actionTypes from '../actionTypes';

let carrinhoActions = {

    resumoPedidosEncontrados(pedidos) {
        return {
            type: actionTypes.RESUMO_PEDIDOS_ENCONTRADOS, 
            pedidos: pedidos
        }
    }
}

export default carrinhoActions;
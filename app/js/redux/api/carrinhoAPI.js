import carrinhoActions from '../actions/creators/carrinhoActionCreators'
import mensagemActions from '../actions/creators/mensagemActionCreators'

import requisicoesAjax from './requisicoesAjax'
import configs from '../configuracoes';

import DateUtils from '../../util/DateUtils'

const statusPedidos = {
    PENDENTE_PREPARACAO: 'PENDENTE_PREPARACAO',
    PREPARANDO: 'PREPARANDO',
    CONCLUIDO: 'CONCLUIDO',
    CANCELADO: 'CANCELADO'
}

const PEDIDOS_FORNECEDORES_BASE_URL = 'v1/fornecedores/pedidos'

let carrinhoAPI = {

    buscarUltimosPedidos() {
        let dataAgoraFormatada = DateUtils.getDataAgoraFormatada()
       
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.resumoPedidosEncontrados(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(carrinhoActions.stopLoaderResumoPedidos());
        }

        let statusParametros = `status=${statusPedidos.PENDENTE_PREPARACAO}&status=${statusPedidos.PREPARANDO}&status=${statusPedidos.CONCLUIDO}`
        let filtroData = `&de=${dataAgoraFormatada}&ate=${dataAgoraFormatada}`
        let limite = `&limite=${10}`

        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?${statusParametros}${filtroData}${limite}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    buscarPedidosPendentePreparacao() {
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.pedidosPendentePreparacao(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(carrinhoActions.stopLoaderPedidosPendentePreparacao());
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?status=${statusPedidos.PENDENTE_PREPARACAO}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    buscarPedidosEmPreparo() {
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.pedidosEmPreparo(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(carrinhoActions.stopLoaderPedidosEmPreparacao());
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?status=${statusPedidos.PREPARANDO}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    buscarPedidosConcluidos() {
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.pedidosConcluidos(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(carrinhoActions.stopLoaderPedidosConcluidos());
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?status=${statusPedidos.CONCLUIDO}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    buscarPedidosCancelados() {
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.pedidosCancelados(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(carrinhoActions.stopLoaderPedidosCancelados());
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?status=${statusPedidos.CANCELADO}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    alterarStatusPedido(id, novoStatus) {
        let acao = (response, dispatch) => {
            dispatch(mensagemActions.apresentarMensagemSucesso('O status do pedido, foi alterado com sucesso.'));
            return response
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}/${id}/status/${novoStatus}/alterar`
        return requisicoesAjax.put(getToken(), null, url, acao)
    }
}

function getToken() {
    return localStorage.getItem('token')
}

export default carrinhoAPI;
import carrinhoActions from '../actions/creators/carrinhoActionCreators'
import requisicoesAjax from './requisicoesAjax'
import configs from '../configuracoes';

import DateUtils from '../../util/DateUtils'

const statusPedidos = {
    PENDENTE_PREPARACAO: 'PENDENTE_PREPARACAO',
    PREPARANDO: 'PREPARANDO',
    CONCLUIDO: 'CONCLUIDO'
}

const PEDIDOS_FORNECEDORES_BASE_URL = 'v1/pedidos/fornecedores'

let carrinhoAPI = {

    buscarUltimosPedidos() {
        let dataAgoraFormatada = DateUtils.getDataAgoraFormatada()
       
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.resumoPedidosEncontrados(response.body));
            return response
        }
        let statusParametros = `status=${statusPedidos.PENDENTE_PREPARACAO}&status=${statusPedidos.PREPARANDO}&status=${statusPedidos.CONCLUIDO}`
        let filtroData = `&de=${dataAgoraFormatada}&ate=${dataAgoraFormatada}`
        let limite = `&limite=${10}`

        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?${statusParametros}${filtroData}${limite}`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    buscarPedidosPendentePreparacao() {
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.pedidosPendentePreparacao(response.body));
            return response
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?status=${statusPedidos.PENDENTE_PREPARACAO}`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    buscarPedidosEmPreparo() {
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.pedidosEmPreparo(response.body));
            return response
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?status=${statusPedidos.PREPARANDO}`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    buscarPedidosConcluidos() {
        let acao = (response, dispatch) => {
            dispatch(carrinhoActions.pedidosConcluidos(response.body));
            return response
        }
        let url = `${configs.URL_MS_CARRINHO}${PEDIDOS_FORNECEDORES_BASE_URL}?status=${statusPedidos.CONCLUIDO}`
        return requisicoesAjax.get(getToken(), url, acao)
    }
}

function getToken() {
    return localStorage.getItem('token')
}

export default carrinhoAPI;
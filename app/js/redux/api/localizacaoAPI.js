import localizacaoActions from '../actions/creators/localizacaoActionCreators'
import requisicoesAjax from './requisicoesAjax'
import configs from '../configuracoes';

const ESTADOS_BASE_URL = 'v1/estados'
const ENDERECOS_BASE_URL = 'v1/enderecos'

let localizacaoAPI = {

    buscarEstados() {
        let acao = (response, dispatch) => {
            dispatch(localizacaoActions.estadosEncontrados(response.body));
            return response
        }
        let url = `${configs.URL_MS_LOCALIZACAO}${ESTADOS_BASE_URL}`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    buscarEnderecoPorCEP(cep) {
        let acao = (response, dispatch) => {
            dispatch(localizacaoActions.enderecoEncontrado(response.body));
            return response
        }
        let url = `${configs.URL_MS_LOCALIZACAO}${ENDERECOS_BASE_URL}/${cep}`
        return requisicoesAjax.get(getToken(), url, acao)
    },
}

function getToken() {
    return localStorage.getItem('token')
}

export default localizacaoAPI;
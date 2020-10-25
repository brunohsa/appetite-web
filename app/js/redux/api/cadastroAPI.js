import cadastroActions from '../actions/creators/cadastroActionCreators'
import requisicoesAjax from './requisicoesAjax'
import configs from '../configuracoes';

const CADASTRO_BASE_URL = 'v1/cadastros'
const PESSOA_JURIDICA_BASE_URL = 'v1/pessoa-juridica'

let cadastroAPI = {

    buscarCadastro() {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.cadastroEncontrado(response.body));
            return response
        }
        let url = `${configs.URL_MS_CADASTRO}${CADASTRO_BASE_URL}`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    buscarHorariosFuncionamento() {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.horariosFuncionamentoEncontrados(response.body));
            return response
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/funcionamento`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    buscarHorariosDiferenciados() {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.horariosDiferenciadosEncontrados(response.body));
            return response
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    adicionarHorarioDiferenciado(horarioDiferenciado) {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.horarioDiferenciadoAdicionado(response.body));
            return response
        }
        let body = {
            data_especial: horarioDiferenciado.dataEspecial,
            abertura: horarioDiferenciado.abertura,
            fechamento: horarioDiferenciado.fechamento
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado`
        return requisicoesAjax.post(getToken(), body, url, acao)
    }
}

function getToken() {
    return localStorage.getItem('token')
}

export default cadastroAPI;
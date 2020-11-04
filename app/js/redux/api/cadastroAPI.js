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

    alterarHorariosFuncionamento(horariosFuncionamento) {
        let acao = (response, dispatch) => response
        let body = JSON.stringify(horariosFuncionamento.map(hf => {
                let hrFunc = {
                    dia: hf.dia,
                    abertura: hf.abertura,
                    fechamento: hf.fechamento,
                    fechado: hf.fechado
                }
                return hrFunc
            })
        )
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/funcionamento/alterar`
        return requisicoesAjax.put(getToken(), body, url, acao)
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
        let body = JSON.stringify({
            data_especial: horarioDiferenciado.dataEspecial,
            abertura: horarioDiferenciado.abertura,
            fechamento: horarioDiferenciado.fechamento
        })
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado`
        return requisicoesAjax.post(getToken(), body, url, acao)
    },

    removerHorarioDiferenciado(idHorario) {
        let acao = (response, dispatch) => response
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado/${idHorario}`
        return requisicoesAjax.delete(getToken(), url, acao)
    },

    filtrarHorarioDiferenciado(filtro) {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.horariosDiferenciadoFiltrados(response.body));
            return response
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado?${montarUrlFiltroHorariosDiferenciados(filtro)}`
        return requisicoesAjax.get(getToken(), url, acao)
    }
}

function montarUrlFiltroHorariosDiferenciados(filtro) {
    let urlFiltro = 'data_cadastro={0}&data_especial_inicio={1}&data_especial_fim={2}'
    urlFiltro = urlFiltro.replace('{0}', filtro.dataCadastro ? filtro.dataCadastro : '')
                         .replace('{1}', filtro.dataEspecialInicio ? filtro.dataEspecialInicio: '')
                         .replace('{2}', filtro.dataEspecialFim ? filtro.dataEspecialFim : '')
    return urlFiltro
}

function getToken() {
    return localStorage.getItem('token')
}

export default cadastroAPI;
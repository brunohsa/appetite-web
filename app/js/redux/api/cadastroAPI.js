import cadastroActions from '../actions/creators/cadastroActionCreators'
import mensagemActions from '../actions/creators/mensagemActionCreators'

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
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let url = `${configs.URL_MS_CADASTRO}${CADASTRO_BASE_URL}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    alterarCategoriaFornecedor(categoria) {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.categoriaFornecedorAlterada(response.body));
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
            return response
        }
        let body = JSON.stringify({
            categoria: categoria
        })
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let url = `${configs.URL_MS_CADASTRO}${CADASTRO_BASE_URL}/alterar-categoria`
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
    },

    alterarHorariosFuncionamento(horariosFuncionamento) {
        let acao = (response, dispatch) => {
            dispatch(mensagemActions.apresentarMensagemSucesso('Horário alterado com sucesso.'))
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
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
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
    },

    buscarHorariosFuncionamento() {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.horariosFuncionamentoEncontrados(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/funcionamento`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    buscarHorariosDiferenciados() {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.horariosDiferenciadosEncontrados(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    adicionarHorarioDiferenciado(horarioDiferenciado) {
        let acao = (response, dispatch) => {
            dispatch(mensagemActions.apresentarMensagemSucesso('Horário diferenciado inserido'))
            dispatch(cadastroActions.horarioDiferenciadoAdicionado(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let body = JSON.stringify({
            data_especial: horarioDiferenciado.dataEspecial,
            abertura: horarioDiferenciado.abertura,
            fechamento: horarioDiferenciado.fechamento
        })
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado`
        return requisicoesAjax.post(getToken(), body, url, acao, customCatch)
    },

    removerHorarioDiferenciado(idHorario) {
        let acao = (response, dispatch) => { 
            dispatch(mensagemActions.apresentarMensagemSucesso('Horário(s) diferenciado(s) removido(s)'))
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado/${idHorario}`
        return requisicoesAjax.delete(getToken(), url, acao, customCatch)
    },

    filtrarHorarioDiferenciado(filtro) {
        let acao = (response, dispatch) => {
            dispatch(mensagemActions.apresentarMensagemSucesso('Horários diferenciados filtrado.'))
            dispatch(cadastroActions.horariosDiferenciadoFiltrados(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/horarios/diferenciado?${montarUrlFiltroHorariosDiferenciados(filtro)}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    adicionarEndereco(endereco) {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaCadastro());
            dispatch(mensagemActions.apresentarMensagemSucesso('Usuário cadastrado com sucesso !'))
            dispatch(cadastroActions.enderecoCadastrado(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaCadastro());
        }
        let body = JSON.stringify({
            cep: endereco.cep,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado,
            logradouro: endereco.logradouro,
            numero: endereco.numero
        })
        let url = `${configs.URL_MS_CADASTRO}${CADASTRO_BASE_URL}/endereco/adicionar`
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
    },

    alterarImagemFornecedor(imagemBase64) {
        let acao = (response, dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
            dispatch(mensagemActions.apresentarMensagemSucesso('Imagem alterada com sucesso !'))
            dispatch(cadastroActions.imagemFornecedorAlterada(imagemBase64));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cadastroActions.stopLoaderTelaConfiguracoes());
        }
        let body = JSON.stringify({imagem: imagemBase64 })

        let url = `${configs.URL_MS_CADASTRO}${PESSOA_JURIDICA_BASE_URL}/alterar-imagem`
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
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
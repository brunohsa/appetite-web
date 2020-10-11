import fornecedorActions from '../actions/creators/fornecedorActionCreators'
import requisicoesAjax from './requisicoesAjax'
import configs from '../configuracoes';

const AUTENTICACAO_BASE_URL = 'autenticacao/api/v1'

let fornecedorAPI = {

    salvarFornecedor(login, informacoes) {
        let body = JSON.stringify({
            email: login.email,
            senha: login.senha,
            razao_social: informacoes.razaoSocial,
            nome_fantasia: informacoes.nomeFantasia,
            cnpj: informacoes.cnpj,
            telefone: informacoes.telefone
        })

        let acao = (response, dispatch) => {
            localStorage.setItem('token', response.headers.get('token'));
            dispatch(fornecedorActions.cadastroRealizado());
            return response
        }

        let url = `${configs.URL_BASE_MS_AUTENTICACAO}${AUTENTICACAO_BASE_URL}/usuarios/cadastrar/fornecedor`
        return requisicoesAjax.postSemToken(body, url, acao)
    }
}

export default fornecedorAPI;
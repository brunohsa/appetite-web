import loginActions from '../actions/creators/loginActionCreators'
import requisicoesAjax from './requisicoesAjax'
import configs from '../configuracoes';

let loginAPI = {

   fazerLogin(email, senha) {
        let body = JSON.stringify({
            email: email,
            senha: senha
        })

        let acao = (response, dispatch) => {
            localStorage.setItem('token', response.headers.get('token'));
            localStorage.setItem('podeRedirecionar', true);
            dispatch(loginActions.loginRealizado());
            return response
        }

        let url = `${configs.URL_MS_AUTENTICACAO}v1/autenticar`
        return requisicoesAjax.postSemToken(body, url, acao)
    }
    
}
export default loginAPI;
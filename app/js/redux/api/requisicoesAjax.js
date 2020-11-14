import erroActions from '../actions/creators/erroActionCreators'
import mensagemActions from '../actions/creators/mensagemActionCreators'
import loginActions from '../actions/creators/loginActionCreators'

const CODIGO_TOKEN_EXPIRADO = '001'
const ERRO_DE_CONEXAO = 'Failed to fetch'

let tokenExpirado = false

let requisicoesAjax = {

   postSemToken(body, url, acao, customCatch) {
       return this.post(null, body, url, acao, customCatch)
   },

   post(token, body, url, acao, customCatch) {
        return (dispatch) => {
            this.fetch(token, body, url, acao, 'POST', dispatch, customCatch)
        }
    },

    put(token, body, url, acao, customCatch) {
        return (dispatch) => {
            this.fetch(token, body, url, acao, 'PUT', dispatch, customCatch)
        }
    },

    delete(token, url, acao, customCatch) {
        return (dispatch) => {
            this.fetch(token, null, url, acao, 'DELETE', dispatch, customCatch)
        }
    },
    
    get(token, url, acao, customCatch) {
        return (dispatch) => {
            this.fetch(token, null, url, acao, 'GET', dispatch, customCatch)
        }
    },

    fetch(token, body, url, acao, method, dispatch, customCatch) {
        dispatch(erroActions.limparErros())
        dispatch(mensagemActions.limparMensagens())
        return fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: body
            })
            .then(response => {
                let contentType = response.headers.get("content-type");
                if(contentType && contentType.includes('application/json')) {
                    return response.json().then(json => retorno(json, response.headers))
                }
                if(contentType && contentType.includes('image/jpeg')) {
                    return  response.blob().then(blob => retorno(blob, response.headers))
                }
                return response.text().then(json => retorno(json, response.headers))
            })
            .then(response => {
                tratarErro(response)
                return acao(response, dispatch)
            })
            .catch(e => {
                let mensagem = tratarMensagemDeErro(e.message)
                dispatch(erroActions.apresentarErro(mensagem))
                tokenExpirado ? fazerLogoff(dispatch) : null
                customCatch ? customCatch(dispatch) : null
            })
    }
}

function retorno(body, headers) {
    return {
        body: body,
        headers: headers
    }   
}

function tratarErro(response) {
    let erro = response.body.erro
    if(erro) {
        tokenExpirado = erro.codigo === CODIGO_TOKEN_EXPIRADO
        console.log(erro.mensagem)
        throw Error(erro.mensagem)
    }
}

function tratarMensagemDeErro(mensagem) {
    console.log(`erro: ${mensagem}`)
    if(mensagem === ERRO_DE_CONEXAO) {
        return 'Erro na conexão. por favor tente novamente mais tarde.'
    }
    return mensagem
}

function fazerLogoff(dispatch) {
    localStorage.removeItem('token')
    dispatch(loginActions.fazerLogout())
}

export default requisicoesAjax;
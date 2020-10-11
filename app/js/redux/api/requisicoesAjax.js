import erroActions from '../actions/creators/erroActionCreators'

let requisicoesAjax = {

   postSemToken(body, url, acao) {
       return this.post(null, body, url, acao)
   },

   post(token, body, url, acao) {
        return (dispatch) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: body
            })
            .then(response => {
                if(possuiErros(response)) {
                    return response.json()
                }
                return response
            })
            .then(response => {
                if(response.erro) { 
                    throw Error(response.erro.mensagem); 
                }
                return response;
            })
            .then(response => {
                return acao(response, dispatch)
            })
            .catch(e => {
                console.log(`erro: ${e.message}`)
                dispatch(erroActions.apresentarErro(e.message));
            })
        }
    },
    
    get(token, url, acao) {
        return (dispatch) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })
            .then(response => {
                if(possuiErros(response)) {
                    return response.json()
                }
                return response.json()
            })
            .then(response => {
                if(response.erro) { 
                    throw Error(response.erro.mensagem); 
                }
                return response;
            })
            .then(response => {
                return acao(response, dispatch)
            })
            .catch(e => {
                console.log(`erro: ${e.message}`)
                dispatch(erroActions.apresentarErro(e.message));
            })
        }
    }
}

function possuiErros(response) {
    return response.status && response.status !== 200
}

export default requisicoesAjax;
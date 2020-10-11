import actionTypes from '../actionTypes';

let loginActions = {

    loginFornecedor(login) {
        return {
            type: actionTypes.LOGIN_FORNECEDOR, 
            login
        }
    },

    informacoesFornecedor(informacoes) {
        return {
            type: actionTypes.INFORMACOES_FORNECEDOR, 
            informacoes
        }
    },

    enderecoFornecedor(endereco) {
        return {
            type: actionTypes.ENDERECO_FORNECEDOR, 
            endereco
        }
    },
    
    cadastroRealizado() {
        return {
            type: actionTypes.CADASTRO_FORNECEDOR_REALIZADO, 
            cadastroRealizado: true
        }
    }
}

export default loginActions;
import actionTypes from '../actionTypes';

let erroActions = {

    apresentarErro(erro) {
        return {
            type: actionTypes.APRESENTAR_ERROS, 
            erro: { mensagem: erro }
        }
    },

    limparErros() {
        return {
            type: actionTypes.LIMPAR_ERROS, 
            erro: { mensagem: null }
        }
    },
}

export default erroActions;
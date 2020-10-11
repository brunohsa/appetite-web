import actionTypes from '../actionTypes';

let loginActions = {

    apresentarErro(erro) {
        return {
            type: actionTypes.APRESENTAR_ERROS, 
            erro: { mensagem: erro }
        }
    }
}

export default loginActions;
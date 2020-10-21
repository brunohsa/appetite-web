import actionTypes from '../actionTypes';

let erroActions = {

    apresentarErro(erro) {
        return {
            type: actionTypes.APRESENTAR_ERROS, 
            erro: { mensagem: erro }
        }
    },


}

export default erroActions;
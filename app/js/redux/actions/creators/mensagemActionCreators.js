import actionTypes from '../actionTypes';

let mensagemActions = {

    apresentarMensagemSucesso(mensagem) {
        return {
            type: actionTypes.APRESENTAR_MENSAGEM_SUCESSO, 
            mensagem: { mensagem: mensagem }
        }
    },

    limparMensagens() {
        return {
            type: actionTypes.LIMPAR_MENSAGENS
        }
    },
}

export default mensagemActions;
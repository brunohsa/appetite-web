import actionTypes from '../actions/actionTypes';

export function mensagemReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.APRESENTAR_MENSAGEM_SUCESSO:
            return action.mensagem;
        case actionTypes.LIMPAR_MENSAGENS:
            return {};
        default:
            return state;
    }
}
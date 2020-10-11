import actionTypes from '../actions/actionTypes';

export function fornecedorReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.LOGIN_FORNECEDOR:
            return { 
                ...state, 
                login: action.login 
            };
        case actionTypes.INFORMACOES_FORNECEDOR:
            return { 
                ...state, 
                informacoes: action.informacoes 
            };
        case actionTypes.ENDERECO_FORNECEDOR:
            return { 
                ...state, 
                endereco: action.endereco
            };
        case actionTypes.CADASTRO_FORNECEDOR_REALIZADO:
            return { 
                ...state, 
                cadastroRealizado: action.cadastroRealizado
            };
        default:
            return state;
    }
}
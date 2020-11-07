import actionTypes from '../actions/actionTypes';

export function localizacaoReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.ESTADOS_ENCONTRADOS:
            return { 
                ...state, 
                estados: action.estados
            };
        case actionTypes.ENDERECO_ENCONTRADO:
            return { 
                ...state, 
                endereco: action.endereco
            };
        default:
            return state;
    }
}
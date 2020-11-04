import actionTypes from '../actions/actionTypes';

export function cadastroReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.CADASTRO_ENCONTRADO:
            return { 
                ...state, 
                cadastro: action.cadastro
            };
        case actionTypes.HORARIOS_FUNCIONAMENTO_ENCONTRADO:
            return { 
                ...state, 
                horariosFuncionamento: action.horariosFuncionamento
            };
        case actionTypes.HORARIOS_DIFERENCIADOS_ENCONTRADO:
            return { 
                ...state, 
                horariosDiferenciados: action.horariosDiferenciados
            };
        case actionTypes.HORARIO_DIFERENCIADO_ADICIONADO:
            return { 
                ...state, 
                horariosDiferenciados: action.horariosDiferenciados
            };
        case actionTypes.HORARIOS_DIFERENCIADOS_FILTRADO:
            return { 
                ...state, 
                horariosDiferenciados: action.horariosDiferenciados
            };
        default:
            return state;
    }
}
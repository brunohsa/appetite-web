import actionTypes from '../actions/actionTypes';

export function cadastroReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.CADASTRO_ENCONTRADO:
            return { 
                ...state, 
                cadastro: action.cadastro,
                cadastroEncontrado: true
            };
        case actionTypes.HORARIOS_FUNCIONAMENTO_ENCONTRADO:
            return { 
                ...state, 
                horariosFuncionamento: action.horariosFuncionamento,
                horariosFuncionamentoEncontrado: true
            };
        case actionTypes.HORARIOS_DIFERENCIADOS_ENCONTRADO:
            return { 
                ...state, 
                horariosDiferenciados: action.horariosDiferenciados,
                horariosDiferenciadoEncontrado: true
            };
        case actionTypes.HORARIO_DIFERENCIADO_ADICIONADO:
            return { 
                ...state, 
                horariosDiferenciados: action.horariosDiferenciados,
                carregandoDadosTelaConfiguracoes: false
            };
        case actionTypes.HORARIOS_DIFERENCIADOS_FILTRADO:
            return { 
                ...state, 
                horariosDiferenciados: action.horariosDiferenciados,
                carregandoDadosTelaConfiguracoes: false
            };
        case actionTypes.ENDERECO_CADASTRADO:
            return { 
                ...state, 
                enderecoCadastrado: action.enderecoCadastrado
            };
        case actionTypes.LOADER_TELA_CONFIGURACOES:
            return { 
                ...state, 
                carregandoDadosTelaConfiguracoes: action.carregandoDadosTelaConfiguracoes
            };
        case actionTypes.LOADER_TELA_CADASTRO:
            return { 
                ...state, 
                fazendoCadastro: action.fazendoCadastro
            };
        default:
            return state;
    }
}
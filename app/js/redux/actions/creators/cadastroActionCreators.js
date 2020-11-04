import actionTypes from '../actionTypes';

let cadastroActions = {

    cadastroEncontrado(cadastro) {
        return {
            type: actionTypes.CADASTRO_ENCONTRADO, 
            cadastro: cadastro
        }
    },

    horariosFuncionamentoEncontrados(horarios) {
        return {
            type: actionTypes.HORARIOS_FUNCIONAMENTO_ENCONTRADO, 
            horariosFuncionamento: horarios
        }
    },

    horariosDiferenciadosEncontrados(horarios) {
        return {
            type: actionTypes.HORARIOS_DIFERENCIADOS_ENCONTRADO, 
            horariosDiferenciados: horarios
        }
    },

    horarioDiferenciadoAdicionado(horarios) {
        return {
            type: actionTypes.HORARIO_DIFERENCIADO_ADICIONADO, 
            horariosDiferenciados: horarios
        }
    },

    horariosDiferenciadoFiltrados(horarios) {
        return {
            type: actionTypes.HORARIOS_DIFERENCIADOS_FILTRADO, 
            horariosDiferenciados: horarios
        }
    },
}

export default cadastroActions;
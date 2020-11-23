import actionTypes from '../actionTypes';

let cadastroActions = {

    cadastroEncontrado(cadastro) {
        return {
            type: actionTypes.CADASTRO_ENCONTRADO, 
            cadastro: cadastro
        }
    },

    categoriaFornecedorAlterada(cadastro) {
        return {
            type: actionTypes.CATEGORIA_FORNECEDOR_ATUALIZADA, 
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

    enderecoCadastrado() {
        return {
            type: actionTypes.ENDERECO_CADASTRADO, 
            enderecoCadastrado: true
        }
    },

    imagemFornecedorAlterada(imagem) {
        return {
            type: actionTypes.IMAGEM_FORNECEDOR_ALTERADA, 
            imagem: imagem
        }
    },

    startLoaderTelaConfiguracoes() {
        return {
            type: actionTypes.LOADER_TELA_CONFIGURACOES, 
            carregandoDadosTelaConfiguracoes: true
        }
    },

    stopLoaderTelaConfiguracoes() {
        return {
            type: actionTypes.LOADER_TELA_CONFIGURACOES, 
            carregandoDadosTelaConfiguracoes: false
        }
    },

    startLoaderTelaCadastro() {
        return {
            type: actionTypes.LOADER_TELA_CADASTRO, 
            fazendoCadastro: true
        }
    },

    stopLoaderTelaCadastro() {
        return {
            type: actionTypes.LOADER_TELA_CADASTRO, 
            fazendoCadastro: false
        }
    }
}

export default cadastroActions;
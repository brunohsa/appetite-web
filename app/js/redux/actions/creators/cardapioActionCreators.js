import actionTypes from '../actionTypes';

let loginActions = {

    cardapiosEncontrados(cardapios) {
        return {
            type: actionTypes.CARDAPIOS_ENCONTRADOS, 
            cardapios
        }
    },

    cardapioCriado(cardapios) {
        return {
            type: actionTypes.CARDAPIO_CRIADO, 
            cardapios
        }
    },

    cardapioEncontrado(cardapio) {
        return {
            type: actionTypes.CARDAPIO_ENCONTRADO, 
            cardapio
        }
    },

    categoriaCriada(cardapio) {
        return {
            type: actionTypes.CATEGORIA_CRIADA, 
            cardapio
        }
    },

    subcategoriasEncontrada(subcategorias) {
        return {
            type: actionTypes.SUBCATEGORIAS_ENCONTRADA, 
            subcategorias
        }
    },

    produtoCriado(cardapio) {
        return {
            type: actionTypes.PRODUTO_ADICIONADO, 
            cardapio
        }
    },

    categoriaRemovida(cardapio) {
        return {
            type: actionTypes.CATEGORIA_REMOVIDA, 
            cardapio
        }
    },

    produtoRemovido(cardapio) {
        return {
            type: actionTypes.PRODUTO_REMOVIDO, 
            cardapio
        }
    },

    downloadImagemRealizado(imagemBlob) {
        return {
            type: actionTypes.IMAGEM_BAIXADA, 
            imagemBlob
        }
    },

    cardapioRemovido(cardapios) {
        return {
            type: actionTypes.CARDAPIO_REMOVIDO, 
            cardapios
        }
    },

    produtosMelhoresAvaliadosBuscado(produtos) {
        return {
            type: actionTypes.PRODUTOS_MELHORES_AVALIADOS, 
            melhoresAvaliados: produtos
        }
    },

    produtosMaisVendidosBuscado(produtos) {
        return {
            type: actionTypes.PRODUTOS_MAIS_VENDIDOS, 
            maisVendidos: produtos
        }
    }
}

export default loginActions;
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

    startLoaderTelaCardapios() {
        return {
            type: actionTypes.LOADER_TELA_CARDAPIOS, 
            carregandoDadosTelaCardapio: true
        }
    },

    stopLoaderTelaCardapios() {
        return {
            type: actionTypes.LOADER_TELA_CARDAPIOS, 
            carregandoDadosTelaCardapio: false
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

    startLoaderBuscaProdutosMelhoresAvaliados() {
        return {
            type: actionTypes.LOADER_PRODUTOS_MELHORES_AVALIADOS, 
            buscandoProdutosMelhoresAvaliados: true
        }
    },

    stopLoaderBuscaProdutosMelhoresAvaliados() {
        return {
            type: actionTypes.LOADER_PRODUTOS_MELHORES_AVALIADOS, 
            buscandoProdutosMelhoresAvaliados: false
        }
    },

    produtosMaisVendidosBuscado(produtos) {
        return {
            type: actionTypes.PRODUTOS_MAIS_VENDIDOS,
            maisVendidos: produtos
        }
    },

    startLoaderBuscaPedidosMaisVendidos() {
        return {
            type: actionTypes.LOADER_PRODUTOS_MAIS_VENDIDOS, 
            buscandoPedidosMaisVendidos: true
        }
    },

    stopLoaderBuscaPedidosMaisVendidos() {
        return {
            type: actionTypes.LOADER_PRODUTOS_MAIS_VENDIDOS, 
            buscandoPedidosMaisVendidos: false
        }
    },

    startLoaderTelaEditarCardapio() {
        return {
            type: actionTypes.LOADER_TELA_EDITAR_CARDAPIO, 
            carregandoDadosTelaEditarCardapio: true
        }
    },

    stopLoaderTelaEditarCardapio() {
        return {
            type: actionTypes.LOADER_TELA_EDITAR_CARDAPIO, 
            carregandoDadosTelaEditarCardapio: false
        }
    },

}

export default loginActions;
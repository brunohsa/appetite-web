import actionTypes from '../actions/actionTypes';

export function cardapioReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.CARDAPIOS_ENCONTRADOS:
            return { 
                ...state, 
                cardapios: action.cardapios,
                carregandoDadosTelaCardapio: false
            };
        case actionTypes.CARDAPIO_CRIADO:
            return { 
                ...state, 
                cardapios: action.cardapios,
                carregandoDadosTelaCardapio: false
            };
        case actionTypes.CARDAPIO_ENCONTRADO:
            return { 
                ...state, 
                cardapio: action.cardapio,
                carregandoDadosTelaEditarCardapio: false
            };
        case actionTypes.CATEGORIA_CRIADA:
           return { 
               ...state, 
               cardapio: action.cardapio,
               carregandoDadosTelaEditarCardapio: false
           };
        case actionTypes.CATEGORIA_REMOVIDA:
           return { 
               ...state, 
               cardapio: action.cardapio,
               carregandoDadosTelaEditarCardapio: false
           };
        case actionTypes.SUBCATEGORIAS_ENCONTRADA:
            return { 
                ...state, 
                subcategorias: action.subcategorias
            };
        case actionTypes.PRODUTO_ADICIONADO:
           return { 
               ...state, 
               cardapio: action.cardapio,
               carregandoDadosTelaEditarCardapio: false
           };
        case actionTypes.PRODUTO_REMOVIDO:
           return { 
               ...state, 
               cardapio: action.cardapio,
               carregandoDadosTelaEditarCardapio: false
           };
        case actionTypes.IMAGEM_BAIXADA:
            return { 
                ...state, 
                imagemBlob: action.imagemBlob
            };
        case actionTypes.CARDAPIO_REMOVIDO:
            return { 
                ...state, 
                cardapios: action.cardapios,
                carregandoDadosTelaCardapio: false
            };
        case actionTypes.PRODUTOS_MELHORES_AVALIADOS:
            return { 
                ...state, 
                produtosMelhoresAvaliados: action.melhoresAvaliados,
                buscandoProdutosMelhoresAvaliados: false
            };
       
        case actionTypes.PRODUTOS_MAIS_VENDIDOS:
            return { 
                ...state, 
                produtosMaisVendidos: action.maisVendidos,
                buscandoPedidosMaisVendidos: false
            };
        case actionTypes.LOADER_TELA_CARDAPIOS:
            return { 
                ...state,
                carregandoDadosTelaCardapio: action.carregandoDadosTelaCardapio
            };
        case actionTypes.LOADER_PRODUTOS_MELHORES_AVALIADOS:
            return { 
                ...state,
                buscandoProdutosMelhoresAvaliados: action.buscandoProdutosMelhoresAvaliados
            };
        case actionTypes.LOADER_PRODUTOS_MAIS_VENDIDOS:
            return { 
                ...state,
                buscandoPedidosMaisVendidos: action.buscandoPedidosMaisVendidos
            };
        case actionTypes.LOADER_TELA_EDITAR_CARDAPIO:
            return { 
                ...state,
                carregandoDadosTelaEditarCardapio: action.carregandoDadosTelaEditarCardapio
            };
        default:
            return state;
    }
}
import actionTypes from '../actions/actionTypes';

export function cardapioReducers(state = {}, action) {
    switch(action.type) {
        case actionTypes.CARDAPIOS_ENCONTRADOS:
            return { 
                ...state, 
                cardapios: action.cardapios
            };
        case actionTypes.CARDAPIO_CRIADO:
            return { 
                ...state, 
                cardapios: action.cardapios
            };
        case actionTypes.CARDAPIO_ENCONTRADO:
            return { 
                ...state, 
                cardapio: action.cardapio
            };
        case actionTypes.CATEGORIA_CRIADA:
           return { 
               ...state, 
               cardapio: action.cardapio
           };
        case actionTypes.CATEGORIA_REMOVIDA:
           return { 
               ...state, 
               cardapio: action.cardapio
           };
        case actionTypes.SUBCATEGORIAS_ENCONTRADA:
            return { 
                ...state, 
                subcategorias: action.subcategorias
            };
        case actionTypes.PRODUTO_ADICIONADO:
           return { 
               ...state, 
               cardapio: action.cardapio
           };
        case actionTypes.PRODUTO_REMOVIDO:
           return { 
               ...state, 
               cardapio: action.cardapio
           };
        case actionTypes.IMAGEM_BAIXADA:
            return { 
                ...state, 
                imagemBlob: action.imagemBlob
            };
        case actionTypes.CARDAPIO_REMOVIDO:
            return { 
                ...state, 
                cardapios: action.cardapios
            };
        case actionTypes.PRODUTOS_MELHORES_AVALIADOS:
            return { 
                ...state, 
                produtosMelhoresAvaliados: action.melhoresAvaliados
            };
        case actionTypes.PRODUTOS_MAIS_VENDIDOS:
            return { 
                ...state, 
                produtosMaisVendidos: action.maisVendidos
            };
        default:
            return state;
    }
}
import { combineReducers } from 'redux';
import { loginReducers } from './loginReducer';
import { cardapioReducers } from './cardapioReducer';
import { produtoReducers } from './produtoReducer';
import { fornecedorReducers } from './fornecedorReducer';
import { pedidoReducers } from './pedidoReducer';
import { erroReducers } from './erroReducer';
import { carrinhoReducers } from './carrinhoReducer';


export default combineReducers({
    login: loginReducers,
    cardapio: cardapioReducers,
    produto: produtoReducers,
    fornecedor: fornecedorReducers,
    pedido: pedidoReducers,
    carrinho: carrinhoReducers,
    erro: erroReducers
});
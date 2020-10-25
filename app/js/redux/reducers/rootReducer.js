import { combineReducers } from 'redux';
import { loginReducers } from './loginReducer';
import { cardapioReducers } from './cardapioReducer';
import { fornecedorReducers } from './fornecedorReducer';
import { erroReducers } from './erroReducer';
import { cadastroReducers } from './cadastroReducer';
import { carrinhoReducers } from './carrinhoReducer';


export default combineReducers({
    login: loginReducers,
    cardapio: cardapioReducers,
    fornecedor: fornecedorReducers,
    carrinho: carrinhoReducers,
    cadastro: cadastroReducers,
    erro: erroReducers
});
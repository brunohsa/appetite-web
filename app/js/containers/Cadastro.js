import React, {Component}from 'react';

import { connect } from 'react-redux'

import CadastroComponent from '../components/CadastroComponent';
import MenuApp from '../components/MenuApp';

import '../../styles/not-found/not-found.css';

import fornecedorAPI from '../redux/api/fornecedorAPI'
import fornecedorActions from '../redux/actions/creators/fornecedorActionCreators'

class Cadastro extends Component {
	render() {
		let { loginFornecedor, informacoesFornecedor, enderecoFornecedor, salvarFornecedor } =  this.props
		return (
			<div style={{height: '100%', width: '100%'}}>
                <div style={{height: '8%'}}> <MenuApp /> </div>
                <div style={{height: '92%'}}>
					<CadastroComponent 
						loginFornecedor={loginFornecedor} 
						informacoesFornecedor={informacoesFornecedor}
						enderecoFornecedor={enderecoFornecedor}
						salvarFornecedor={salvarFornecedor} />
				</div>
            </div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
    	loginFornecedor: (login) => {
        	dispatch(fornecedorActions.loginFornecedor(login));
	  	},
	  	informacoesFornecedor: (informacoes) => {
			dispatch(fornecedorActions.informacoesFornecedor(informacoes));
		},
		enderecoFornecedor: (endereco) => {
			dispatch(fornecedorActions.enderecoFornecedor(endereco));
		},
		salvarFornecedor: (login, informacoes) => {
			dispatch(fornecedorAPI.salvarFornecedor(login, informacoes));
		}
    }
}

export default connect(null, mapDispatchToProps)(Cadastro);
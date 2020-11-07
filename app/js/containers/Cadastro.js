import React, {Component}from 'react';

import { connect } from 'react-redux'

import CadastroComponent from '../components/CadastroComponent';
import MenuApp from '../components/MenuApp';

import '../../styles/not-found/not-found.css';

import fornecedorAPI from '../redux/api/fornecedorAPI'
import localizacaoAPI from '../redux/api/localizacaoAPI'
import cadastroAPI from '../redux/api/cadastroAPI'

import fornecedorActions from '../redux/actions/creators/fornecedorActionCreators'

class Cadastro extends Component {

	constructor(props) {
		super(props)

		this.props.buscarEstados();
	}
	
	render() {
		let { loginFornecedor, informacoesFornecedor, enderecoFornecedor, salvarFornecedor, buscarEnderecoPorCEP } =  this.props
		return (
			<div style={{height: '100%', width: '100%'}}>
                <div style={{height: '8%'}}> <MenuApp /> </div>
                <div style={{height: '92%'}}>
					<CadastroComponent 
						loginFornecedor={loginFornecedor} 
						informacoesFornecedor={informacoesFornecedor}
						enderecoFornecedor={enderecoFornecedor}
						salvarFornecedor={salvarFornecedor}
						buscarEnderecoPorCEP={buscarEnderecoPorCEP} />
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
		salvarFornecedor: (login, informacoes, endereco) => {
			dispatch(fornecedorAPI.salvarFornecedor(login, informacoes, endereco));
		},
		buscarEstados: () => {
			dispatch(localizacaoAPI.buscarEstados());
		},
		buscarEnderecoPorCEP: (cep) => {
			dispatch(localizacaoAPI.buscarEnderecoPorCEP(cep));
		}
    }
}

export default connect(null, mapDispatchToProps)(Cadastro);
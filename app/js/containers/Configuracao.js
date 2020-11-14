import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MenuApp from '../components/MenuApp'
import ConfiguracaoComponent from '../components/ConfiguracaoComponent'

import cadastroActions from '../redux/actions/creators/cadastroActionCreators'
import cadastroAPI from '../redux/api/cadastroAPI'
import cardapioAPI from '../redux/api/cardapioAPI'

class Configuracao extends Component {
	
	constructor(props) {
		super(props)

		this.props.buscarCadastro()
		this.props.buscarHorariosFuncionamento()
		this.props.buscarHorariosDiferenciados()
		this.props.buscarSubcategorias()
	}
	
	render() {
		
		let { adicionarHorarioDiferenciado, alterarHorariosFuncionamento, removerHorarioDiferenciado, filtrarHorarioDiferenciado, alterarImagemFornecedor} = this.props

		return (
			<div style={{height: '100%', width: '100%'}}>
                <div style={{height: '10%', maxHeight: '80px'}}> 
					<MenuApp /> 
				</div>
                <div style={{maxHeight: '92%', overflowX: 'auto', position: 'relative'}}>
					<ConfiguracaoComponent adicionarHorarioDiferenciado={adicionarHorarioDiferenciado} 
										   alterarHorariosFuncionamento={alterarHorariosFuncionamento}
										   removerHorarioDiferenciado={removerHorarioDiferenciado}
										   filtrarHorarioDiferenciado={filtrarHorarioDiferenciado}
										   alterarImagemFornecedor={alterarImagemFornecedor} />
				</div>
            </div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
    	buscarCadastro: () => {
        	dispatch(cadastroAPI.buscarCadastro());
		},
		buscarHorariosFuncionamento: () => {
			dispatch(cadastroAPI.buscarHorariosFuncionamento());
		},
		alterarHorariosFuncionamento: (horariosFuncionamento) => {
			dispatch(cadastroActions.startLoaderTelaConfiguracoes());
			dispatch(cadastroAPI.alterarHorariosFuncionamento(horariosFuncionamento));
		},
        buscarHorariosDiferenciados: () => {
			dispatch(cadastroAPI.buscarHorariosDiferenciados());
        },
        adicionarHorarioDiferenciado: (horarioDiferenciado) => {
			dispatch(cadastroActions.startLoaderTelaConfiguracoes());
			dispatch(cadastroAPI.adicionarHorarioDiferenciado(horarioDiferenciado));
		},
		removerHorarioDiferenciado: (idHorario) => {
			dispatch(cadastroActions.startLoaderTelaConfiguracoes());
			dispatch(cadastroAPI.removerHorarioDiferenciado(idHorario));
		},
		filtrarHorarioDiferenciado: (filtro) => {
			dispatch(cadastroActions.startLoaderTelaConfiguracoes());
			dispatch(cadastroAPI.filtrarHorarioDiferenciado(filtro));
		},
		alterarImagemFornecedor: (imagem) => {
			dispatch(cadastroActions.startLoaderTelaConfiguracoes());
			dispatch(cadastroAPI.alterarImagemFornecedor(imagem));
		},
		buscarSubcategorias: () => {
			dispatch(cardapioAPI.buscarSubcategorias());
		}
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Configuracao));
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MenuApp from '../components/MenuApp'
import ConfiguracaoComponent from '../components/ConfiguracaoComponent'

import cadastroActions from '../redux/actions/creators/cadastroActionCreators'
import cadastroAPI from '../redux/api/cadastroAPI'

class Configuracao extends Component {
	
	constructor(props) {
		super(props)

		this.props.buscarCadastro()
		this.props.buscarHorariosFuncionamento()
		this.props.buscarHorariosDiferenciados()
	}
	
	render() {
		
		let { adicionarHorarioDiferenciado, alterarHorariosFuncionamento, removerHorarioDiferenciado, filtrarHorarioDiferenciado } = this.props

		return (
			<div style={{height: '100%', width: '100%'}}>
                <div> 
					<MenuApp /> 
				</div>
                <div style={{height: '93.2%', overflowX: 'auto', position: 'relative'}}>
					<ConfiguracaoComponent adicionarHorarioDiferenciado={adicionarHorarioDiferenciado} 
										   alterarHorariosFuncionamento={alterarHorariosFuncionamento}
										   removerHorarioDiferenciado={removerHorarioDiferenciado}
										   filtrarHorarioDiferenciado={filtrarHorarioDiferenciado}/>
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
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Configuracao));
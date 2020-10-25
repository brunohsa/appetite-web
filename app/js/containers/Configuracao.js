import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MenuApp from '../components/MenuApp'
import ConfiguracaoComponent from '../components/ConfiguracaoComponent'

import cadastroAPI from '../redux/api/cadastroAPI'

class Configuracao extends Component {
	
	constructor(props) {
		super(props)

		this.props.buscarCadastro()
		this.props.buscarHorariosFuncionamento()
		this.props.buscarHorariosDiferenciados()
	}
	
	render() {
		
		let { adicionarHorarioDiferenciado } = this.props

		return (
			<div style={{height: '100%', width: '100%'}}>
				<MenuApp />
				<ConfiguracaoComponent adicionarHorarioDiferenciado={adicionarHorarioDiferenciado} />
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
        buscarHorariosDiferenciados: () => {
			dispatch(cadastroAPI.buscarHorariosDiferenciados());
        },
        adicionarHorarioDiferenciado: (horarioDiferenciado) => {
			dispatch(cadastroAPI.adicionarHorarioDiferenciado(horarioDiferenciado));
		},
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Configuracao));
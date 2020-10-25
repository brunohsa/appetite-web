import React, {Component}from 'react';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import carrinhoAPI from '../redux/api/carrinhoAPI'

import MenuApp from '../components/MenuApp';
import PedidosComponente from '../components/PedidosComponente';

class Pedidos extends Component {

	constructor(props) {
		super(props)

		this.props.buscarPedidosPendentePreparacao()
		this.props.buscarPedidosEmPreparo()
		this.props.buscarPedidosConcluidos()
	}

	render() {
		return (
			<div>
				<MenuApp />
				<PedidosComponente />
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		carrinho: state.carrinho,
		erro: state.erro
	}
}
  
const mapDispatchToProps = (dispatch) => {
	return {
		buscarPedidosPendentePreparacao: () => {
			dispatch(carrinhoAPI.buscarPedidosPendentePreparacao());
		},
		buscarPedidosEmPreparo: () => {
			dispatch(carrinhoAPI.buscarPedidosEmPreparo());
		},
		buscarPedidosConcluidos: () => {
			dispatch(carrinhoAPI.buscarPedidosConcluidos());
		},
	}
}
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pedidos));
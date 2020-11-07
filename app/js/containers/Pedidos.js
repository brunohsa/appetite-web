import React, {Component}from 'react';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import carrinhoAPI from '../redux/api/carrinhoAPI'

import MenuApp from '../components/MenuApp';
import PedidosComponente from '../components/PedidosComponente';

class Pedidos extends Component {

	constructor(props) {
		super(props)

		this.buscarPedidos()
		
		this.alterarStatusPedido = this.alterarStatusPedido.bind(this)
	}

	alterarStatusPedido(id, novoStatus) {
		this.props.alterarStatusPedido(id, novoStatus)
		setTimeout(() => this.buscarPedidos(), 250)
	}

	buscarPedidos() {
		this.props.buscarPedidosPendentePreparacao()
		this.props.buscarPedidosEmPreparo()
		this.props.buscarPedidosConcluidos()
		this.props.buscarPedidosCancelados()
	}

	render() {
		let { alterarStatusPedido } = this.props
		return (
			<div style={{height: '100%', width: '100%'}}>
                <div> <MenuApp /> </div>
                <div style={{height: '90%', overflowX: 'auto'}}> 
					<PedidosComponente alterarStatusPedido={this.alterarStatusPedido}/> 
				</div>
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
		buscarPedidosCancelados: () => {
			dispatch(carrinhoAPI.buscarPedidosCancelados());
		},
		alterarStatusPedido: (id, novoStatus) => {
			dispatch(carrinhoAPI.alterarStatusPedido(id, novoStatus));
		}
	}
}
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pedidos));
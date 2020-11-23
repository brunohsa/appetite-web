import React, {Component}from 'react';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import carrinhoAPI from '../redux/api/carrinhoAPI'

import carrinhoActions from '../redux/actions/creators/carrinhoActionCreators'

import MenuApp from '../components/MenuApp';
import PedidosComponente from '../components/PedidosComponente';

class Pedidos extends Component {

	constructor(props) {
		super(props)

		this.state = {
			intervalId: null
		}
		
		this.buscarPedidos()
		this.alterarStatusPedido = this.alterarStatusPedido.bind(this)
	}

	componentDidMount() {
		let intervalId = setInterval(() => this.buscarPedidosTimer(), 10000);
		this.setState({intervalId: intervalId});
	}

	buscarPedidosTimer() {
		this.props.buscarPedidosPendentePreparacaoTimer();
		this.props.buscarPedidosEmPreparoTimer();
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
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
			dispatch(carrinhoActions.startLoaderPedidosPendentePreparacao());
			dispatch(carrinhoAPI.buscarPedidosPendentePreparacao());
		},
		buscarPedidosEmPreparo: () => {
			dispatch(carrinhoActions.startLoaderPedidosEmPreparacao());
			dispatch(carrinhoAPI.buscarPedidosEmPreparo());
		},
		buscarPedidosConcluidos: () => {
			dispatch(carrinhoActions.startLoaderPedidosConcluidos());
			dispatch(carrinhoAPI.buscarPedidosConcluidos());
		},
		buscarPedidosCancelados: () => {
			dispatch(carrinhoActions.startLoaderPedidosCancelados());
			dispatch(carrinhoAPI.buscarPedidosCancelados());
		},
		alterarStatusPedido: (id, novoStatus) => {
			dispatch(carrinhoAPI.alterarStatusPedido(id, novoStatus));
		},
		buscarPedidosPendentePreparacaoTimer: () => {
			dispatch(carrinhoAPI.buscarPedidosPendentePreparacao());
		},
		buscarPedidosEmPreparoTimer: () => {
			dispatch(carrinhoAPI.buscarPedidosEmPreparo());
		},
	}
}
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pedidos));
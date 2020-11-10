import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import LoaderComponent from './LoaderComponent'
import ListaPedidos from './pedidos/ListaPedidos';

import '../../styles/pedidos-component.css';

class PedidosComponente extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    let { pedidosPendentePreparacao, pedidosEmPreparo, pedidosConcluidos, pedidosCancelados } = this.props.carrinhoStore
    let { buscandoPedidosPendentePreparacao, buscandoPedidosEmPreparo, buscandoPedidosConcluidos, buscandoPedidosCancelados } = this.props.carrinhoStore
    let { alterarStatusPedido } = this.props
    
    let itensPorPagina = Math.ceil((window.screen.width * 0.92) / 230) * 2
    return (
      <div className='container-pedidos'>
        <ListaPedidos 
          titulo='Pedidos Pendentes'
          buscando={buscandoPedidosPendentePreparacao} 
          itensPorPagina={itensPorPagina} 
          pedidos={pedidosPendentePreparacao} 
          habilitarAcoes={true} 
          alterarStatusPedido={alterarStatusPedido} />

        <ListaPedidos 
          titulo='Pedidos em Preparo'
          buscando={buscandoPedidosEmPreparo} 
          itensPorPagina={itensPorPagina} 
          pedidos={pedidosEmPreparo} 
          habilitarAcoes={true} 
          alterarStatusPedido={alterarStatusPedido} />

        <ListaPedidos 
          titulo='Pedidos Concluídos'
          buscando={buscandoPedidosConcluidos} 
          itensPorPagina={itensPorPagina} 
          pedidos={pedidosConcluidos} 
          alterarStatusPedido={alterarStatusPedido} />

        <ListaPedidos
          titulo='Pedidos Cancelados'
          buscando={buscandoPedidosCancelados} 
          itensPorPagina={itensPorPagina} 
          pedidos={pedidosCancelados} 
          alterarStatusPedido={alterarStatusPedido} />
      </div>    
    );
  }
}

const mapStateToProps = (state) => {
	return {
		carrinhoStore: state.carrinho
	}
}

export default connect(mapStateToProps)(PedidosComponente);

PedidosComponente.propTypes = {
  alterarStatusPedido: PropTypes.func.isRequired
}
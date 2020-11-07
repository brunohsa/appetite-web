import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import ListaPedidos from './pedidos/ListaPedidos';

import '../../styles/pedidos-component.css';

class PedidosComponente extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    let { pedidosPendentePreparacao, pedidosEmPreparo, pedidosConcluidos, pedidosCancelados } = this.props.carrinhoStore
    let { alterarStatusPedido } = this.props
    
    return (
      <div className='container-pedidos'>
        <ListaPedidos titulo='Pedidos Pendentes' pedidos={pedidosPendentePreparacao} alterarStatusPedido={alterarStatusPedido}/>
        <ListaPedidos titulo='Pedidos em Preparo' pedidos={pedidosEmPreparo} alterarStatusPedido={alterarStatusPedido}/>
        <ListaPedidos titulo='Pedidos Concluídos' pedidos={pedidosConcluidos} alterarStatusPedido={alterarStatusPedido}/>
        <ListaPedidos titulo='Pedidos Cancelados' pedidos={pedidosCancelados} alterarStatusPedido={alterarStatusPedido}/>
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
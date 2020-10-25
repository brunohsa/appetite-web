import React, {Component} from 'react';
import { connect } from 'react-redux'

import ListaPedidos from './pedidos/ListaPedidos';

import '../../styles/pedidos-component.css';

class PedidosComponente extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    let { pedidosPendentePreparacao, pedidosEmPreparo, pedidosConcluidos } = this.props.carrinhoStore
    
    return (
      <div className='container-pedidos'>
        <ListaPedidos titulo='Pedidos Pendentes' pedidos={pedidosPendentePreparacao}/>
        <ListaPedidos titulo='Pedidos em Preparo' pedidos={pedidosEmPreparo}/>
        <ListaPedidos titulo='Pedidos Concluídos' pedidos={pedidosConcluidos}/>
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
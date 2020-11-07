import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Pagination from '@material-ui/lab/Pagination';
import CardPedido from '../common/CardPedido';

import '../../../styles/pedidos-component.css';
import '../../../styles/common.css';

const itensPorPagina = 16

class ListaPedidos extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      pagina: 1
    }

    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage(event, newPage) {
    this.setState({ pagina: newPage })
  }

  renderizarSemItens() {
    return (
      <div className='container-sem-itens' style={{border:'none'}}>
        <span className='texto'> Você ainda não possui nenhum pedido. </span>
      </div>
    )
  }

  render() {
    let { pagina } = this.state
    let { titulo, pedidos, alterarStatusPedido } = this.props

    let numeroDePaginas = this.props.pedidos ? Math.ceil(this.props.pedidos.length / itensPorPagina) : 1

    return (
      <div className='container-conteudos container-pedidos-conteudo'>
        <div>
          <span className='titulo titulo-pedidos'> { titulo } </span>
        </div>
        <div style={{height: '89%', marginBottom: '10px'}}>
            {
              pedidos && pedidos.length > 0 ? 
                pedidos.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina)
                .map((pedido) => {
                  return (
                      <div id={pedido.id} className='list-pedidos-content'> 
                        <CardPedido pedido={pedido} habilitarAcoes={true} alterarStatusPedido={alterarStatusPedido} /> 
                      </div>
                  )
                })
              : this.renderizarSemItens()
            }
        </div>
        <div className='paginacao-pedidos'>
            <Pagination count={numeroDePaginas} page={pagina} onChange={this.handleChangePage}/>
        </div>
      </div>
    );
  }
}

export default ListaPedidos;

ListaPedidos.propTypes = {
  titulo: PropTypes.string.isRequired,
  pedidos: PropTypes.object,
  alterarStatusPedido: PropTypes.func.isRequired
}
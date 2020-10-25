import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Pagination from '@material-ui/lab/Pagination';
import CardPedido from '../common/CardPedido';
import DetalhesPedido from '../common/DetalhesPedido';

import '../../../styles/pedidos-component.css';
import '../../../styles/common.css';

const itensPorPagina = 16

class ListaPedidos extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      pagina: 1,
      abrirDetalhes: false,
      pedido: null
    }

    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage(event, newPage) {
    this.setState({ pagina: newPage })
  }

  abrirDetalhesDoPedido(pedido) {
    this.setState({
      abrirDetalhes: true,
      pedido: pedido
    })
  }

  fecharDetalhesDoPedido() {
    this.setState({
      abrirDetalhes: false
    })
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
    let { titulo, pedidos } = this.props

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
                      <div id={pedido.id} className='list-pedidos-content' onClick={() => this.abrirDetalhesDoPedido(pedido)}> 
                        <CardPedido pedido={pedido} habilitarAcoes={true} /> 
                      </div>
                  )
                })
              : this.renderizarSemItens()
            }
        </div>
        <div className='paginacao-pedidos'>
            <Pagination count={numeroDePaginas} page={pagina} onChange={this.handleChangePage}/>
        </div>
        { this.state.abrirDetalhes ? <DetalhesPedido pedido={this.state.pedido} fecharDetalhesDoPedido={() => this.fecharDetalhesDoPedido()}/> : null }
      </div>
    );
  }
}

export default ListaPedidos;

ListaPedidos.propTypes = {
  titulo: PropTypes.string.isRequired,
  pedidos: PropTypes.object
}
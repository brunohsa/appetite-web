import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

import Pagination from '@material-ui/lab/Pagination';
import CardPedido from '../common/CardPedido';

import '../../../styles/pedidos-component.css';
import '../../../styles/common.css';

const itensPorPaginaDefault = 16

class ListaPedidos extends Component {
  
  constructor(props) {
    super(props);

    let { itensPorPagina } = this.props
    this.state = {
      pagina: 1,
      itensPorPagina: itensPorPagina ? itensPorPagina : itensPorPaginaDefault
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

  renderizarEsqueletoCard(itensPorPagina) {
    return (
      <div style={{paddingLeft: '20px'}}>
        {
          Array.from(Array(itensPorPagina), () =>
            <div className='esqueleto-pedidos'>
              <Grid container wrap="nowrap">
                <Box width={200}>
                  <Skeleton variant="rect" width={200} height={110} />
                  <Box>
                    <Skeleton width="60%" />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Box>
                </Box>
              </Grid>
            </div>
          )
        }
      </div>
    )
  }

  renderizarPedidos(numeroDePaginas) {
    let { pagina, itensPorPagina } = this.state
    let { pedidos, alterarStatusPedido, habilitarAcoes } = this.props
    return (
      <div style={{height: '89%', marginBottom: '10px'}}>
          {
            pedidos && pedidos.length > 0 ? 
              pedidos.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina)
              .map((pedido) => {
                return (
                    <div id={pedido.id} className='list-pedidos-content'> 
                      <CardPedido pedido={pedido} habilitarAcoes={habilitarAcoes} alterarStatusPedido={alterarStatusPedido} /> 
                    </div>
                )
              })
            : this.renderizarSemItens()
          }
          <div className='paginacao-pedidos'>
            <Pagination count={numeroDePaginas} page={pagina} onChange={this.handleChangePage}/>
          </div>
      </div>
    )
  }

  render() {
    let { titulo, pedidos } = this.props
    let { itensPorPagina } = this.state

    let numeroDePaginas = this.props.pedidos ? Math.ceil(pedidos.length / itensPorPagina) : 1
    return (
      <div className='container-conteudos container-pedidos-conteudo'>
        <div>
          <span className='titulo titulo-pedidos'> { titulo } </span>
        </div>
        <div style={{height: '100%', overflow: 'auto'}}>
          { 
            this.props.buscando 
              ? this.renderizarEsqueletoCard(itensPorPagina) 
              : this.renderizarPedidos(numeroDePaginas)
          }
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
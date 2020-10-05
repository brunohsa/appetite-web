import React, {Component} from 'react';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import '../../../styles/pedidos-component.css';
import '../../../styles/common.css';

import CardPedido from '../common/CardPedido';
import DetalhesPedido from '../common/DetalhesPedido';

class TabelaPedidos extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: '',
      pagina: 0,
      linhasPorPagina: 16,
      abrirDetalhes: false,
      pedido: null
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
  }

  handleChangePage(event, newPage) {
    this.setState({
      pagina: newPage
    })
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      linhasPorPagina: parseInt(event.target.value, 10),
      pagina: 0
    })
  }
 
  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => - this.descendingComparator(a, b, orderBy);
  }
  
  stableSort(array, comparator) {
    let stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      let order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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

  render() {
    
    let { order, orderBy, pagina, linhasPorPagina } = this.state
    let { titulo, pedidos } = this.props

    return (
      <div className='container-conteudos container-pedidos-conteudo'>
        <div>
          <span className='titulo titulo-pedidos'> { titulo } </span>
        </div>
        <div style={{height: '89%'}}>
            { 
              this.stableSort(pedidos, this.getComparator(order, orderBy))
              .slice(pagina * linhasPorPagina, pagina * linhasPorPagina + linhasPorPagina)
              .map((pedido) => {

                return (
                  <TableRow style={{display: 'inline-block'}}>
                    <div id={pedido.id} className='list-pedidos-content' onClick={() => this.abrirDetalhesDoPedido(pedido)}> 
                      <CardPedido pedido={pedido} habilitarAcoes={true} /> 
                    </div>
                  </TableRow>
                );
              })
            }
          </div>
          <TablePagination
            rowsPerPageOptions={linhasPorPagina}
            component="div"
            count={pedidos.length}
            rowsPerPage={linhasPorPagina}
            page={pagina}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
            { 
              this.state.abrirDetalhes ? <DetalhesPedido pedido={this.state.pedido} fecharDetalhesDoPedido={() => this.fecharDetalhesDoPedido()}/> : null
            }
      </div>
    );
  }
}

export default TabelaPedidos;
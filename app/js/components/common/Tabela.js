import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import EnhancedTableHead from './tabela/EnhancedTableHead'
import EnhancedTableToolbar from './tabela/EnhancedTableToolbar'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
})

class Tabela extends Component {
  
  constructor(props) {
    super(props);

    let linhas = this.props.linhasPorPagina ? this.props.linhasPorPagina : 5
    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      page: 0,
      rowsPerPage: linhas
    }

    this.handleRequestSort = this.handleRequestSort.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.remover = this.remover.bind(this)
  }

  handleRequestSort(event, property) {
    let { orderBy, order } = this.state
    let isAsc = orderBy === property && order === 'asc'
    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    })
  }

  handleChangePage(event, newPage) {
    this.setState({
      page: newPage
    })
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    })
  }

  handleSelectAllClick(event) {
    let newSelecteds = []
    if (event.target.checked) {
      newSelecteds = this.props.tabelaModelo.linhas.map(n => n.id);
    }
    
    this.setState({ selected: newSelecteds })
  }

  handleClick(event, name) {
    if(!this.props.habilitarCheckBox) {
      return
    }
    let { selected } = this.state

    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({
      selected: newSelected
    })
  }

  isSelected(name) {
    return this.state.selected.indexOf(name) !== -1;
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

  remover() {
    let { selected } = this.state
    
    this.props.remover(selected)
    this.setState({selected: []})
  }

  desenharLinhas() {
    if(!this.props.tabelaModelo.linhas && !this.props.tabelaModelo.linhas) {
      return null
    }
    let mininoDeLinhas = (this.state.rowsPerPage * (this.state.page + 1)) - this.props.tabelaModelo.linhas.length
    let linhasParaDesenhar = mininoDeLinhas > 0 ? mininoDeLinhas : 0
    return (
      Array.from(Array(linhasParaDesenhar), () => 
        <TableRow style={{height: '53px'}}>
        </TableRow>
      )
    )
  }

  render() {
      let { selected, order, orderBy, page, rowsPerPage } = this.state
      let { classes, headerToolbar, tabelaModelo, habilitarCheckBox } = this.props

      let linhas = tabelaModelo.linhas

      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            {
              headerToolbar ? <EnhancedTableToolbar numSelected={selected.length} headerToolbar={headerToolbar} remover={this.remover}/> : null
            }
            <TableContainer>
              <Table>
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={linhas.length}
                  tabelaModelo={tabelaModelo}
                  habilitarCheckBox={habilitarCheckBox}
                />
                <TableBody>
                  { this.stableSort(linhas, this.getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((linha, index) => {
                      let isItemSelected = this.isSelected(linha.id);
                      let labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => this.handleClick(event, linha.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={linha.id}
                          selected={isItemSelected}
                        >
                          { 
                            habilitarCheckBox ? 
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{'aria-labelledby': labelId }}
                              />
                            </TableCell> : null
                          }
                          { linha.valores.map(valor => <TableCell align="center">{valor}</TableCell>) }
                        </TableRow>
                      );
                    })
                  }
                  {
                    this.desenharLinhas()
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={rowsPerPage}
              component="div"
              count={linhas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              nextIconButtonText="Próxima página"
              backIconButtonText="Página anterior"
              labelDisplayedRows={() => `${page + 1} de ${Math.ceil(this.props.tabelaModelo.linhas.length  / rowsPerPage)}`}
            />
          </Paper>
        </div>
      );
  }
}

export default withStyles(styles)(withTheme(Tabela));

Tabela.propTypes = {
  classes: PropTypes.object.isRequired,
  headerToolbar: PropTypes.func.isRequired,
  tabelaModelo: PropTypes.shape({
    colunas: PropTypes.shape({
      id: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired
    })
  }),
  habilitarCheckBox: PropTypes.bool,
  remover: PropTypes.func
}
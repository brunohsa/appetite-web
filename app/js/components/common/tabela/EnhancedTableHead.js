import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles, withTheme } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
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
  },
})

class EnhancedTableHead extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,  tabelaModelo, habilitarCheckBox } = this.props
  
    let colunas = tabelaModelo.colunas

    let createSortHandler = (property) => (event) => { onRequestSort(event, property) }

    function criarColunas(coluna) {
      return (
        <TableCell
          key={coluna.id}
          align='center'
          padding={coluna.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === coluna.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === coluna.id}
            direction={orderBy === coluna.id ? order : 'asc'}
            onClick={createSortHandler(coluna.id)}
          >
            { coluna.titulo }
            {
              orderBy === coluna.id ?
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              : null
            }
          </TableSortLabel>
        </TableCell>
      )
    }

    return ( 
      <TableHead>
        <TableRow>
          {
            habilitarCheckBox ? 
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell> 
            : null
          }
          {
            colunas.map((coluna) => criarColunas(coluna))
          }
        </TableRow>
    </TableHead>
    );
  }
}

export default withStyles(styles)(withTheme(EnhancedTableHead))

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  tabelaModelo: PropTypes.object.isRequired,
  habilitarCheckBox: PropTypes.bool
}
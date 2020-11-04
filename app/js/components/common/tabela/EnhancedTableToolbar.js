import React, { Component } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { withStyles, lighten, withTheme } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  }
})

class EnhancedTableToolbar extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let { classes, numSelected, headerToolbar, remover } = this.props
    
    function criarTypography(titulo, variant) {
        return (
          <Typography className={classes.title} color="inherit" variant={variant} component="div">
            { titulo }
          </Typography>
        )
    }

    return (
    <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}>
      { numSelected > 0 ? criarTypography(`${numSelected} selecionado(s)`, 'subtitle1') : headerToolbar() }
      {
        numSelected > 0 ?
          <Tooltip title="Deletar" onClick={remover}>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        : null
      }
    </Toolbar>
    );
  }
}

export default withStyles(styles)(withTheme(EnhancedTableToolbar))

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  headerToolbar: PropTypes.func.isRequired,
  remover: PropTypes.func.isRequired
}
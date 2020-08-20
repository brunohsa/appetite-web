import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import CadastrarEditarCardapio from './CadastrarEditarCardapio'

const styles = {
  dialogPaper: {
      minHeight: '90%',
      maxHeight: '90%',
  },
};

class CadastrarCardapioDialog extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { classes, abrirDialog, fecharDialog } = this.props
   
    return (
      <Dialog 
        classes={{ paper: classes.dialogPaper }}
        fullWidth={true}
        maxWidth={'xl'}
        open={abrirDialog} 
        onClose={fecharDialog}>
        <DialogTitle id="max-width-dialog-title">Novo cardápio </DialogTitle>
        <DialogContent>
          <CadastrarEditarCardapio />
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialog}> Fechar </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(CadastrarCardapioDialog)
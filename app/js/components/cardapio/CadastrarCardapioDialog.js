import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const MENSAGEM_ERRO_CAMPO_OBRIGATORIO = '* Campo Obrigatório'

const styles = {
  dialogPaper: {
      minHeight: '25%',
      maxHeight: '25%',
  },
};

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      width: '550px',
      '& fieldset': {
        borderColor: '#484848',
      },
      '&:hover fieldset': {
        borderColor: '#A8A8A8',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#A8A8A8',
      }
    }
  }
})(TextField);


class CadastrarCardapioDialog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nome: '',
      erros: null
    }

    this.criarCardapio = this.criarCardapio.bind(this)
  }

  handlerChange(state, valor) {
    this.setState({
      [state]: valor
    })
  }

  criarCardapio() {
    if(this.camposValidos()) {
        this.props.criarCardapio(this.state.nome)
        this.props.fecharDialog()
    }
  }

  camposValidos() {
    let possuiErros = false
    possuiErros = this.possuiErros(this.validarCampoObrigatorio('nome', this.state.nome))

    return !possuiErros
  }

  possuiErros(erros) {
    return erros ? Object.keys(erros).length > 0 : false
  }

  validarCampoObrigatorio(campo, value) {
    let erros = this.state.erros
    if(!value || value.trim() === '') {
      erros = {
        ...erros,
        [campo]: MENSAGEM_ERRO_CAMPO_OBRIGATORIO
      }
    } else if(erros) {
      delete erros[campo]
    }

    this.setState({erros: erros})
    return erros
  }

  render() {
    let { classes, abrirDialog, fecharDialog } = this.props
    let { nome, erros } = this.state

    return (
      <Dialog 
        classes={{ paper: classes.dialogPaper }}
        fullWidth={true}
        maxWidth={'sm'}
        open={abrirDialog} 
        onClose={fecharDialog}>
        <DialogTitle id="max-width-dialog-title"> Novo cardápio </DialogTitle>
        <DialogContent>
          <CustomTextField
              required
              label='Nome do Cardápio'
              id="txt-valor"
              variant="outlined"
              value={nome}
              error={erros ? erros.nome : null} 
              helperText={erros ? erros.nome : null}
              onChange={(e) => this.handlerChange('nome', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.criarCardapio}> Criar </Button>
          <Button onClick={fecharDialog}> Fechar </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(CadastrarCardapioDialog)

CadastrarCardapioDialog.propTypes = {
  abrirDialog: PropTypes.bool.isRequired,
  fecharDialog: PropTypes.func.isRequired,
  criarCardapio: PropTypes.func.isRequired
}
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MENSAGEM_ERRO_CAMPO_OBRIGATORIO = '* Campo Obrigatório'

class FormInformacoes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      erros: {
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        telefone: ''
      },
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      telefone: ''
    }
  }

  proximo() {
    if(!this.camposValidos()) {
      return
    }
    this.props.proximo();  
  }

  camposValidos() {
    let state = this.state
    let erros = {
      razaoSocial: this.validarCampoObrigatorio(state.razaoSocial),
      nomeFantasia: this.validarCampoObrigatorio(state.nomeFantasia),
      cnpj: this.validarCampoObrigatorio(state.cnpj),
      telefone: this.validarCampoObrigatorio(state.telefone)
    }
    this.setState({
      erros: erros
    })

    return erros.razaoSocial === '' && erros.nomeFantasia === '' && erros.cnpj === '' && erros.telefone === ''
  }

  validarCampoObrigatorio(value) {
    return value !== null && value !== '' ? '' : MENSAGEM_ERRO_CAMPO_OBRIGATORIO
  }

  handlerChange(campo, event) {
    this.setState({
      [campo]: event.target.value
    })
  }

  render() {
    const props = this.props
    let state = this.state
    let erros = state.erros

    return (
      <div>
        <div>
          <TextField id="txtRazaoSocial" 
                     label="Razão Social" 
                     margin="normal" 
                     value={state.razaoSocial} 
                     error={erros.razaoSocial !== ''} 
                     helperText={erros.razaoSocial}
                     onChange={(event) => this.handlerChange('razaoSocial', event)}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtNomeFantasia" 
                     label="Nome Fantasia" 
                     margin="normal" 
                     value={state.nomeFantasia}
                     error={erros.nomeFantasia !== ''} 
                     helperText={erros.nomeFantasia}
                     onChange={(event) => this.handlerChange('nomeFantasia', event)}
                     style={{width: '55%'}}/>
        </div>
        <div> 
          <TextField id="txtCNPJ"
                     label="CNPJ"
                     type='Number'
                     margin="normal"
                     value={state.cnpj}
                     error={erros.cnpj !== ''} 
                     helperText={erros.cnpj}
                     onChange={(event) => this.handlerChange('cnpj', event)}
                     style={{width: '27.5%', paddingRight: '20px'}}/>

          <TextField id="txtTelefone" 
                     label="Telefone com DDD" 
                     type='Number'
                     margin="normal" 
                     value={state.telefone}
                     error={erros.telefone !== ''} 
                     helperText={erros.telefone}
                     onChange={(event) => this.handlerChange('telefone', event)}
                     style={{width: '27.5%'}}/> 
        </div>

        <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
          <Button variant="contained" style={{backgroundColor: 'rgb(183, 28, 28)', color: 'white'}} onClick={() => this.proximo()} className={props.class}> Próximo </Button>
        </div>
    </div>
    )
  }
}

export default FormInformacoes
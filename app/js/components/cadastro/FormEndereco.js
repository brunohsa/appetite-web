import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MENSAGEM_ERRO_CAMPO_OBRIGATORIO = '* Campo Obrigatório'

class FormEndereco extends Component {

  constructor(props) {
    super(props)

    this.state = {
      erros: {
        cep: '',
        endereco: '',
        numero: '',
        bairro: '',
        estado: '',
        cidade: ''
      },
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      estado: '',
      cidade: ''
    }
  }

  handlerChange(campo, event) {
    this.setState({
      [campo]: event.target.value
    })
  }

  proximo() {
    if(!this.camposValidos()) {
      return
    }
    this.props.proximo();  
  }

  camposValidos() {
    let erros = {
      cep: this.validarCampoObrigatorio(this.state.cep),
      endereco: this.validarCampoObrigatorio(this.state.endereco),
      numero: this.validarCampoObrigatorio(this.state.numero),
      bairro: this.validarCampoObrigatorio(this.state.bairro),
      estado: this.validarCampoObrigatorio(this.state.estado),
      cidade: this.validarCampoObrigatorio(this.state.cidade)
    }
    
    this.setState({ erros: erros })
    return erros.cep === '' && erros.endereco === '' && erros.numero === '' && erros.bairro === '' && erros.estado === '' && erros.cidade === ''
  }

  validarCampoObrigatorio(value) {
    return value !== null && value !== '' ? '' : MENSAGEM_ERRO_CAMPO_OBRIGATORIO
  }

  render() {
    let props = this.props
    let state = this.state
    let erros = state.erros

    return (
      <div>
        <div>
          <TextField id="txtCEP" 
                     label="CEP" 
                     type='Number' 
                     value={state.cep} 
                     onChange={(event) => this.handlerChange('cep', event)} 
                     error={erros.cep != ''} 
                     helperText={erros.cep}
                     style={{width: '55%'}}/>
        </div>
        <div style={{paddingTop:'10px'}}>
          <TextField id="txtEndereco" 
                     label="Endereco" 
                     value={state.endereco} 
                     onChange={(event) => this.handlerChange('endereco', event)} 
                     error={erros.endereco != ''} 
                     helperText={erros.endereco}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtNumero" 
                     label="Número"
                     margin="normal"
                     value={state.numero} 
                     onChange={(event) => this.handlerChange('numero', event)}  
                     error={erros.numero != ''} 
                     helperText={erros.numero}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtBairro" 
                     label="Bairro" 
                     value={state.bairro} 
                     onChange={(event) => this.handlerChange('bairro', event)}  
                     error={erros.bairro != ''} 
                     helperText={erros.bairro}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtEstado" 
                     label="Estado" 
                     margin="normal" 
                     value={state.estado} 
                     onChange={(event) => this.handlerChange('estado', event)}  
                     error={erros.estado != ''} 
                     helperText={erros.estado}
                     style={{width: '27.5%', paddingRight: '20px'}}/>

          <TextField id="txtCidade" 
                     label="Cidade" 
                     margin="normal" 
                     value={state.cidade} 
                     onChange={(event) => this.handlerChange('cidade', event)}  
                     error={erros.cidade != ''} 
                     helperText={erros.cidade}
                     style={{width: '27.5%'}}/> 
        </div>

        <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
          <Button variant="contained"style={{backgroundColor: 'rgb(183, 28, 28)', color: 'white'}} onClick={()=> this.proximo()} className={props.class}> Finalizar </Button>
        </div>
    </div>
    )
  }
}

export default FormEndereco
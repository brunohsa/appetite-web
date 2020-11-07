import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

import MaskedInput from 'react-text-mask';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MENSAGEM_ERRO_CAMPO_OBRIGATORIO = '* Campo Obrigatório'

class FormInformacoes extends Component {

  constructor(props) {
    super(props)

    let { informacoes } = this.props.fornecedorStore
    this.state = {
      erros: {
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        telefone: ''
      },
      razaoSocial: informacoes ? informacoes.razaoSocial : '',
      nomeFantasia: informacoes ? informacoes.nomeFantasia : '',
      cnpj: informacoes ? informacoes.cnpj : '',
      telefone: informacoes ? informacoes.telefone : '',
    }
  }

  proximo() {
    if(!this.camposValidos()) {
      return
    }
    
    let informacoes = {
      razaoSocial: this.state.razaoSocial,
      nomeFantasia: this.state.nomeFantasia,
      cnpj: this.state.cnpj,
      telefone: this.state.telefone
    }
    this.props.informacoesFornecedor(informacoes)
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

  TextMaskTelefone(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/ , "-" , /\d/, /\d/, /\d/, /\d/, /\d/ ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

  TextMaskCNPJ(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[1-9]/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
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
                     margin="normal"
                     value={state.cnpj}
                     error={erros.cnpj !== ''} 
                     helperText={erros.cnpj}
                     onChange={(event) => this.handlerChange('cnpj', event)}
                     style={{width: '27.5%', paddingRight: '20px'}}
                     InputProps={{ inputComponent: this.TextMaskCNPJ}}/>

          <TextField id="txtTelefone" 
                     label="Telefone"
                     margin="normal" 
                     value={state.telefone}
                     error={erros.telefone !== ''} 
                     helperText={erros.telefone}
                     onChange={(event) => this.handlerChange('telefone', event)}
                     style={{width: '27.5%'}}
                     InputProps={{ inputComponent: this.TextMaskTelefone}}/> 
        </div>

        <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
          <Button variant="contained" style={{backgroundColor: 'rgb(183, 28, 28)', color: 'white'}} onClick={()=> this.props.voltar()} className={props.class}> Voltar </Button>
          <Button variant="contained" style={{backgroundColor: 'rgb(183, 28, 28)', color: 'white'}} onClick={() => this.proximo()} className={props.class}> Próximo </Button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      fornecedorStore: state.fornecedor
  }
}

export default connect(mapStateToProps)(FormInformacoes)

FormInformacoes.propTypes = {
  informacoesFornecedor: PropTypes.func.isRequired,
  voltar: PropTypes.func.isRequired,
  proximo: PropTypes.func.isRequired,
  class: PropTypes.string.isRequired
}
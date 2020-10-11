import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import { connect } from 'react-redux'

const REGEX_CAMPO_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const REGEX_SENHA_FORTE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

const MENSAGEM_ERRO_CAMPO_OBRIGATORIO = '* Campo Obrigatório'
const EMAIL_INVALIDO = '* Email inválido'
const SENHA_INVALIDA = '* Senha deve conter ao menos, 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial'
const SENHAS_NAO_CONFEREM = '* As senhas não conferem, por favor, confira a senha e digite novamente'

class FormAcesso extends Component {

  constructor(props) {
    super(props)

    this.state = {
      erros: {
        email: '',
        senha: '',
        confirmacaoSenha: ''
      },
      email: '',
      senha: '',
      confirmarSenha: ''
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
    
    let login = {
      email: this.state.email, 
      senha: this.state.senha
    }
    this.props.loginFornecedor(login)
    this.props.proximo();  
  }

  camposValidos() {
    let erros = {
      email: this.validarEmail(),
      senha: this.validarSenha(),
      confirmacaoSenha: this.validarSenhas()
    }
    this.setState({
      erros: erros
    })

    return erros.email === '' && erros.senha === '' && erros.confirmacaoSenha === ''
  }

  validarEmail() {
    let email = this.state.email
    if(!this.campoPreenchido(email)) {
      return MENSAGEM_ERRO_CAMPO_OBRIGATORIO
    }
    if(!REGEX_CAMPO_EMAIL.test(email)) {
      return EMAIL_INVALIDO
    }
    return ''
  }

  validarSenha() {
    let senha = this.state.senha
    if(!this.campoPreenchido(senha)) {
      return MENSAGEM_ERRO_CAMPO_OBRIGATORIO
    }
    if(!REGEX_SENHA_FORTE.test(senha)) {
      return SENHA_INVALIDA
    }
    return ''
  }

  validarSenhas() {
    let confirmacaoSenha = this.state.confirmarSenha
    if(!this.campoPreenchido(confirmacaoSenha)) {
      return MENSAGEM_ERRO_CAMPO_OBRIGATORIO
    }
    if(this.state.senha !== confirmacaoSenha) {
      return SENHAS_NAO_CONFEREM
    }
    return ''
  }

  campoPreenchido(value) {
    return value !== null && value !== ''
  }

  render() {
    const props = this.props
    let state = this.state
    let erros = this.state.erros

    return (
      <div>
        <div>
          <TextField id="txtEmail" 
                     label="Email"
                     margin="normal"
                     value={state.email}
                     error={erros.email !== ''} 
                     helperText={erros.email}
                     onChange={(event) => this.handlerChange('email', event)}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtSenha" 
                     label="Senha"
                     type="password" 
                     margin="normal"
                     value={state.senha}
                     error={erros.senha !== ''} 
                     helperText={erros.senha}
                     onChange={(event) => this.handlerChange('senha', event)}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtConfirmarSenha"
                     label="Confirmar Senha"
                     type="password"
                     margin="normal"
                     value={state.confirmarSenha}
                     error={erros.confirmacaoSenha !== ''} 
                     helperText={erros.confirmacaoSenha}
                     onChange={(event) => this.handlerChange('confirmarSenha', event)}
                     style={{width: '55%'}}/>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
          <Button variant="contained" style={{backgroundColor: 'rgb(183, 28, 28)', color: 'white'}} onClick={()=> this.proximo()} className={props.class}> Próximo </Button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      fornecedor: state.fornecedor
  }
}

export default connect(mapStateToProps)(FormAcesso)

FormAcesso.propTypes = {
  loginFornecedor: PropTypes.func.isRequired,
  voltar: PropTypes.func.isRequired,
  proximo: PropTypes.func.isRequired,
  class: PropTypes.string.isRequired
}
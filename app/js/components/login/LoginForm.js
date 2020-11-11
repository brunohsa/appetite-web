import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux'

import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import '../../../styles/login/login-form.css';

const MENSAGEM_ERRO_CAMPO_OBRIGATORIO = '* Campo Obrigatório'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            email: '',
            senha: '',
            erros: {
                email: '',
                senha: ''
            }
        }
    }

    componentDidUpdate() {
        if(this.props.loginStore.loginRealizado && this.props.cadastroStore.enderecoCadastrado) {
            this.props.history.push("/home");
        }
    }
    
    doLogin() {
        if(this.camposValidos()) {
            this.props.fazerLogin(this.state.email, this.state.senha);
        }
    }

    camposValidos() {
        let erros = {
          email: this.validarCampoObrigatorio(this.state.email),
          senha: this.validarCampoObrigatorio(this.state.senha)
        }
        
        this.setState({ erros: erros })
        return erros.email === '' && erros.senha === ''
    }

    validarCampoObrigatorio(value) {
        return value !== null && value !== '' ? '' : MENSAGEM_ERRO_CAMPO_OBRIGATORIO
    }

    handlerChange(valor, state) {
        this.setState({
            [state]: valor
        }) 
    }

    render() {

        let { erros } = this.state
        let { erro } = this.props

        return (
            <div>
                {
                    erro.mensagem ? <Alert severity="error">{erro.mensagem} </Alert> : null 
                }
                <div style={{position: 'relative', top: '55px'}}>
                    <h1 className='login-title'> Login </h1>
                    <div className="login-form-items">
                        <TextField 
                            id="txtEmail" 
                            label="Email" 
                            error={erros.email} 
                            helperText={erros.email}
                            style={{width: '100%'}} 
                            onChange={(event)=> this.handlerChange(event.target.value, 'email')}/>
                    </div>
                    <div className="login-form-items">
                        <TextField 
                            id="txtSenha" 
                            label="Senha" 
                            type="password" 
                            autoComplete="current-password" 
                            error={erros.senha} 
                            helperText={erros.senha} 
                            margin="normal" 
                            style={{width: '100%'}} 
                            onChange={()=> this.handlerChange(event.target.value, 'senha')}/>
                    </div>
                    <div className="login-form-items" style={{marginTop:'10px'}}>
                        <a href="http://127.0.0.1:3000" className="forgot-password"> Esqueceu a Senha ? </a>
                    </div>
                    <div className="login-form-items"  style={{marginTop:'15px'}}>
                        <Button id="button-login" variant="contained" onClick={() => this.doLogin()}> Entrar </Button>
                    </div>
                    <div style={{textAlign: 'center', position: 'relative', top: '80px'}}>
                        <span style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#3f3f3f', borderRight: '1px solid #3f3f3f'}}> 
                            Não possui uma conta?&nbsp;
                        </span> 
                        <span  style={{paddingLeft:'5px'}}> 
                            <Link to="/cadastro" style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#3f3f3f'}}>Cadastre-se</Link>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginStore: state.login,
        cadastroStore: state.cadastro,
        erro: state.erro
    }
}

export default withRouter(connect(mapStateToProps)(LoginForm));
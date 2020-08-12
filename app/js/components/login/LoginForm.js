import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import '../../../styles/login/login-form.css';


class LoginForm extends Component {

    doLogin() {
        this.props.history.push("/home");
    }

    render() {
        return (
            <div style={{position: 'relative', top: '80px'}}>
                <h1 className='login-title'> Login </h1>
                <div className="login-form-items">
                    <TextField
                        id="standard-name"
                        label="Usuário"
                        margin="normal"
                        error={false}
                        helperText=''
                        style={{width: '100%'}}
                    />
                </div>
                <div className="login-form-items">
                    <TextField
                        id="standard-password-input"
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        error={false}
                        helperText=''
                        margin="normal"
                        style={{width: '100%'}}
                    />
                </div>
                <div className="login-form-items" style={{marginTop:'10px'}}>
                    <a href="http://127.0.0.1:3000" className="forgot-password"> Esqueceu a Senha ? </a>
                </div>
                <div className="login-form-items"  style={{marginTop:'15px'}}>
                    <Button id="button-login" variant="contained" onClick={() => this.doLogin()}> Entrar </Button>
                </div>
                <div style={{textAlign: 'center', position: 'relative', top: '250px'}}>
                    <span style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#3f3f3f', borderRight: '1px solid #3f3f3f'}}> 
                        Não possui uma conta?&nbsp;
                    </span> 
                    <span  style={{paddingLeft:'5px'}}> 
                        <Link to="/cadastro" style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', color: '#3f3f3f'}}>Cadastre-se</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginForm);
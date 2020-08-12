import React, {Component} from 'react';
import LoginBanner from '../components/login/LoginBanner';
import LoginForm from '../components/login/LoginForm';

import '../../styles/login/login.css';

class Login extends Component {

    render() {
        return (
            <div className="login-container">
                <div className="login-content">
                    <div className="login-banner-container"> <LoginBanner /> </div>
                    <div className="login-form-container"> <LoginForm /> </div>             
                </div>
            </div>
        );
    }
}

export default Login;
import React, {Component} from 'react';
import { connect } from 'react-redux'

import LoginBanner from '../components/login/LoginBanner';
import LoginForm from '../components/login/LoginForm';
import loginAPI from '../redux/api/loginAPI'

import '../../styles/login/login.css';

class Login extends Component {

    render() {
        return (
            <div className="login-container">
                <div className="login-content">
                    <div className="login-banner-container"> <LoginBanner /> </div>
                    <div className="login-form-container"> <LoginForm fazerLogin={this.props.fazerLogin}/> </div>             
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fazerLogin: (user, password) => {
            dispatch(loginAPI.fazerLogin(user, password));
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);
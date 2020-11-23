import React, {Component} from 'react';
import { connect } from 'react-redux'

import LoaderComponent from '../components/LoaderComponent'
import loginActions from '../redux/actions/creators/loginActionCreators'

import LoginBanner from '../components/login/LoginBanner';
import LoginForm from '../components/login/LoginForm';
import loginAPI from '../redux/api/loginAPI'

import '../../styles/login/login.css';

class Login extends Component {

    render() {

        let { startLoaderTelaLogin } = this.props.loginStore
        return (
            <div className="login-container">
                { startLoaderTelaLogin ? <LoaderComponent /> : null}
                <div className="login-content">
                    <div className="login-banner-container"> <LoginBanner /> </div>
                    <div className="login-form-container"> <LoginForm fazerLogin={this.props.fazerLogin}/> </div>             
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginStore: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fazerLogin: (user, password) => {
            dispatch(loginActions.startLoaderTelaLogin());
            dispatch(loginAPI.fazerLogin(user, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
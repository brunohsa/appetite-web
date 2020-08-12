import React, { Component } from 'react';

import '../../../styles/login/login-banner.css';

import logoCardapio from '../../../images/logo-cardapio.png';

class LoginBanner extends Component {
    
    render() {
        return (
            <div className="banner-container">
                <div className="banner-content">
                <div style={{position: 'relative', top: '15vh'}}>
                    <a href='/' style={{display: 'inherit'}}>
                        <img src={logoCardapio} style={{maxWidth: '350px', maxHeight: '300px', display: 'inherit', alignItems: 'inherit', justifyContent: 'inherit', margin: 'auto'}} />
                    </a>
                </div>
                </div>
            </div>
        );
    }
}

export default LoginBanner;
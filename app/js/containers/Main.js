import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';
import logoCardapio from '../../images/logo-cardapio.png';

import '../../styles/main/main.css';
import '../../styles/main/main-menu.css';

class Main extends Component {

  navegar(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className='container'>
        <div className='content'>

          <div>
            <ul className='ul-menu-principal'>
                <li id='li-entrar' className='li'>
                  <div id='div-entrar'> <a id='link-entrar' href='/login'>Entrar</a> </div>
                </li>
                <li className='li'>
                  <div style={{color: 'white', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '700', lineHeight: '1.6', textTransform: 'uppercase', fontSize: '24px', paddingLeft: '20px', float: 'left'}}>
                    Appetito
                  </div>
                </li>
            </ul>
          </div>

          <div style={{height: '50%', width: '100%',margin: 'auto',position: 'relative', display: 'flex', alignItems: 'center', paddingTop: '40px'}}>
            <img src={logoCardapio} style={{maxWidth: '15%', maxHeight: '250px', margin: 'auto'}} />
          </div>

          <div style={{textAlign: 'center', position: 'relative',  height: '15%', width: '60%', margin: '0px auto'}}>
            <span style={{fontSize: '200%', fontFamily: 'Arial', fontWeight: '700', lineHeight: '1', color: 'rgb(183, 28, 28)'}}> 
              Não deixe para amanhã, o que você pode comer hoje.
            </span>
            <div>
              <br/>
              <span style={{fontSize: '200%', fontFamily: 'Arial', fontWeight: '700', lineHeight: '1', color: 'rgb(183, 28, 28)'}}> 
                Buon Appetito !
              </span>
            </div>
          </div>

          <div style={{margin: 'auto', position: 'relative', height: '20%', width: '100%', display: 'flex', alignItems: 'center'}}>
              <Button id="btn-cadastro"
                      variant="contained" 
                      style={{margin: 'auto', height: '50px', backgroundColor: 'rgb(183, 28, 28)', color: 'white', borderRadius: '0px', fontWeight: '700', lineHeight: '1.6', textTransform: 'uppercase'}}
                      onClick={() => this.navegar('/cadastro')}> 
                Cadastre-se 
              </Button>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Main);
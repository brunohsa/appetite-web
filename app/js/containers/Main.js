import React, {Component} from 'react';

import '../../styles/main/main.css';
import '../../styles/main/main-menu.css';

import Button from '@material-ui/core/Button';
import logoCardapio from '../../images/logo-cardapio.png';

class Main extends Component {

  render() {
    return (
      <div className='container'>
        <div className='content'>

          <div>
            <ul style={{height: '80px', width: '100%',backgroundColor: '#b71c1c', textAlign: 'center'}}>
                <li style = {{float: 'right'}}>
                  <div> <a id='main' href='/login'>Entrar</a> </div>
                </li>
                <li>
                  <div style={{color: 'white', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '700', lineHeight: '1.6', textTransform: 'uppercase', fontSize: '24px', paddingLeft: '20px'}}> Appetite </div>
                </li>
            </ul>
          </div>

          <div style={{height: '40%', width: '100%',margin: 'auto',position: 'relative', display: 'flex', alignItems: 'center'}}>
            <img src={logoCardapio} style={{maxWidth: '230px', maxHeight: '200px', margin: 'auto'}} />
          </div>

          <div style={{textAlign: 'center', position: 'relative',  height: '15%', width: '100%', display: 'grid', alignItems: 'center'}}>
            <span style={{fontSize: '48px', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '700', lineHeight: '1', textTransform: 'uppercase', color: 'rgb(183, 28, 28)'}}> 
              ALGUM TEXTO CHAMATIVO 
            </span>
          </div>

          <div style={{margin: 'auto', position: 'relative', height: '30%', width: '100%', display: 'flex', alignItems: 'center'}}>
              <Button id="btn-cadastro" variant="contained" style={{margin: 'auto', height: '50px', backgroundColor: 'rgb(183, 28, 28)', color: 'white', borderRadius: '0px', fontWeight: '700', lineHeight: '1.6', textTransform: 'uppercase'}}> 
                Cadastre-se 
              </Button>
          </div>
        </div>
      </div>
    );
  }

}

export default Main;
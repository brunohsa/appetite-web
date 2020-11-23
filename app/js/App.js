import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Main from './containers/Main';
import Login from './containers/Login';
import Home from './containers/Home';
import Cadastro from './containers/Cadastro';
import NotFound from './containers/NotFound';
import Cardapio from './containers/Cardapio'
import Configuracao from './containers/Configuracao'
import EditarCardapio from './containers/EditarCardapio'
import Pedidos from './containers/Pedidos'

import loginActions from './redux/actions/creators/loginActionCreators'

import '../styles/app.css';

class App extends Component {

constructor(props) {
  super(props)
}

usuarioLogado() {
  return localStorage.getItem('token') && localStorage.getItem('podeRedirecionar');
}

componentDidUpdate() {
  if(this.props.loginStore.fazerLogout) {
    this.props.logoutRealizado()
    this.props.history.push("/");
  }
}

direcionarUsuarioNaoLogado(component) {
  return !this.usuarioLogado() ? <Redirect to='/'/> : component
}

direcionarUsuarioLogado(component) {
  return this.usuarioLogado() ? <Redirect to='/home'/> : component
}

render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path='/' render={() => this.direcionarUsuarioLogado(<Main />)}/>
          <Route path='/home' render={() => this.usuarioLogado() ? <Home /> : <Redirect to='/login'/> }/>
          <Route path='/login' render={() => this.direcionarUsuarioLogado(<Login />)}/>
          <Route path='/cadastro' render={() => this.direcionarUsuarioLogado(<Cadastro />)}/>
          <Route path='/cardapios' render={() => this.direcionarUsuarioNaoLogado(<Cardapio />)}/>
          <Route path='/configuracoes' render={() => this.direcionarUsuarioNaoLogado(<Configuracao />)}/>
          <Route path='/cardapios-editar/:cardapioId' render={(routerProps) => this.direcionarUsuarioNaoLogado(<EditarCardapio cardapioId={routerProps.match.params.cardapioId}/>)}/>
          <Route path='/pedidos' render={() => this.direcionarUsuarioNaoLogado(<Pedidos />)}/>
          <Route path='/pagina-nao-encontrada' component={NotFound}/>
          <Redirect to="/pagina-nao-encontrada" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loginStore: state.login,
      erro: state.erro
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logoutRealizado: () => {
          dispatch(loginActions.logoutRealizado());
      }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
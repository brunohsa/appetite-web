import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Main from './containers/Main';
import Login from './containers/Login';
import Home from './containers/Home';
import Cadastro from './containers/Cadastro';
import NotFound from './containers/NotFound';
import Cardapio from './containers/Cardapio'
import Configuracao from './containers/Configuracao'
import EditarCardapio from './containers/EditarCardapio'
import Pedidos from './containers/Pedidos'

import '../styles/app.css';

class App extends Component {

constructor(props) {
  super(props)
}

checkAuthentication() {
  return localStorage.getItem('token');
}

render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path='/' render={() => this.checkAuthentication() ? <Redirect to='/home'/> : <Main /> }/>
          <Route path='/home' render={() => this.checkAuthentication() ? <Home /> : <Redirect to='/login'/> }/>
          <Route path='/login' render={() => this.checkAuthentication() ? <Redirect to='/home'/> : <Login /> }/>
          <Route path='/cadastro' render={() => this.checkAuthentication() ? <Redirect to='/home'/> : <Cadastro /> }/>
          <Route path='/cardapios' component={Cardapio}/>
          <Route path='/configuracoes' component={Configuracao}/>
          <Route path='/cardapios-editar/:cardapioId' component={(routerProps) => <EditarCardapio cardapioId={routerProps.match.params.cardapioId} />}/>
          <Route path='/pedidos' component={Pedidos}/>
          <Route path='/pagina-nao-encontrada' component={NotFound}/>
          <Redirect to="/pagina-nao-encontrada" />
        </Switch>
      </div>
    );
  }
}

export default App;
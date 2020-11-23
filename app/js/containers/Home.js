import React, {Component}from 'react';
import { connect } from 'react-redux'

import MenuApp from '../components/MenuApp';
import HomeComponent from '../components/HomeComponent';

import carrinhoAPI from '../redux/api/carrinhoAPI'
import cardapioAPI from '../redux/api/cardapioAPI'

import carrinhoActions from '../redux/actions/creators/carrinhoActionCreators'
import cardapioActions from '../redux/actions/creators/cardapioActionCreators'

import '../../styles/home.css';
import '../../styles/common.css';

class Home extends Component {

    constructor(props) {
      super(props)
    }

    componentDidMount() {
      this.props.buscarUltimosPedidos()
      this.props.buscarProdutosMelhoresAvaliados()
      this.props.buscarProdutosMaisVendidos()
    }

    render() {
        return (
          <div style={{height: '100%', width: '100%'}}>
            <div> 
              <MenuApp />
            </div>
            <div style={{height: '90%', overflow: 'auto'}}> 
              <HomeComponent /> 
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      carrinho: state.carrinho,
      erro: state.erro
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      buscarUltimosPedidos: () => {
          dispatch(carrinhoActions.startLoaderResumoPedidos());
          dispatch(carrinhoAPI.buscarUltimosPedidos());
      },
      buscarProdutosMelhoresAvaliados: () => {
        dispatch(cardapioActions.startLoaderBuscaProdutosMelhoresAvaliados());
        dispatch(cardapioAPI.buscarProdutosMelhoresAvaliados());
      },
      buscarProdutosMaisVendidos: () => {
        dispatch(cardapioActions.startLoaderBuscaPedidosMaisVendidos());
        dispatch(cardapioAPI.buscarProdutosMaisVendidos());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
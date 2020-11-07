import React, {Component}from 'react';
import { connect } from 'react-redux'

import MenuApp from '../components/MenuApp';
import HomeComponent from '../components/HomeComponent';

import carrinhoAPI from '../redux/api/carrinhoAPI'
import cardapioAPI from '../redux/api/cardapioAPI'

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
            <div> <MenuApp /> </div>
            <div style={{height: '90%'}}> <HomeComponent /> </div>
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
          dispatch(carrinhoAPI.buscarUltimosPedidos());
      },
      buscarProdutosMelhoresAvaliados: () => {
        dispatch(cardapioAPI.buscarProdutosMelhoresAvaliados());
      },
      buscarProdutosMaisVendidos: () => {
        dispatch(cardapioAPI.buscarProdutosMaisVendidos());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
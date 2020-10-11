import React, {Component}from 'react';

import { connect } from 'react-redux'

import MenuApp from '../components/MenuApp';
import CardPedido from '../components/common/CardPedido';
import DetalhesPedido from '../components/common/DetalhesPedido';
import Tabela from '../components/common/Tabela';

import carrinhoAPI from '../redux/api/carrinhoAPI'

import TabelaModelo from '../modelos/TabelaModelo'

import '../../styles/home.css';

class Home extends Component {

    constructor(props) {
      super(props)

      this.state = {
          abrirDetalhes: false,
          pedido: null
      }
    }

    componentDidMount() {
      this.props.buscarUltimosPedidos()
    }

    abrirDetalhesDoPedido(pedido) {
      this.setState({
        abrirDetalhes: true,
        pedido: pedido
      })
    }

    fecharDetalhesDoPedido() {
      this.setState({
        abrirDetalhes: false
      })
    }

    getTabelaModeloMaisVendidos() {    
      let colunas = [
        { id: 'posicao', titulo: 'Posição' },
        { id: 'produto', titulo: 'Produto' },
        { id: 'qtdVenda',  titulo: 'Vendidos' }
      ];
  
      let linhas =[]
  
      return new TabelaModelo(colunas, linhas)
    }

    getTabelaModeloMelhoresAvaliados() {    
      let colunas = [
        { id: 'posicao', titulo: 'Posição' },
        { id: 'produto', titulo: 'Produto' },
        { id: 'nota',  titulo: 'Nota' }
      ];
  
      let linhas =[]
  
      return new TabelaModelo(colunas, linhas)
    }

    render() {

        let { pedidos } = this.props.carrinho

        return (
          <div id='home-container'>
            <div className='home-menu-container'>
              <MenuApp />
            </div>
            <div className='home-content-container'>
              <div id='header-home'> 
                <span className='title-header-home'> Resumo </span> 
              </div>
              <div className='list-pedidos-container'>
                <div className='div-informativos'>
                  <span className='lbl-informativos'> Últimos Pedidos </span>
                </div>
                <div id='lista-de-pedidos'>
                  { 
                    pedidos ?
                      pedidos.map(pedido => 
                      <div id={pedido.id} className='list-pedidos-content' onClick={() => this.abrirDetalhesDoPedido(pedido)}> 
                        <CardPedido pedido={pedido} /> 
                      </div>
                    ) : null
                  }
                </div>
              </div>
              <div className='home-card'>
                <span className='lbl-card'> Mais Vendidos </span>
                <div style={{paddingTop: '10px'}}>
                  <Tabela linhas={[]}  tabelaModelo={this.getTabelaModeloMaisVendidos()}/>
                </div>
              </div>
              <div className='home-card' style={{float: 'right'}}>
                <span className='lbl-card'> Melhores Avalidados </span>
                <div style={{paddingTop: '10px'}} >
                  <Tabela linhas={[]}  tabelaModelo={this.getTabelaModeloMelhoresAvaliados()}/>
                </div>
              </div>
            </div>
            { 
              this.state.abrirDetalhes ? <DetalhesPedido pedido={this.state.pedido} fecharDetalhesDoPedido={() => this.fecharDetalhesDoPedido()}/> : null
            }
          </div>
        );
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
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
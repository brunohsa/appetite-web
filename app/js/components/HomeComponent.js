import React, {Component}from 'react'
import { connect } from 'react-redux'

import LoaderComponent from './LoaderComponent'

import ListaPedidos from './pedidos/ListaPedidos';
import Tabela from './common/Tabela'

import TabelaModelo from '../modelos/TabelaModelo'

import '../../styles/home.css'
import '../../styles/common.css'

class HomeComponent extends Component {

    constructor(props) {
      super(props)
    }

    getTabelaModeloMaisVendidos() {    
      let colunas = [
        { id: 'posicao', titulo: 'Posição' },
        { id: 'produto', titulo: 'Produto' },
        { id: 'qtdVenda',  titulo: 'Vendidos' }
      ];
  
      let { produtosMaisVendidos } = this.props.cardapioStore
      let linhas = produtosMaisVendidos
                  ? produtosMaisVendidos.map((produto, index) => this.montarLinhaProdutoMaisVendidos(produto, index + 1)) 
                  : []
                  
      return new TabelaModelo(colunas, linhas)
    }

    montarLinhaProdutoMaisVendidos(produto, index) {
      let linha = {
        id: produto.id,
        valores: [index, produto.nome, produto.vendidos] 
      }
      return linha
    }

    getTabelaModeloMelhoresAvaliados() {    
      let colunas = [
        { id: 'posicao', titulo: 'Posição' },
        { id: 'produto', titulo: 'Produto' },
        { id: 'nota',  titulo: 'Nota' }
      ];
  
      let { produtosMelhoresAvaliados } = this.props.cardapioStore
      let linhas = produtosMelhoresAvaliados 
                  ? produtosMelhoresAvaliados.map((produto, index) => this.montarLinhaProdutoMelhorAvaliado(produto, index + 1)) 
                  : []

      return new TabelaModelo(colunas, linhas)
    }

    montarLinhaProdutoMelhorAvaliado(produto, index) {
      let linha = {
        id: produto.id,
        valores: [index, produto.nome, produto.nota] 
      }
      return linha
    }

    renderizarUltimosPedidos() {
      let { pedidos, buscandoResumoDePedidos } = this.props.carrinhoStore
      let itensPorPagina = Math.ceil((window.screen.width * 0.92) / 230)
      return (
        <div className='list-pedidos-container'>
            <ListaPedidos 
              titulo='Últimos Pedidos' 
              buscando={buscandoResumoDePedidos} 
              pedidos={pedidos} 
              itensPorPagina={itensPorPagina} 
              habilitarAcoes={false}/>
        </div>
      )
    }

    renderizarLoader() {
      return (
          <div className='home-card-loader'>
              <LoaderComponent />
          </div>
      )
    }

    renderizarMaisPedidos() {
      let { buscandoPedidosMaisVendidos } = this.props.cardapioStore
      let itensPorPagina = Math.trunc((window.screen.height * 0.25) / 53)
      return (
        <div className='home-card'>
          <span className='titulo'> Mais Vendidos </span>
          {
            buscandoPedidosMaisVendidos 
              ? this.renderizarLoader() 
              : <div style={{paddingTop: '15px'}}>
                  <Tabela linhasPorPagina={itensPorPagina} tabelaModelo={this.getTabelaModeloMaisVendidos()}/>
                </div>
          }
        </div>
      )
    }

    renderizarMelhoresAvaliados() {
      let { buscandoProdutosMelhoresAvaliados } = this.props.cardapioStore
      let itensPorPagina =  Math.trunc((window.screen.height * 0.25) / 53)
      return (
        <div className='home-card' style={{float: 'right'}}>
          <span className='titulo'> Melhores Avalidados </span>
          {
            buscandoProdutosMelhoresAvaliados 
              ? this.renderizarLoader()
              : <div style={{paddingTop: '15px'}} >
                  <Tabela linhasPorPagina={itensPorPagina} tabelaModelo={this.getTabelaModeloMelhoresAvaliados()}/>
                </div>
          }
        </div>
      )
    }

    render() {
        return (
          <div className='home-content-container'>
            { this.renderizarUltimosPedidos() }
            { this.renderizarMaisPedidos() }
            { this.renderizarMelhoresAvaliados() }
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      carrinhoStore: state.carrinho,
      cardapioStore: state.cardapio
  }
}

export default connect(mapStateToProps)(HomeComponent)
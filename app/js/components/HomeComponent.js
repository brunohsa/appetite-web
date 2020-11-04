import React, {Component}from 'react'
import { connect } from 'react-redux'

import CardPedido from './common/CardPedido'
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
  
      let linhas = []
  
      return new TabelaModelo(colunas, linhas)
    }

    montarLinhaProdutoMelhorAvaliado(produto, index) {
      let linha = {
        id: produto.id,
        valores: [index, produto.nome, produto.nota] 
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

    render() {
        let { pedidos } = this.props.carrinhoStore

        return (
          <div className='home-content-container'>
            <div className='list-pedidos-container'>
              <div className='div-informativos'>
                <span className='lbl-informativos'> Últimos Pedidos </span>
              </div>
              <div id='lista-de-pedidos'>
                { 
                  pedidos && pedidos.length > 0 
                  ? pedidos.map(pedido => 
                      <div id={pedido.id} className='list-pedidos-content'> 
                        <CardPedido pedido={pedido} /> 
                      </div>
                    )
                  : <div className='sem-pedidos-recentes'> 
                        <span className='titulo'> Ainda não possui nenhum pedido recente. </span> 
                    </div>
                }
              </div>
            </div>
            <div className='home-card'>
              <span className='lbl-card'> Mais Vendidos </span>
              <div style={{paddingTop: '10px', width: '100%', height: '100%'}}>
                <Tabela linhasPorPagina={4} tabelaModelo={this.getTabelaModeloMaisVendidos()}/>
              </div>
            </div>
            <div className='home-card' style={{float: 'right'}}>
              <span className='lbl-card'> Melhores Avalidados </span>
              <div style={{paddingTop: '10px'}} >
                <Tabela linhasPorPagina={4}  tabelaModelo={this.getTabelaModeloMelhoresAvaliados()}/>
              </div>
            </div>
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
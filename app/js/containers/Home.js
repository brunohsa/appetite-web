import React, {Component}from 'react';

import MenuApp from '../components/MenuApp';
import CardPedido from '../components/CardPedido';
import DetalhesPedido from '../components/DetalhesPedido';

import '../../styles/home.css';

let pedidos = [
  {
    id: '1234',
    numero: '00000001',
    status: 'PENDENTE',
    produtos: [
      {
        id: '5dcc9cae11ca5339e8b762d5',
        nome: 'X-Tudo',
        quantidade: 2,
        valor: 10.00,
        observacao: 'Sem Tomate'
      },
      {
        id: '5dcc9cae11ca5339e8b762d5',
        nome: 'Coca-Cola',
        quantidade: 1,
        valor: 2.50
      }
    ],
    cliente: {
      nome: 'Bruno Araujo',
      telefone: '(19) 98356-2724'
    }
  },
  {
    id: '1234',
    numero: '00000002',
    status: 'PREPARANDO',
    produtos: [
      {
        id: '5dcc9cae11ca5339e8b762d5',
        nome: 'X-Tudo',
        quantidade: 2,
        valor: 10.00,
        observacao: 'Sem Tomate'
      }
    ],
    cliente: {
      nome: 'Bruno Araujo',
      telefone: '(19) 98356-2724'
    }
  },
  {
    id: '1234',
    numero: '00000003',
    status: 'CONCLUIDO',
    produtos: [
      {
        id: '5dcc9cae11ca5339e8b762d5',
        nome: 'X-Tudo',
        quantidade: 2,
        valor: 10.00
      }
    ],
    cliente: {
      nome: 'Beatriz Carvalho',
      telefone: '(19) 98356-2724'
    }
  },
  {
    id: '1234',
    numero: '00000004',
    status: 'CANCELADO',
    produtos: [
      {
        id: '5dcc9cae11ca5339e8b762d5',
        nome: 'X-Tudo',
        quantidade: 2,
        valor: 10.00,
        observacao: 'Sem Tomate'
      }
    ],
    cliente: {
      nome: 'Beatriz Carvalho',
      telefone: '(19) 98356-2724'
    }
  }
]

class Home extends Component {

    constructor(props) {
      super(props)

      this.state = {
          abrirDetalhes: false,
          pedido: null
      }
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

    render() {
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
                    pedidos.map(pedido => 
                      <div id={pedido.id} className='list-pedidos-content' onClick={() => this.abrirDetalhesDoPedido(pedido)}> 
                        <CardPedido pedido={pedido} /> 
                      </div>
                    )
                  }
                </div>
              </div>
              <div className='home-card'>
                <div className='div-home-cards'>
                  <span className='lbl-card'> Mais Vendidos </span>
                </div>
              </div>
              <div className='home-card' style={{float: 'right'}}>
                <div className='div-home-cards'>
                  <span className='lbl-card'> Melhores Avalidados </span>
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

export default Home;
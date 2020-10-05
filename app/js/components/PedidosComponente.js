import React, {Component} from 'react';

import '../../styles/pedidos-component.css';
import TabelaPedidos from './pedidos/TabelaPedidos';


let pedidosPendentes = [
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
  }
]

let pedidosEmPreparo = [
  {
    id: '1234',
    numero: '10000000',
    status: 'PREPARANDO',
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
  }
]

let pedidosConcluidos = [
  {
    id: '1234',
    numero: '12000000',
    status: 'CONCLUIDO',
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
  }
]

class PedidosComponente extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container-pedidos'>
        <TabelaPedidos titulo='Pedidos Pendentes' pedidos={pedidosPendentes}/>
        <TabelaPedidos titulo='Pedidos em Preparo' pedidos={pedidosEmPreparo}/>
        <TabelaPedidos titulo='Pedidos Concluídos' pedidos={pedidosConcluidos}/>
      </div>    
    );
  }
}

export default PedidosComponente;
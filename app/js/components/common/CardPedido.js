import React, {Component}from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DetalhesPedido from './DetalhesPedido'

import '../../../styles/common/card-pedido.css';

const statusPedido = {
  PENDENTE_PREPARACAO: 'PENDENTE_PREPARACAO',
  PREPARANDO: 'PREPARANDO',
  CONCLUIDO: 'CONCLUIDO',
  CANCELADO: 'CANCELADO'
}

class CardPedido extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      abrirDetalhes: false
    }

    this.abrirDetalhesDoPedido = this.abrirDetalhesDoPedido.bind(this)
    this.fecharDetalhesDoPedido = this.fecharDetalhesDoPedido.bind(this)
  }

  abrirDetalhesDoPedido() {
    this.setState({ abrirDetalhes: true })
  }

  fecharDetalhesDoPedido() {
    this.setState({ abrirDetalhes: false })
  }

  render() {
      const { pedido, habilitarAcoes } = this.props

      function getEstiloHeader(status) {
        switch(status) {
          case statusPedido.PENDENTE_PREPARACAO:
            return 'div-card-header-pendente'
          case statusPedido.PREPARANDO:
            return 'div-card-header-preparando'
          case statusPedido.CONCLUIDO:
            return 'div-card-header-concluido'
          case statusPedido.CANCELADO:
            return 'div-card-header-cancelado'
        }
      }

      function getStatusCard(status) {
        switch(status) {
          case statusPedido.PENDENTE_PREPARACAO:
            return 'Pendente preparação'
          case statusPedido.PREPARANDO:
            return 'Preparando'
          case statusPedido.CONCLUIDO:
            return 'Concluído'
          case statusPedido.CANCELADO:
            return 'Cancelado'
        }
      }

      return (
        <Card id='card-pedido'>
          <CardActionArea onClick={this.abrirDetalhesDoPedido}>
            <div className={`div-card-header ${getEstiloHeader(pedido.status)}`}>
              <span className='span-card-header'>#{pedido.numero}</span>
            </div>
            <CardContent style={{padding: '5px 16px 5px 16px'}}>
              <Typography gutterBottom variant="h5" component="h2">
                <div className='ellipsis-texts'>
                  {pedido.cliente.nome}
                </div>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <div>
                  <span> Hora: 12:25 </span>
                </div>
                <div className='ellipsis-texts'>
                  <span> Produto(s): {pedido.itens ? pedido.itens.map(p => p.nome).reduce((p1, p2) => p1 + ', ' + p2) : null } </span> 
                </div>
                <div>
                  <span> Status: <b> {getStatusCard(pedido.status)} </b> </span>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
          {
            habilitarAcoes ?
              <CardActions style={{padding: '0px 0px 2px 8px'}}>
                <Button size="small" color="inherit"> Concluir </Button>
                <Button size="small" color="inherit"> Cancelar </Button>
              </CardActions>
            : null
          }
          { 
            this.state.abrirDetalhes ? <DetalhesPedido pedido={pedido} fecharDetalhesDoPedido={this.fecharDetalhesDoPedido}/> : null
          }
        </Card>
      );
  }
}

export default CardPedido;
import React, {Component}from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../../styles/card-pedido.css';

const statusPedido = {
  PENDENTE: 'PENDENTE',
  PREPARANDO: 'PREPARANDO',
  CONCLUIDO: 'CONCLUIDO',
  CANCELADO: 'CANCELADO'
}

class CardPedido extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
      const { pedido } = this.props

      function getEstiloHeader(status) {
        switch(status) {
          case statusPedido.PENDENTE:
            return 'div-card-header-pendente'
          case statusPedido.PREPARANDO:
            return 'div-card-header-preparando'
          case statusPedido.CONCLUIDO:
            return 'div-card-header-concluido'
          case statusPedido.CANCELADO:
            return 'div-card-header-cancelado'
        }
      }

      return (
        <Card style={{width: '335px'}}>
          <CardActionArea>
            <div className={`div-card-header ${getEstiloHeader(pedido.status)}`}>
              <span className='span-card-header'>#{pedido.numero}</span>
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {pedido.cliente.nome}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <div>
                  <span> Hora: 12:25 </span>
                </div>
                <div className='div-card-produtos'>
                  <span> Produto(s): {pedido.produtos.map(p => p.nome).reduce((p1, p2) => p1 + ', ' + p2)} </span> 
                </div>
                <div>
                  <span> Status: <b> {pedido.status} </b> </span>
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
          {
            false ?
              <CardActions>
                <Button size="small" color="inherit"> Concluir </Button>
                <Button size="small" color="inherit"> Cancelar </Button>
              </CardActions>
            : null
          }
        </Card>
      );
  }
}

export default CardPedido;
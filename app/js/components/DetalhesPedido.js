import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import '../../styles/detalhes-pedido.css';
import voltarIcone from '../../images/icons/voltar.png';
import observacaoIcone from '../../images/icons/observacao.png';

class DetalhesPedido extends Component {

    constructor(props) {
        super(props)

        this.state = {
            abrirPopup: false
        }
    }

    render() {
        let state = this.state;
        let { pedido, fecharDetalhesDoPedido } = this.props;
    
        function criarCardItensPedido(prod) {
            return (
                <div>
                    <div className='card-itens-pedido'>
                        <div id='coluna-qtd' className='coluna-itens'>
                            <span className='lbl-detalhes-pedido'> Qtd </span>
                            <div> <span className='lbl-conteudo-card' style={{left: '5px'}}> {prod.quantidade} </span> </div>
                        </div>
                        <div id='coluna-desc' className='coluna-itens'>
                            <span className='lbl-detalhes-pedido'> Descrição </span>
                            <div> <span className='lbl-conteudo-card'> {prod.nome} </span> </div>
                        </div>
                        <div id='coluna-valor' className='coluna-itens'>
                            <span className='lbl-detalhes-pedido'> Valor </span>
                            <div> <span className='lbl-conteudo-card'> R$ {prod.valor} </span> </div>
                        </div>
                    </div>
                    {   prod.observacao ? 
                            <div className='card-itens-pedido'>
                                <div className='div-titulo-obs'>
                                    <span className='lbl-detalhes-pedido'> <img src={observacaoIcone} width='15px' /> </span>
                                </div>
                                <div className='div-conteudo-obs'>
                                    <span className='lbl-conteudo-card'> {prod.observacao} </span>
                                </div>
                            </div>
                        : null
                    }
                </div>
            )
        }

        return (    
            <div className='container-detalhes'>
                <div className='btn-fechar-detalhes'>
                    <Button className='btn-fechar-detalhes' variant="contained" onClick={() => fecharDetalhesDoPedido()}> 
                        <img src={voltarIcone} />
                    </Button>
                </div>
                <span className='lbl-detalhes-pedido lbl-detalhes-pedido-header'> Detalhes do pedido </span>
                <div className='content-detalhes-pedido'>
                    <div style={{paddingBottom: '15px'}}>
                        <span className='lbl-detalhes-pedido lbl-detalhes-pedido-content'> {pedido.numero} - {pedido.status} </span>
                    </div>
                    <div>
                        <div className='divisor'>
                            <span className='lbl-detalhes-pedido lbl-titulo-item'> Data </span>
                            <div>
                                <span className='lbl-conteudo-item'> 11/08/2020 12:35 </span>
                            </div>
                        </div>
                        <div className='divisor'>
                            <span className='lbl-detalhes-pedido lbl-titulo-item'> Cliente </span>
                            <div>
                                <span className='lbl-conteudo-item'> {pedido.cliente.nome} </span>
                            </div>
                        </div>
                        <div className='divisor'>
                            <span className='lbl-detalhes-pedido lbl-titulo-item'> Telefone </span>
                            <div>
                                <span className='lbl-conteudo-item'> {pedido.cliente.telefone} </span>
                            </div>
                        </div>
                        <div className='divisor'>
                            <span className='lbl-detalhes-pedido lbl-titulo-item'> Itens </span>
                            <div className='lista-itens-detalhes-pedidos'>
                                { pedido.produtos.map(prod => criarCardItensPedido(prod)) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DetalhesPedido
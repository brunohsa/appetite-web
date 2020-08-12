import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuApp from '../components/MenuApp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import iconeRemover from '../../images/icons/remover.png';
import '../../styles/cardapio.css';

let cardapios = [
    {
        "nome": "Cardapio 1",
        "ativo": true,
        "categorias": [
            {
                "titulo": "Sobremesas",
                "produtos": [
                    {
                        "nome": "teste prod"
                    }
                ]
            },
            {
                "titulo": "Lanches",
                "produtos": [
                    {
                        "nome": "teste prod 2"
                    },
                    {
                        "nome": "Item 2"
                    }
                ]
            }
        ]
    },
    {
        "nome": "Cardapio 2",
        "ativo": false,
        "categorias": [
            {
                "titulo": "Sobremesas",
                "produtos": [
                    {
                        "nome": "teste prod"
                    }
                ]
            },
            {
                "titulo": "Lanches",
                "produtos": [
                    {
                        "nome": "teste prod 2"
                    },
                    {
                        "nome": "Item 2"
                    }
                ]
            }
        ]
    },
    {
        "nome": "Cardapio 3",
        "ativo": false,
        "categorias": [
            {
                "titulo": "Sobremesas",
                "produtos": [
                    {
                        "nome": "teste prod"
                    }
                ]
            },
            {
                "titulo": "Lanches",
                "produtos": [
                    {
                        "nome": "teste prod 2"
                    },
                    {
                        "nome": "Item 2"
                    }
                ]
            }
        ]
    },
    {
        "nome": "Cardapio 4",
        "ativo": false,
        "categorias": [
            {
                "titulo": "Sobremesas",
                "produtos": [
                    {
                        "nome": "teste prod"
                    }
                ]
            },
            {
                "titulo": "Lanches",
                "produtos": [
                    {
                        "nome": "teste prod 2"
                    },
                    {
                        "nome": "Item 2"
                    }
                ]
            }
        ]
    },
    {
        "nome": "Cardapio 5",
        "ativo": false,
        "categorias": [
            {
                "titulo": "Sobremesas",
                "produtos": [
                    {
                        "nome": "teste prod"
                    }
                ]
            },
            {
                "titulo": "Lanches",
                "produtos": [
                    {
                        "nome": "teste prod 2"
                    },
                    {
                        "nome": "Item 2"
                    }
                ]
            }
        ]
    }
]

class CardapioComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            abrirPopup: false,
            nomeCardapioRemocao: null,
            filtrando: false,
            cardapiosFiltrados: []
        }

        this.abrirDialogConfirmacaoRemocaoCardapio = this.abrirDialogConfirmacaoRemocaoCardapio.bind(this);
        this.fecharDialogRemocaoCardapio = this.fecharDialogRemocaoCardapio.bind(this);
        this.removerCardapio = this.removerCardapio.bind(this);
        this.itemCardapio = this.itemCardapio.bind(this);
    }
    
    abrirDialogConfirmacaoRemocaoCardapio(idCardapio) {
        this.setState({
            abrirPopup: true,
            nomeCardapioRemocao: idCardapio
        });
    }

    fecharDialogRemocaoCardapio() {
        this.setState({
            abrirPopup: false
        });
    }

    removerCardapio() {
        this.fecharDialogRemocaoCardapio();
    }

    editarVisualizarCardapio(id) {
        alert('editar/visualizar cardapio com o id ' + id);
    }
    
    filtrarCardapios(event) {
        let filtro = event.target.value
        let cardapiosFiltrados = []
        let filtrando = false

        if(filtro.length > 3) {
            cardapiosFiltrados = cardapios.filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()));
            filtrando = true
        } else if(filtro.length == 0) {
            filtrando = false   
        }
        this.setState({ 
            cardapiosFiltrados: cardapiosFiltrados, 
            filtrando: filtrando
        })
    }

    itemCardapio(cardapio) {
        return (
            <div className='container-lista-cardapios'>
                <div className={cardapio.ativo ? 'status-item status-ativo' : 'status-item status-inativo'}/>
                <div className='content-lista-cardapios'>
                    <div className='label-item-cardapio' onClick={() => this.editarVisualizarCardapio(cardapio.nome)}> 
                        <span id='spanNomeCardapio'> { cardapio.nome } </span> 
                    </div>
                    <div className='btns-item-cardapio'> 
                        <Button className='btn-remover-cardapio' variant="contained" onClick={() => this.abrirDialogConfirmacaoRemocaoCardapio(cardapio.nome)}>
                            <img src={iconeRemover} width='25px' />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    renderizarCardapios() {
        let cardapiosParaRenderizar = this.state.filtrando ? this.state.cardapiosFiltrados : cardapios;
        return cardapiosParaRenderizar.map(c => this.itemCardapio(c));
    }

    render() {
        let state = this.state;
    
        return (    
            <div className='container-cardapio'>
                <div>
                    <MenuApp />
                </div>
                <div className='container-content-cardapio'>
                    <div className='content-cardapio'>
                        <div className='header-cardapio'>
                            <label id="lblCardapio"> Cardápios </label>
                        </div>
                        <div className='container-txt-busca'>
                            <TextField id='txt-busca' label='Busca' type='search' variant='filled' className='txt-busca' onChange={(event) => this.filtrarCardapios(event)} />
                        </div>
                        {  this.renderizarCardapios() }
                    </div>
                    <div>
                        <Fab className='btn-add-cardapio' aria-label="add" onClick={() => this.abrirDialogConfirmacaoRemocaoCardapio('bla')}>
                            <AddIcon />
                        </Fab>
                    </div>
                    <Dialog onClose={this.fecharDialogRemocaoCardapio} aria-labelledby="customized-dialog-title" open={state.abrirPopup}>
                        <DialogTitle id="customized-dialog-title" onClose={this.fecharDialogRemocaoCardapio}> Informativo </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                Deseja realmente remover o cardápio <span style={{fontWeight: 'bold'}}> {state.nomeCardapioRemocao} </span> ? <br/>
                                Isto removerá todas as categorias e produtos que existem neste cardápio !
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={this.fecharDialogRemocaoCardapio} color="inherit"> Fechar </Button>
                            <Button autoFocus onClick={this.removerCardapio} color="Secondary"> Remover </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}
export default CardapioComponent
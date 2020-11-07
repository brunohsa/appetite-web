import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

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

import CadastrarCardapioDialog from './cardapio/CadastrarCardapioDialog'

import '../../styles/cardapio.css';
import '../../styles/common.css';

class CardapioComponent extends Component {

    constructor(props) {
        super(props)

        this.props.buscarCardapios()

        this.state = {
            abrirPopup: false,
            nomeCardapioRemocao: null,
            idCardapioRemocao: null,
            filtrando: false,
            cardapiosFiltrados: [],
            abrirDialogCadastro: false
        }

        this.abrirDialogConfirmacaoRemocaoCardapio = this.abrirDialogConfirmacaoRemocaoCardapio.bind(this);
        this.fecharDialogRemocaoCardapio = this.fecharDialogRemocaoCardapio.bind(this);
        this.removerCardapio = this.removerCardapio.bind(this);
        this.criarItemCardapio = this.criarItemCardapio.bind(this);
        this.criarDialogRemocaoCardapio = this.criarDialogRemocaoCardapio.bind(this);
        this.abrirDialogCadastro = this.abrirDialogCadastro.bind(this);
        this.fecharDialogCadastro = this.fecharDialogCadastro.bind(this);
    }
    
    componentDidUpdate() {
        this.renderizarCardapios()
    }

    abrirDialogConfirmacaoRemocaoCardapio(idCardapio, nomeCardapio) {
        this.setState({
            abrirPopup: true,
            nomeCardapioRemocao: nomeCardapio,
            idCardapioRemocao: idCardapio
        });
    }

    fecharDialogRemocaoCardapio() {
        this.setState({ abrirPopup: false })
    }

    removerCardapio() {
        this.fecharDialogRemocaoCardapio()
        this.props.removerCardapio(this.state.idCardapioRemocao)
    }

    editarVisualizarCardapio(id) {
        this.props.history.push('/cardapios-editar/' + id)
    }
    
    filtrarCardapios(event) {
        let { cardapios } = this.props.cardapioStore
        
        let filtro = event.target.value
        let cardapiosFiltrados = []
        let filtrando = false

        if(filtro.length > 3) {
            cardapiosFiltrados = cardapios.filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()))
            filtrando = true
        } else if(filtro.length == 0) {
            filtrando = false   
        }
        this.setState({ 
            cardapiosFiltrados: cardapiosFiltrados, 
            filtrando: filtrando
        })
    }

    criarItemCardapio(cardapio) {
        return (
            <div className='container-lista-cardapios'>
                <div className={cardapio.ativo ? 'status-item status-ativo' : 'status-item status-inativo'}/>
                <div className='content-lista-cardapios'>
                    <div className='label-item-cardapio' onClick={() => this.editarVisualizarCardapio(cardapio.id)}> 
                        <span style={{paddingLeft: '10px'}} className='titulo'> { cardapio.nome } </span> 
                    </div>
                    <div className='btns-item-cardapio'> 
                        <Button 
                            className='btn-remover-cardapio' 
                            variant="contained" 
                            onClick={() => this.abrirDialogConfirmacaoRemocaoCardapio(cardapio.id, cardapio.nome)}>
                            <img src={iconeRemover} width='25px' />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    renderizarCardapios() {
        let { cardapios } = this.props.cardapioStore

        let cardapiosParaRenderizar = this.state.filtrando ? this.state.cardapiosFiltrados : cardapios
        return cardapiosParaRenderizar ? cardapiosParaRenderizar.map(c => this.criarItemCardapio(c)) : null
    }

    criarDialogRemocaoCardapio() {
        return (
            <Dialog onClose={this.fecharDialogRemocaoCardapio} open={this.state.abrirPopup}>
                <DialogTitle onClose={this.fecharDialogRemocaoCardapio}> Informativo </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Deseja realmente remover o cardápio <span style={{fontWeight: 'bold'}}> {this.state.nomeCardapioRemocao} </span> ? <br/>
                        Isto removerá todas as categorias e produtos que existem neste cardápio !
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.fecharDialogRemocaoCardapio} color="inherit"> Fechar </Button>
                    <Button autoFocus onClick={this.removerCardapio} color="Secondary"> Remover </Button>
                </DialogActions>
            </Dialog>
        )
    }

    abrirDialogCadastro() {
        this.setState({ abrirDialogCadastro: true })
    }

    fecharDialogCadastro() {
        this.setState({ abrirDialogCadastro: false })
    }

    render() {
        let { abrirDialogCadastro } = this.state
        let { criarCardapio }  = this.props

        return (    
            <div className='container-cardapio'>
                <div>
                    <MenuApp />
                </div>
                <div className='container-content-cardapio'>
                    <div className='container-conteudos content-cardapio'>
                        <div className='header-cardapio'>
                            <label style={{fontSize: '20px'}} className='titulo'> Cardápios </label>
                        </div>
                        <div className='container-txt-busca'>
                            <TextField
                                label='Busca' 
                                type='search' 
                                variant='filled'
                                className='txt-busca' 
                                onChange={(event) => this.filtrarCardapios(event)} />
                        </div>
                        <div className='container-itens-cardapio'>
                            {  this.renderizarCardapios() }
                        </div>
                    </div>
                    <div className='div-btn-add-cardapio'>
                        <Fab className='btn-add-cardapio' aria-label="add" onClick={this.abrirDialogCadastro}>
                            <AddIcon />
                        </Fab>
                    </div>
                    { this.criarDialogRemocaoCardapio() }
                    <CadastrarCardapioDialog abrirDialog={abrirDialogCadastro} fecharDialog={this.fecharDialogCadastro} criarCardapio={criarCardapio}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cardapioStore: state.cardapio,
        erro: state.erro
    }
}
  
export default withRouter(connect(mapStateToProps)(CardapioComponent))

CardapioComponent.propTypes = {
    criarCardapio: PropTypes.func.isRequired,
    buscarCardapios: PropTypes.func.isRequired,
    removerCardapio: PropTypes.func.isRequired
}
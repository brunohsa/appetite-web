import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoaderComponent from '../LoaderComponent'

import CategoriaCardapio from './CategoriaCardapio'



import '../../../styles/cardapio/cadastrar-editar-cardapio.css';
import '../../../styles/common.css';

const CustomTextField = withStyles({
  root: {
      '& .MuiInputBase-root': {
          padding: '0px 10px 0px 10px',
          width: '500px',
          height: '60px',
          fontSize: '15px',
          color: '#989898'
      }
  }
})(TextField);

class CadastrarEditarCardapio extends Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      subcategoria: null,
      editarNomeCardapio: false,
      abrirDialogCardapioAtivo: false,
      cardapioAtivo: false
    }
    
    this.alterarCardapioAtivo = this.alterarCardapioAtivo.bind(this)
    this.abrirMenuCategoriasHeader = this.abrirMenuCategoriasHeader.bind(this)
    this.fecharMenuCategoriasHeader = this.fecharMenuCategoriasHeader.bind(this)
    this.adicionarNovaCategoria = this.adicionarNovaCategoria.bind(this)
    this.validarCheckAtivarCardapio = this.validarCheckAtivarCardapio.bind(this)
    this.abrirDialogCardapioAtivo = this.abrirDialogCardapioAtivo.bind(this)
    this.fecharDialogCardapioAtivo = this.fecharDialogCardapioAtivo.bind(this)
  }

  handlerChange(valor, state) {
    this.setState({ [state]: valor })
  }

  validarCheckAtivarCardapio(event) {
    let { cardapios } = this.props.cardapioStore
    
    let cardapioAtivo = event.target.checked
    let existeCardapioAtivo = cardapios ? cardapios.filter(c => c.ativo)[0] != null : false
    if(!existeCardapioAtivo) {
      this.alterarCardapioAtivo(cardapioAtivo)
      return
    }
    this.setState({ abrirDialogCardapioAtivo: existeCardapioAtivo, cardapioAtivo: cardapioAtivo})
  }

  alterarCardapioAtivo(cardapioAtivo) {
    let { cardapio, cardapios } = this.props.cardapioStore
    cardapio.ativo = cardapioAtivo != null && cardapioAtivo != undefined ? cardapioAtivo : this.state.cardapioAtivo
    cardapios.filter(c => c.id == cardapio.id)[0] = cardapio

    this.props.alterarCardapio(cardapio.id, cardapio)
    this.fecharDialogCardapioAtivo()
    
    this.setState({ cardapio: cardapio, cardapios: cardapios })
  }

  editarNomeCardapio() {
    this.setState({ editarNomeCardapio: true })
  }

  confirmarEditacaoNomeCardapio() {
    let { cardapio } = this.props.cardapioStore
    this.props.alterarCardapio(cardapio.id, cardapio)
    
    this.setState({ editarNomeCardapio: false })
  }

  atualizarNomeCardapio(valor) {
    let { cardapio } = this.props.cardapioStore
    cardapio.nome = valor

    this.setState({ cardapio: cardapio })
  }

  criarDialogAlterarAtivoCardapio() {
    return (
        <Dialog onClose={this.fecharDialogCardapioAtivo} aria-labelledby="customized-dialog-title" open={this.state.abrirDialogCardapioAtivo}>
            <DialogTitle id="customized-dialog-title" onClose={this.fecharDialogCardapioAtivo}> Informativo </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Já possui um cardápio ativo, deseja mesmo assim tornar este ativo ? <br/>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => this.fecharDialogCardapioAtivo()} color="inherit"> Fechar </Button>
                <Button autoFocus onClick={() => this.alterarCardapioAtivo()} color="Secondary"> Alterar </Button>
            </DialogActions>
        </Dialog>
    )
  }

  abrirDialogCardapioAtivo() {
    this.setState({ abrirDialogCardapioAtivo: true })
  }

  fecharDialogCardapioAtivo() {
    this.setState({ abrirDialogCardapioAtivo: false })
  }

  informacoesDoCardapio() {
    let { cardapio } = this.props.cardapioStore
    let { editarNomeCardapio } = this.state

    return (
      <div>
        <div className='div-informacoes-cardapio'>
          <span className='titulo'> Informações do cardápio </span>
        </div>
        <div className='container-conteudos' style={{paddingTop: '5px'}}>
          <div className='div-nome-cardapio'>
            <div className='div-nome-cardapio'> 
              <CustomTextField
                  label='Nome do cardápio'
                  variant="outlined"
                  disabled={!editarNomeCardapio}
                  value={cardapio ? cardapio.nome : ''} 
                  onBlur={() => this.confirmarEditacaoNomeCardapio()} 
                  onChange={(event) => this.atualizarNomeCardapio(event.target.value)}
                  onClick={() => this.editarNomeCardapio()}
                  autoFocus
              /> 
            </div>
          </div>
          <div className='div-check-cardapio-ativo'>
            <span id='lblAtivarCardapio' className='texto'> Ativo </span>
            <Switch checked={cardapio ? cardapio.ativo : false} onChange={(event) => this.validarCheckAtivarCardapio(event)}/>
          </div>
        </div>
      </div>
    )
  }

  headerCategorias() {
    let { cardapio } = this.props.cardapioStore
    let { alterarCategoria, adicionarProduto, alterarProduto, alterarImagemProduto, removerCategoria, 
          removerProduto, fazerDownloadImagem, buscarSubcategorias} = this.props
    
    return(
      <div className='div-conteudo-categoria'>
        <div className='div-header-categoria'>
            <div className='titulo-header-categoria'> <span className='span-nome-categoria'> Categorias </span> </div>
            { this.renderizarMenuCategoriasHeader() }
        </div>
        { 
          cardapio && cardapio.categorias && cardapio.categorias.length > 0
            ? cardapio.categorias.map(categoria => 
                <CategoriaCardapio 
                  cardapio={cardapio} 
                  categoria={categoria}
                  alterarCategoria={alterarCategoria} 
                  removerCategoria={removerCategoria}  
                  adicionarProduto={adicionarProduto} 
                  alterarProduto={alterarProduto} 
                  alterarImagemProduto={alterarImagemProduto}
                  removerProduto={removerProduto}
                  fazerDownloadImagem={fazerDownloadImagem}
                  buscarSubcategorias={buscarSubcategorias}
                />)
            : this.renderizarCardapioSemItens() 
        }
      </div>
    )
  }

  renderizarCardapioSemItens() {
    return (
      <div className='container-sem-itens' style={{border:'none'}}>
        <span className='texto'> Ainda não possui nenhuma categoria cadastrada. </span>
      </div>
    )
  }

  renderizarMenuCategoriasHeader() {
    let { anchorEl } = this.state

    return (
      <div className='div-menu-categoria'>
        <IconButton style={{color: 'white'}} onClick={this.abrirMenuCategoriasHeader}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.fecharMenuCategoriasHeader}
          PaperProps={{ style: { maxHeight: 48 * 4.5, maxWidth: '250px' } }}
        >
          <MenuItem onClick={this.adicionarNovaCategoria}> Adicionar Categoria </MenuItem>
        </Menu>
      </div>
    )
  }

  adicionarNovaCategoria() {
    let { cardapio } = this.props.cardapioStore

    let nomeNovaCategoria = 'Nova Categoria'
    this.props.adicionarCategoria(cardapio.id, nomeNovaCategoria)

    this.setState({anchorEl: null})
}

  abrirMenuCategoriasHeader(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  fecharMenuCategoriasHeader() {
      this.setState({
          anchorEl: null
      })
  }

  render() {
    let { abrirDialogCardapioAtivo } = this.state
    let { carregandoDadosTelaEditarCardapio } = this.props.cardapioStore
    return (
      <div className='container-cadastrar-editar-cardapio'>
        { carregandoDadosTelaEditarCardapio ? <LoaderComponent /> : null }
        <div className='content-cadastrar-editar-cardapio'>
          { this.informacoesDoCardapio() }
          { this.headerCategorias() }
          { abrirDialogCardapioAtivo ? this.criarDialogAlterarAtivoCardapio() : null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      cardapioStore: state.cardapio
  }
}

export default connect(mapStateToProps)(CadastrarEditarCardapio);

CadastrarEditarCardapio.propTypes = {
  cardapioId: PropTypes.number.isRequired,
  alterarCardapio: PropTypes.func.isRequired,
  alterarCategoria: PropTypes.func.isRequired,
  removerCategoria: PropTypes.func.isRequired, 
  adicionarProduto: PropTypes.func.isRequired,
  alterarProduto: PropTypes.func.isRequired,
  alterarImagemProduto: PropTypes.func.isRequired,
  removerProduto: PropTypes.func.isRequired,
  fazerDownloadImagem: PropTypes.func.isRequired,
  buscarSubcategorias: PropTypes.func.isRequired,
}
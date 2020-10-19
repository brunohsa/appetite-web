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

import CategoriaCardapio from './CategoriaCardapio'

import cardapioAPI from '../../redux/api/cardapioAPI'

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

    let { buscarCardapio, cardapioId } = this.props
    buscarCardapio(cardapioId)

    this.state = {
      anchorEl: null,
      subcategoria: null,
      editarNomeCardapio: false
    }
    
    this.checkAtivarCardapio = this.checkAtivarCardapio.bind(this)
    this.abrirMenuCategoriasHeader = this.abrirMenuCategoriasHeader.bind(this)
    this.fecharMenuCategoriasHeader = this.fecharMenuCategoriasHeader.bind(this)
    this.adicionarNovaCategoria = this.adicionarNovaCategoria.bind(this)
  }

  handlerChange(valor, state) {
    this.setState({ [state]: valor })
  }

  checkAtivarCardapio(event) {
    let { cardapio } = this.props.cardapioStore
    cardapio.ativo = event.target.checked
    
    this.props.alterarCardapio(cardapio.id, cardapio)
    this.setState({ ativarCardapio: event.target.checked })
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
            <Switch checked={cardapio ? cardapio.ativo : false} onChange={(event) => this.checkAtivarCardapio(event)}/>
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
    return (
      <div className='container-cadastrar-editar-cardapio'>
        { this.informacoesDoCardapio() }
        { this.headerCategorias() }
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

const mapDispatchToProps = (dispatch) => {
  return {
    alterarCardapio: (idCardapio, cardapio) => {
      dispatch(cardapioAPI.alterarCardapio(idCardapio, cardapio));
    },
    buscarCardapio: (idCardapio) => {
      dispatch(cardapioAPI.buscarCardapio(idCardapio));
    },
    adicionarCategoria: (idCardapio, nomeCategoria) => {
      dispatch(cardapioAPI.adicionarCategoria(idCardapio, nomeCategoria));
    },
    alterarCategoria: (idCardapio, idCategoria, categoria) => {
      dispatch(cardapioAPI.alterarCategoria(idCardapio, idCategoria, categoria));
    },
    adicionarProduto: (idCardapio, idCategoria, produto) => {
      dispatch(cardapioAPI.adicionarProduto(idCardapio, idCategoria, produto));
    },
    alterarProduto: (idCardapio, idCategoria, idProduto, produto) => {
      dispatch(cardapioAPI.alterarProduto(idCardapio, idCategoria, idProduto, produto));
    },
    alterarImagemProduto: (idProduto, imagemBase64) => {
      dispatch(cardapioAPI.alterarImagemProduto(idProduto, imagemBase64));
    },
    removerCategoria: (idCardapio, idCategoria) => {
      dispatch(cardapioAPI.removerCategoria(idCardapio, idCategoria));
    },
    removerProduto: (idCardapio, idCategoria, idProduto) => {
      dispatch(cardapioAPI.removerProduto(idCardapio, idCategoria, idProduto));
    },
    fazerDownloadImagem: (idProduto) => {
      dispatch(cardapioAPI.fazerDownloadImagem(idProduto));
    },
    buscarSubcategorias: () => {
      dispatch(cardapioAPI.buscarSubcategorias());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarEditarCardapio);

CadastrarEditarCardapio.propTypes = {
  cardapioId: PropTypes.number.isRequired
}
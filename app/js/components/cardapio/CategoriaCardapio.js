import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';

import ProdutoCardapio from './ProdutoCardapio'

import '../../../styles/cardapio/cadastrar-editar-cardapio.css';
import '../../../styles/common.css';

const CssTextField = withStyles({
    root: {
      '& .MuiInputBase-root': {
        color: 'white',
        fontSize: '14px',
        fontWeight:'bold'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      }
    }
})(TextField);

const CustomFormControl = withStyles({
  root: {
    '& .MuiSelect-root': {
      color: 'white',
      fontSize: '14px',
      fontWeight:'bold',
      width: '150px'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    }
  }
})(FormControl);

class CategoriaCardapio extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            anchorElCategoria: null,
            editarNomeCategoria: false,
            editarSubcategoria: false,
            abrirDialogRemocaoCategoria: false
        }
    
        this.props.buscarSubcategorias()

        this.abrirMenuCategoria = this.abrirMenuCategoria.bind(this)
        this.fecharMenuCategoria = this.fecharMenuCategoria.bind(this)
        this.atualizarNomeCategoria = this.atualizarNomeCategoria.bind(this)
        this.editarNomeCategoria = this.editarNomeCategoria.bind(this)
        this.adicionarNovoProduto = this.adicionarNovoProduto.bind(this)
        this.atualizarSubcategoria = this.atualizarSubcategoria.bind(this)
        this.fecharDialogRemocaoCategoria = this.fecharDialogRemocaoCategoria.bind(this)
        this.removerCategoria = this.removerCategoria.bind(this)
    }

    abrirDialogRemocaoCategoria() {
      this.setState({ abrirDialogRemocaoCategoria: true })
    }
  
    fecharDialogRemocaoCategoria() {
      this.setState({ abrirDialogRemocaoCategoria: false })
    }

    removerCategoria() {
      let { removerCategoria , cardapio, categoria } = this.props
      removerCategoria(cardapio.id, categoria.id)
      this.fecharMenuCategoria()
      this.fecharDialogRemocaoCategoria()
    }

    criarDialogRemocaoCategoria() {
      return (
          <Dialog onClose={this.fecharDialogRemocaoCategoria} aria-labelledby="customized-dialog-title" open={this.state.abrirDialogRemocaoCategoria}>
              <DialogTitle id="customized-dialog-title" onClose={this.fecharDialogRemocaoCategoria}> Informativo </DialogTitle>
              <DialogContent dividers>
                  <Typography gutterBottom>
                      Deseja realmente remover a categoria <span style={{fontWeight: 'bold'}}> {this.props.categoria.titulo} </span> ? <br/>
                  </Typography>
              </DialogContent>
              <DialogActions>
                  <Button autoFocus onClick={this.fecharDialogRemocaoCategoria} color="inherit"> Fechar </Button>
                  <Button autoFocus onClick={this.removerCategoria} color="Secondary"> Remover </Button>
              </DialogActions>
          </Dialog>
      )
  }

    renderizarMenuCategoria() {
        let { anchorElCategoria } = this.state
    
        return (
          <div className='div-menu-categoria'>
            <IconButton
              style={{color: 'white'}}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={this.abrirMenuCategoria}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorElCategoria}
              keepMounted
              open={Boolean(anchorElCategoria)}
              onClose={this.fecharMenuCategoria}
              PaperProps={{ style: { maxHeight: 48 * 4.5, maxWidth: '250px'}}}
            >
              <MenuItem onClick={() => this.adicionarNovoProduto()}> Adicionar Produto </MenuItem>
              <MenuItem onClick={() => this.abrirDialogRemocaoCategoria()}> Excluir </MenuItem>
            </Menu>
          </div>
        )
    }

    adicionarNovoProduto() {
      let { categoria, cardapio } = this.props

      let novoProduto = { id: null, nome: 'Novo Produto', valor: 0.0}

      this.props.adicionarProduto(cardapio.id, categoria.id, novoProduto)
      this.setState({ anchorElCategoria: null })
    }

    abrirMenuCategoria(event) {
        this.setState({ anchorElCategoria: event.currentTarget })
      }
    
    fecharMenuCategoria() {
        this.setState({ anchorElCategoria: null })
    }

    editarNomeCategoria() {
      this.setState({ editarNomeCategoria: true })
    }

    atualizarNomeCategoria(valor) {
        let { cardapio, categoria } = this.props
        categoria.titulo = valor
        
        this.setState({ cardapio: cardapio })
    }

    confirmarEditacaoNomeCategoria() {
      let { cardapio, categoria, alterarCategoria } = this.props
      alterarCategoria(cardapio.id, categoria.id, categoria)

      this.setState({ editarNomeCategoria: false })
    }

    editarSubcategoria() {
      this.setState({ editarSubcategoria: true })
    }

    atualizarSubcategoria(event) {
      let { cardapio, categoria, alterarCategoria, cardapioStore } = this.props

      let subcategoria = cardapioStore.subcategorias.find(s => s.id === event.target.value)
      categoria.subcategoria = subcategoria
      
      alterarCategoria(cardapio.id, categoria.id, categoria)
      this.setState({ cardapio: cardapio, editarSubcategoria: false })
    }
      
    renderizarCategoriaSemProdutos() {
        return (
          <div className='container-sem-itens'>
            <span className='texto'> A categoria ainda não possui nenhum produto cadastrado. </span>
          </div>
        )
    }

    renderizarSubcategorias() {
      let { categoria } = this.props
      let { subcategorias } = this.props.cardapioStore
      return (
        <div style={{position: 'relative', bottom: '5px'}}>
          <CustomFormControl>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="txt-subcategoria"
              value={categoria.subcategoria ? categoria.subcategoria.id : null}
              onChange={this.atualizarSubcategoria}
              onBlur={this.editarSubcategoria}
              autoFocus
            >
            { 
              subcategorias ? subcategorias.map(s => <MenuItem value={s.id}> { s.descricao } </MenuItem> ) : null
            }
            </Select>
          </CustomFormControl>
        </div>
      )
    }
    
    render() {
        let { editarNomeCategoria, editarSubcategoria, abrirDialogRemocaoCategoria } = this.state
        let { cardapio, categoria, alterarProduto, alterarImagemProduto, removerProduto, fazerDownloadImagem } = this.props

        return (
            <div className='container-categoria'>
                <div className='header-categoria'>
                    <div style={{display: 'inline-block', width: '80%'}}>
                        {
                          editarNomeCategoria
                            ? <div className='editar-nome-categoria'> 
                                <CssTextField 
                                    value={categoria.titulo} autoFocus 
                                    onBlur={() => this.confirmarEditacaoNomeCategoria(false)} 
                                    onChange={(event) => this.atualizarNomeCategoria(event.target.value, categoria.id)} 
                                /> 
                                </div>
                            : <span className='titulo-categoria' onClick={() => this.editarNomeCategoria()}> { categoria.titulo } 
                                <EditIcon style={{position: 'relative', top: '6px', left: '5px', height: '20px'}}/>
                              </span>
                        }
                    </div>
                    <div className='container-sub-categoria'>
                      { 
                        editarSubcategoria
                          ? this.renderizarSubcategorias() 
                          : <span className='titulo-categoria' onClick={() => this.editarSubcategoria()}> 
                              { categoria.subcategoria ? categoria.subcategoria.descricao : 'Subcategoria' } 
                              <EditIcon style={{position: 'relative', top: '6px', left: '5px', height: '20px'}}/>
                            </span>
                      } 
                    </div>
                    { this.renderizarMenuCategoria(categoria) }
                </div>
                <div className='div-produtos-categoria'>
                    { 
                      categoria.produtos && categoria.produtos.length > 0 
                        ? categoria.produtos.map(produto =>
                            <ProdutoCardapio
                              cardapio={cardapio}
                              categoria={categoria}
                              produto={produto}
                              alterarProduto={alterarProduto}
                              alterarImagemProduto={alterarImagemProduto}
                              removerProduto={removerProduto}
                              fazerDownloadImagem={fazerDownloadImagem}
                            />
                          )
                        : this.renderizarCategoriaSemProdutos()
                    }
                </div>
                { abrirDialogRemocaoCategoria ? this.criarDialogRemocaoCategoria() : null }
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

export default connect(mapStateToProps)(CategoriaCardapio)

CategoriaCardapio.propTypes = {
  cardapio: PropTypes.object.isRequired,
  categoria: PropTypes.object.isRequired,
  alterarCategoria: PropTypes.func.isRequired,
  removerCategoria: PropTypes.func.isRequired,
  adicionarProduto: PropTypes.func.isRequired,
  alterarProduto: PropTypes.func.isRequired,
  alterarImagemProduto: PropTypes.func.isRequired,
  removerProduto: PropTypes.func.isRequired,
  fazerDownloadImagem: PropTypes.func.isRequired,
  buscarSubcategorias: PropTypes.func.isRequired
}
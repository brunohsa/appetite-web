import React, {Component} from 'react';

import { withStyles, withTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import '../../../styles/cardapio/cadastrar-editar-cardapio.css';
import '../../../styles/common.css';

let cardapio = {
  id: '1',
  nome: 'Cardapio',
  ativo: true,
  categorias: [
    {
      id: '1234',
      nome: 'Lanches',
      produtos: [
        {
          id: '1234',
          nome: 'X-Tudo',
          imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/076/733/239570/239570_original.jpg?mode=crop&width=710&height=400',
          valor: 30.00,
          estoque: 10
        }
      ]
    },
    {
      id: '1234',
      nome: 'Bebidas',
      produtos: [
        {
          id: '1234',
          nome: 'Coca-Cola',
          imagem: 'https://f.i.uol.com.br/fotografia/2018/08/21/15348230475b7b8a8778a2e_1534823047_3x2_md.jpg',
          valor: 3.00,
          estoque: 100
        }
      ]
    }
  ]
}

const styles = theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: 'rgb(183, 28, 28)',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: 'rgb(183, 28, 28)',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
});

class CadastrarEditarCardapio extends Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      subcategoria: null,
      ativarCardapio: cardapio.ativo,
      editarProduto: false,
      cardapio: cardapio
    }

    this.abrirMenuCategoria = this.abrirMenuCategoria.bind(this)
    this.fecharMenuCategoria = this.fecharMenuCategoria.bind(this)
    this.checkAtivarCardapio = this.checkAtivarCardapio.bind(this)
    this.adicionarNovaCategoria = this.adicionarNovaCategoria.bind(this)
  }

  handlerChange(event, valor, state) {
    this.setState({
      [state]: valor
    })    
  }

  checkAtivarCardapio(event) {
    this.setState({
      ativarCardapio: event.target.checked
    })
  }

  abrirMenuCategoria(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  fecharMenuCategoria() {
    this.setState({
      anchorEl: null
    })
  }

  adicionarNovaCategoria() {
    let novaCategoriaNomeDefault = 'Nova Categoria'

    let cardapio = this.state.cardapio
    let quantidadeNovasCategorias = cardapio.categorias.filter(c => c.nome.includes(novaCategoriaNomeDefault)).length
    let nomeNovaCategoria = `${novaCategoriaNomeDefault} ${quantidadeNovasCategorias > 0 ? quantidadeNovasCategorias : ''}`
    cardapio.categorias.push({
      id: null,
      nome: nomeNovaCategoria,
      valor: 0,
      estoque: 0,
      produtos: []
    })

    this.setState({
      anchorEl: null,
      cardapio: cardapio
    })
  }

  renderizarMenuCategorias() {
    let { anchorEl } = this.state

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
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.fecharMenuCategoria}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              maxWidth: '250px',
            }
          }}
        >
          <MenuItem key={'1'} onClick={this.adicionarNovaCategoria}> Adicionar Categoria </MenuItem>
        </Menu>
      </div>
    )
  }

  
  renderizarMenuCategoria() {
    let { anchorEl } = this.state

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
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.fecharMenuCategoria}
          PaperProps={{ style: { maxHeight: 48 * 4.5, maxWidth: '250px'}}}
        >
          <MenuItem key={'1'} onClick={this.fecharMenuCategoria}> Adicionar Produto </MenuItem>
          <MenuItem key={'2'} onClick={this.fecharMenuCategoria}> Excluir </MenuItem>
        </Menu>
      </div>
    )
  }

  renderizarCategorias() {
    return (
      <div className='div-conteudo-categoria'>
        <div className='div-header-categoria'>
          <div className='titulo-header-categoria'>
            <span className='span-nome-categoria'> Categorias </span>
          </div>
          { this.renderizarMenuCategorias() }
        </div>
        {  this.state.cardapio.categorias.map(categoria => this.renderizarCategoria(categoria)) }
      </div>
    )
  }

  renderizarCategoria(categoria) {
    return (
      <div className='container-categoria'>
        <div className='header-categoria'>
          <div style={{display: 'inline-block', width: '90%'}}>
            <span className='titulo-categoria'> { categoria.nome } </span>
          </div>
          { this.renderizarMenuCategoria() }
        </div>
        <div className='div-produtos-categoria'>
            { 
              categoria.produtos && categoria.produtos.length > 0 
              ? categoria.produtos.map(produto => this.renderizarProduto(produto)) 
              : this.renderizarCategoriaSemProdutos()
            }
        </div>
      </div>
    )
  }

  renderizarCategoriaSemProdutos() {
    return (
      <div className='container-categoria-sem-produto'>
        <span className='texto'> A categoria ainda não possui nenhum produto cadastrado </span>
      </div>
    )
  }

  renderizarProduto(produto) {
    let { editarProduto } = this.state
    return (
      <div className='div-conteudo-produtos-categoria'>
      
          <div className='div-imagem-produto-cardapio'>
              <label for="inputImagemProduto" style={{cursor: 'pointer'}}>
                <img id='img-produto-cardapio' src={produto.imagem}/>
              </label>
              <input id="inputImagemProduto" type="file" accept="image/jpeg"/>
          </div>

          <div className='div-informacoes-produto-cardapio'>
            <div className='div-nome-produto-categoria'>
              <span className='titulo'> { produto.nome } </span>
            </div>
            <div className='div-texts-valor-estoque-produto'>
              <TextField
                disabled={!editarProduto}
                label='Valor'
                id="txt-valor"
                value={`R$ ${produto.valor}`}
                variant="outlined"
              />
              <TextField
                disabled={!editarProduto}
                style={{marginLeft: '20px'}}
                label='Estoque'
                id="txt-estoque"
                value={produto.estoque}
                variant="outlined"
              />
            </div>
          </div>
          <div className='div-botoes-produto-cardapio'>
            <Button autoFocus onClick={() => this.handlerChange(null, true, 'editarProduto')}>
              <EditIcon id='icone-editar-produto-cardapio' />
            </Button>
            <Button autoFocus> 
              <DeleteIcon id='remover-editar-produto-cardapio' />
            </Button>
          </div>
        </div>
    )
  }

  informacoesDoCardapio() {
    let { classes } = this.props
    let { ativarCardapio } = this.state
    return (
      <div>
        <div className='div-informacoes-cardapio'>
          <span className='titulo'> Informações do cardápio </span>
        </div>
        <div className='container-conteudos' style={{paddingTop: '5px'}}>
          <div className='div-nome-cardapio'>
              <TextField
                label='Nome do cardápio'
                id="txt-nome-cardapio"
                value={cardapio.nome}
                variant="outlined"
              />
          </div>
          <div className='div-check-cardapio-ativo'>
            <span id='lblAtivarCardapio' className='texto'> Ativo </span>
            <Switch
              checked={ativarCardapio}
              onChange={(event) => this.checkAtivarCardapio(event)}
              classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='container-cadastrar-editar-cardapio'>
        { this.informacoesDoCardapio() }
        { this.renderizarCategorias() }
      </div>
    )
  }
}

export default withStyles(styles)(withTheme(CadastrarEditarCardapio))
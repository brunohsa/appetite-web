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
import CheckIcon from '@material-ui/icons/Check';

import '../../../styles/cardapio/cadastrar-editar-cardapio.css';

import AdicionarCategoriaHeader from './AdicionarCategoriaHeader'

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

const options = [
  'Adicionar produto',
  'Editar nome da categoria'
];

class CadastrarEditarCardapio extends Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      subcategoria: null,
      ativarCardapio: false
    }

    this.abrirMenuCategoria = this.abrirMenuCategoria.bind(this)
    this.fecharMenuCategoria = this.fecharMenuCategoria.bind(this)
    this.checkAtivarCardapio = this.checkAtivarCardapio.bind(this)
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

  renderizarCategoria() {
    return (
      <div className='div-conteudo-categoria'>
        <div className='div-header-categoria'>
          <div className='div-nome-categoria'>
            <span className='span-nome-categoria'> Nome da categoria </span>
          </div>
          { this.renderizarMenuCategoria() }
        </div>
        <div className='div-produtos-categoria'>
          { this.renderizarProdutosCategoria() }
        </div>
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
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              maxWidth: '250px',
            }
          }}
        >
          {
            options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.fecharMenuCategoria}>
                {option}
              </MenuItem>
            ))
          }
        </Menu>
      </div>
    )
  }

  renderizarProdutosCategoria() {
    return (
      <div className='div-conteudo-produtos-categoria'>
          <div className='div-imagem-produto-cardapio'>
            <img id='img-produto-cardapio' src='https://f.i.uol.com.br/fotografia/2018/08/21/15348230475b7b8a8778a2e_1534823047_3x2_md.jpg'/>
          </div>
          <div className='div-informacoes-produto-cardapio'>
            <div className='div-nome-produto-categoria'>
              <span className='titulo-span'> Nome do produto </span>
            </div>
            <div className='div-texts-valor-estoque-produto'>
              <TextField
                label='Valor'
                id="txt-valor"
                value={'R$ 25.00'}
                variant="outlined"
              />
              <TextField
                style={{marginLeft: '20px'}}
                label='Estoque'
                id="txt-estoque"
                value={null}
                variant="outlined"
              />
            </div>
          </div>
          <div className='div-botoes-produto-cardapio'>
            <Button autoFocus>
              <EditIcon id='icone-editar-produto-cardapio' />
            </Button>
            <Button autoFocus> 
              <DeleteIcon id='remover-editar-produto-cardapio' />
            </Button>
          </div>
        </div>
    )
  }

  render() {
    let { classes } = this.props
    let { ativarCardapio } = this.state
    return (
      <div>
        <div>
          <div className='div-informacoes-cardapio'>
            <span className='titulo-span'> Informações do cardápio </span>
          </div>
          <div className='conteudo-informacoes-cardapio'>
            <div className='div-nome-cardapio'>
                <TextField
                  label='Nome do cardápio'
                  id="txt-nome-cardapio"
                  value={null}
                  variant="outlined"
                />
            </div>
            <div className='div-check-cardapio-ativo'>
              <span className='titulo-span'> Ativar Cardápio </span>
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
        <AdicionarCategoriaHeader />
        { this.renderizarCategoria() }
      </div>
    )
  }
}

export default withStyles(styles)(withTheme(CadastrarEditarCardapio))
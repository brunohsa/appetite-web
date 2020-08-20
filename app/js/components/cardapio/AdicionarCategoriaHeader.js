import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import '../../../styles/cardapio/cadastrar-editar-cardapio.css';
import '../../../styles/cardapio/adicionar-categoria-header.css';

const styles = theme => ({
  formControl: {
    minWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const subcategorias = [
  {
    id: 1,
    nome: 'LANCHE',
    descricao: 'Lanches'
  },
  {
    id: 2,
    nome: 'BOLO_E_DOCES',
    descricao: 'Bolo e Doces'
  },
  {
    id: 3,
    nome: 'PIZZA',
    descricao: 'Pizza'
  },
  {
    id: 4,
    nome: 'BRASILEIRA',
    descricao: 'Comida Brasileira'
  },
  {
    id: 5,
    nome: 'ITALIANA',
    descricao: 'Comida Italiana'
  },
  {
    id: 6,
    nome: 'JAPONESA',
    descricao: 'Comida Japonesa'
  },
  {
    id: 7,
    nome: 'CHINESA',
    descricao: 'Comida Chinesa'
  },
  {
    id: 8,
    nome: 'ARABE',
    descricao: 'Comida Árabe'
  },
  {
    id: 9,
    nome: 'COMBOS',
    descricao: 'Combos'
  },
  {
    id: 10,
    nome: 'OUTROS',
    descricao: 'Outros'
  },
]

class AdicionarCategoriaHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      subcategoria: null
    }
  }

  handlerChange(event, state) {
    this.setState({
      [state]: event.target.value
    })
  }

  render() {
    let { classes } = this.props
    let { subcategoria } = this.state
   
    return (
      <div id='adicionar-categoria-container'>
          <div style={{paddingBottom: '5px'}}>
            <span className='titulo-span'> Adicionar Categoria </span>
          </div>
          <div className='container-adicionar-categoria'>
            <div style={{display: 'inline-block'}}>
              <div style={{display: 'inline-block'}}>
                <TextField
                  label='Nome da categoria'
                  id="txt-nome-categoria"
                  value={null}
                  variant="outlined"
                />
              </div>
              <div className='div-subcategorias'>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Subcategoria</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="txt-subcategoria"
                    value={subcategoria}
                    onChange={(event) => this.handlerChange(event, 'subcategoria')}
                    label="Subcategoria"
                  >
                    { 
                      subcategorias.map(s => <MenuItem value={s.nome}> { s.descricao } </MenuItem> )
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
            <Button id='btn-adicionar-nova-categoria'>  Adicionar </Button>
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(AdicionarCategoriaHeader)
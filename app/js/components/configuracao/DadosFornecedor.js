import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import MaskedInput from 'react-text-mask';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import semImagem from '../../../images/sem_imagem.jpg';

import configs from '../../redux/configuracoes'

import '../../../styles/configuracoes/configuracao.css';
import '../../../styles/common.css';

const categorias = [
  {
    id: 'LANCHES',
    titulo: 'Lanches',
  },
  {
    id: 'BOLO_E_DOCES',
    titulo: 'Bolos e Doces',
  },
  {
    id: 'PIZZA',
    titulo: 'Pizza',
  },
  {
    id: 'JAPONESA',
    titulo: 'Comida Japonesa',
  },
  {
    id: 'BRASILEIRA',
    titulo: 'Comida Brasileira',
  },
  {
    id: 'ITALIANA',
    titulo: 'Comida Italiana',
  },
  {
    id: 'CHINESA',
    titulo: 'Comida Chinesa',
  },
  {
    id: 'ARABE',
    titulo: 'Comida Árabe',
  },
  {
    id: 'COMBOS',
    titulo: 'Combos',
  },
  {
    id: 'BEBIDAS',
    titulo: 'Bebidas',
  },
  {
    id: 'CALDOS',
    titulo: 'Caldos',
  },
  {
    id: 'OUTROS',
    titulo: 'Outros',
  },
];

const CustomFormControl = withStyles({
  root: {
    '& .MuiSelect-root': {
      fontSize: '15x',
      textAlign: 'initial'
    }
  }
})(FormControl);


class DadosFornecedor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      imagem: null,
      categoria: ''
    }

    this.alterarImagem = this.alterarImagem.bind(this)
  }

  mascaraTelefone(props) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/ , /\d/, "-", /\d/, /\d/, /\d/, /\d/ ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

  criarConteudoVisualizarTelefone(pessoa) {
    return (
      <div className='container-form-config'>
        <span className='texto'> Telefone </span>
        <div className='div-conteudo-config'>
          <TextField
            disabled
            value={pessoa ? pessoa.telefone : ''}
            variant="outlined"
            className='input-forms-config'
            InputProps={{ inputComponent: this.mascaraTelefone}}/> 
        </div>
      </div>
    );
  }

  mascaraCNPJ(props) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[1-9]/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }
  
  criarConteudoVisualizarCNPJ(pessoa) {
    return (
      <div className='container-form-config'>
        <span className='texto'> CNPJ </span>
        <div className='div-conteudo-config'>
          <TextField
            disabled
            value={pessoa ? pessoa.cnpj : ''}
            variant="outlined"
            className='input-forms-config'
            InputProps={{ inputComponent: this.mascaraCNPJ}}/> 
        </div>
      </div>
    );
  }

  criarConteudoVisualizar(nomeCampo, valor) { 
    return (
      <div className='container-form-config'>
        <span className='texto'> { nomeCampo } </span>
        <div className='div-conteudo-config'>
          <TextField
            disabled
            value={valor}
            variant="outlined"
            className='input-forms-config'
          />
        </div>
      </div>
    )
  }

  alterarImagem(event) {
    let blob = event.target.files[0]
    
    var reader = new FileReader();
    reader.readAsDataURL(blob); 

    let scope = this
    let { alterarImagemFornecedor } = this.props
    reader.onloadend = function() {
        let imagemBase64 = reader.result
        alterarImagemFornecedor(imagemBase64)
      
        scope.setState({ imagem: imagemBase64 })
    }
}

renderizarFornecedorSemImagem() {
  this.setState({ imagem: semImagem })
}

renderizarImagem() {
  let { imagem } = this.state

  let cadastroUUID = localStorage.getItem('cadastroUUID');
  let urlImagemFornecedo = configs.URL_MS_DOWLOAD_IMAGEM_FORNECEDOR.replace('%s', cadastroUUID)
  return (
    <div className='container-imagem-fornecedor'>
        <label htmlFor='inputImagemFornecedor' style={{cursor: 'pointer'}}>
            <img className='imagem-fornecedor' src={imagem ? imagem : urlImagemFornecedo } onError={() => this.renderizarFornecedorSemImagem()}/>
        </label>
        <input id='inputImagemFornecedor' type="file" accept="image/jpeg" onChange={this.alterarImagem}/>
      </div>
  )
}

atualizarCategoria(event) {
  this.setState({categoria: event.target.value})
}

renderizarCategoria() {
  let { cadastro } = this.props.cadastroStore
  return (
    <div className='container-form-config'>
      <span className='texto'> Categoria </span>
      <div className='div-conteudo-config'>
        <CustomFormControl variant="outlined" className='input-forms-config'>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="txt-subcategoria"
            value={this.state.categoria ? this.state.categoria : cadastro ? cadastro.categoria : null}
            onChange={(e) => this.atualizarCategoria(e)}
            onBlur={() => this.props.alterarCategoriaFornecedor(this.state.categoria)}
          >
          { 
            categorias.map(s => <MenuItem value={s.id}> { s.titulo } </MenuItem> )
          }
          </Select>
        </CustomFormControl>
      </div>
    </div>
  )
}

render() {
  let { cadastro } = this.props.cadastroStore
  let pessoa = cadastro ? cadastro.pessoa : null
  return (
      <div style={{height: '170px', width: '99%'}}>
          { this.renderizarImagem() }
        <div className='container-informacoes-fornecedor'>
          { this.criarConteudoVisualizar('Razão Social', pessoa ? pessoa.razao_social : '') }
          { this.criarConteudoVisualizar('Nome Fantasia', pessoa ? pessoa.nome_fantasia : '') }
          { this.criarConteudoVisualizarCNPJ(pessoa) }
          { this.criarConteudoVisualizarTelefone(pessoa) }
          { this.renderizarCategoria() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      cadastroStore: state.cadastro
  }
}

export default connect(mapStateToProps)(DadosFornecedor)
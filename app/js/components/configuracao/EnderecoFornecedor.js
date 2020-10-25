import React, { Component } from 'react';
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';

import '../../../styles/configuracoes/configuracao.css';
import '../../../styles/common.css';

class EnderecoFornecedor extends Component {

  constructor(props) {
    super(props)
  }

  criarConteudoVisualizar(nomeCampo, valor) { 
    return (
      <div className='container-form-config' style={{marginBottom: '10px'}}>
        <span className='texto'> { nomeCampo } </span>
        <div className='div-conteudo-config'>
          <TextField
              disabled
              id="outlined-disabled"
              value={ valor ? valor : null }
              variant="outlined"
              className='input-forms-config'
          />
        </div>
      </div>
    )
  }

  render() {

    let { cadastro } = this.props.cadastroStore
    let pessoa = cadastro ? cadastro.pessoa : null
    let endereco = pessoa ? pessoa.endereco : null

    return (
      <div>
          { this.criarConteudoVisualizar('CEP', endereco ? endereco.cep : '') }
          { this.criarConteudoVisualizar('Endereco', endereco ? endereco.logradouro : '') }
          { this.criarConteudoVisualizar('Número', endereco ? endereco.numero : '') }
          { this.criarConteudoVisualizar('Bairro', endereco ? endereco.bairro : '') }
          { this.criarConteudoVisualizar('Estado', endereco ? endereco.estado : '') }
          { this.criarConteudoVisualizar('Cidade', endereco ? endereco.cidade : '') }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      cadastroStore: state.cadastro
  }
}

export default connect(mapStateToProps)(EnderecoFornecedor)
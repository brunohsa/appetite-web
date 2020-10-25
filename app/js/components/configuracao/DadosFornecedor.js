import React, { Component } from 'react';
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';

import '../../../styles/configuracoes/configuracao.css';
import '../../../styles/common.css';

class DadosFornecedor extends Component {

  constructor(props) {
    super(props)
  }

  criarConteudoVisualizar(nomeCampo, valor) { 
    return (
      <div className='container-form-config'>
        <span className='texto'> { nomeCampo } </span>
        <div className='div-conteudo-config'>
          <TextField
            disabled
            id="outlined-disabled"
            value={valor}
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

    return (
      <div>
          { this.criarConteudoVisualizar('Razão Social', pessoa ? pessoa.razao_social : '') }
          { this.criarConteudoVisualizar('CNPJ', pessoa ? pessoa.cnpj : '') }
          { this.criarConteudoVisualizar('Telefone', pessoa ? pessoa.telefone : '') }
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
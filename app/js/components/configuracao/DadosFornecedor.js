import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import '../../../styles/configuracoes/configuracao.css';
import '../../../styles/common.css';

class DadosFornecedor extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    function criarConteudoVisualizar(nomeCampo, valor) { 
      return (
        <div className='container-form-config'>
          <span className='texto'> {nomeCampo} </span>
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

    return (
      <div>
          { criarConteudoVisualizar('Razão Social', 'Lanchonete do Zé') }
          { criarConteudoVisualizar('CNPJ', '15.810.332/0001-09') }
          { criarConteudoVisualizar('Telefone', '(19) 98356-2724') }
      </div>
    )
  }
}

export default DadosFornecedor
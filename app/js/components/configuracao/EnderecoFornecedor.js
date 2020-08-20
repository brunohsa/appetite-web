import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import '../../../styles/configuracoes/configuracao.css';

class EnderecoFornecedor extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    function criarConteudoVisualizar(nomeCampo, valor) { 
      return (
        <div className='container-form-config' style={{marginBottom: '10px'}}>
          <span className='titulo-conteudo-cofig'> {nomeCampo} </span>
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
          { criarConteudoVisualizar('CEP', '13185-320 ') }
          { criarConteudoVisualizar('Endereco', 'Rua Guido Rosolém') }
          { criarConteudoVisualizar('Número', '47B') }
          { criarConteudoVisualizar('Bairro', 'Jardim Rosolém') }
          { criarConteudoVisualizar('Estado', 'São Paulo') }
          { criarConteudoVisualizar('Cidade', 'Campinas') }
      </div>
    )
  }
}

export default EnderecoFornecedor
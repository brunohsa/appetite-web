import React, {Component} from 'react';

import DadosFornecedor from './configuracao/DadosFornecedor'
import EnderecoFornecedor from './configuracao/EnderecoFornecedor'
import HorarioFuncionamento from './configuracao/HorarioFuncionamento'
import HorarioEspecial from './configuracao/HorarioEspecial'

import '../../styles/configuracao.css';

class ConfiguracaoComponent extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    function criarConteudo(titulo, componente) { 
      return (
        <div className='container-conteudo'>
          <span className='titulo-configuracao'> {titulo} </span>
          <div className='conteudo-config'>
            { componente }
          </div>
        </div>
      )
    }

    return (
      <div className='container-configuracoes'>
        { criarConteudo('Dados do Fornecedor', <DadosFornecedor />) }
        { criarConteudo('Endereço', <EnderecoFornecedor />) }
        { criarConteudo('Horário de Funcionamento', <HorarioFuncionamento />) }
        { criarConteudo('Adicionar Horário Diferenciado', <HorarioEspecial />) }
      </div>    
    );
  }
}

export default ConfiguracaoComponent;
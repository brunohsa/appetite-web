import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DadosFornecedor from './configuracao/DadosFornecedor'
import EnderecoFornecedor from './configuracao/EnderecoFornecedor'
import HorarioFuncionamento from './configuracao/HorarioFuncionamento'
import HorarioEspecial from './configuracao/HorarioEspecial'

import '../../styles/configuracoes/configuracao.css';
import '../../styles/common.css';

class ConfiguracaoComponent extends Component {
  
  constructor(props) {
    super(props);
  }

  criarConteudo(titulo, componente) { 
    return (
      <div className='container-conteudo'>
        <span className='titulo'> {titulo} </span>
        <div className='container-conteudos conteudo-config'>
          { componente }
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className='container-configuracoes'>
        { this.criarConteudo('Dados do Fornecedor', <DadosFornecedor />) }
        { this.criarConteudo('Endereço', <EnderecoFornecedor />) }
        { this.criarConteudo('Horário de Funcionamento', <HorarioFuncionamento />) }
        { this.criarConteudo('Horário Diferenciado', <HorarioEspecial />) }
      </div>    
    );
  }
}

export default ConfiguracaoComponent

ConfiguracaoComponent.propTypes = {
  adicionarHorarioDiferenciado: PropTypes.func.isRequired
}
import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import DadosFornecedor from './configuracao/DadosFornecedor'
import EnderecoFornecedor from './configuracao/EnderecoFornecedor'
import HorarioFuncionamento from './configuracao/HorarioFuncionamento'
import HorarioEspecial from './configuracao/HorarioEspecial'

import LoaderComponent from './LoaderComponent'

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

  renderizarConteudosConfiguracao() {
    let { adicionarHorarioDiferenciado, alterarHorariosFuncionamento, removerHorarioDiferenciado, filtrarHorarioDiferenciado } = this.props
    return (
      <div>
        { this.criarConteudo('Dados do Fornecedor', <DadosFornecedor />) }
        { this.criarConteudo('Endereço', <EnderecoFornecedor />) }
        { this.criarConteudo('Horário de Funcionamento', <HorarioFuncionamento alterarHorariosFuncionamento={alterarHorariosFuncionamento}/>) }
        { this.criarConteudo('Horário Diferenciado', <HorarioEspecial adicionarHorarioDiferenciado={adicionarHorarioDiferenciado} 
                                                                    removerHorarioDiferenciado={removerHorarioDiferenciado}
                                                                    filtrarHorarioDiferenciado={filtrarHorarioDiferenciado} />) }
      </div>
    )
  }

  render() {
    let { cadastroEncontrado, horariosFuncionamentoEncontrado, horariosDiferenciadoEncontrado, carregandoDadosTelaConfiguracoes } = this.props.cadastroStore
    let abrirLoader = (!cadastroEncontrado && !horariosFuncionamentoEncontrado && !horariosDiferenciadoEncontrado) || carregandoDadosTelaConfiguracoes
    return (
      <div className='container-configuracoes'>
        { abrirLoader ? <LoaderComponent /> : null }
        { this.renderizarConteudosConfiguracao() }
      </div>    
    );
  }
}

const mapStateToProps = (state) => {
  return {
      cadastroStore: state.cadastro
  }
}

export default connect(mapStateToProps)(ConfiguracaoComponent)

ConfiguracaoComponent.propTypes = {
  adicionarHorarioDiferenciado: PropTypes.func.isRequired,
  alterarHorariosFuncionamento: PropTypes.func.isRequired,
  removerHorarioDiferenciado: PropTypes.func.isRequired
}
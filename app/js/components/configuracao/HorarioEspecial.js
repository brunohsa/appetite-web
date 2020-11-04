import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/locale';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import TabelaModelo from '../../modelos/TabelaModelo'

import Tabela from '../common/Tabela'

import '../../../styles/configuracoes/horario-especial.css';


class HorarioEspecial extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataAdicao: new Date(),
      dataCadastroFiltro: null,
      dataEspecialInicioFiltro: null,
      dataEspecialFimFiltro: null,
      horarioAbertura: null,
      horarioFechamento: null
    }

    this.handleDateChange = this.handleDateChange.bind(this)
    this.criarHeaderBusca = this.criarHeaderBusca.bind(this)
    this.adicionarHorarioEspecial = this.adicionarHorarioEspecial.bind(this)
    this.getTabelaModelo = this.getTabelaModelo.bind(this)
    this.removerHorariosDiferenciados = this.removerHorariosDiferenciados.bind(this)
    this.filtrar = this.filtrar.bind(this)
  }

  handleDateChange(valor, state) {
    this.setState({
      [state]: valor
    })
  }

  criarDatePicker(id, titulo, valor, nomeCampoState) {
    return (
      <KeyboardDatePicker
        id={id}
        label={titulo}
        format="dd/MM/yyyy"
        value={valor}
        onChange={(data) => this.handleDateChange(data, nomeCampoState)}
        KeyboardButtonProps={{'aria-label': 'change date'}}
        okLabel='Confirmar'
        cancelLabel='Fechar'
      />
    )
  }

  getDataFormatada(data) {
    return data ? data.toLocaleDateString("pt-BR") : null
  }
  filtrar() {
    let { dataCadastroFiltro, dataEspecialInicioFiltro, dataEspecialFimFiltro } = this.state
    let filtro = {
      dataCadastro: this.getDataFormatada(dataCadastroFiltro),
      dataEspecialInicio: this.getDataFormatada(dataEspecialInicioFiltro),
      dataEspecialFim: this.getDataFormatada(dataEspecialFimFiltro),
    }
    this.props.filtrarHorarioDiferenciado(filtro)
  }

  criarHeaderBusca() {
    let { dataCadastroFiltro, dataEspecialInicioFiltro, dataEspecialFimFiltro } = this.state
  
    return (
      <div style={{width: '100%'}}>
        <div style={{display: 'inline-block', width: '50%'}}>
          <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
              <div style={{display: 'inline-block', paddingRight: '30px'}}>
                {  this.criarDatePicker("data-cadastro-filtro", "Data de cadastro", dataCadastroFiltro, 'dataCadastroFiltro' ) }
              </div>
              <div style={{display: 'inline-block', paddingRight: '30px'}}>
                { this.criarDatePicker("data-especial-filtro-inicio", "Data especial início", dataEspecialInicioFiltro, 'dataEspecialInicioFiltro' ) }
              </div>
              <div style={{display: 'inline-block'}}>
                { this.criarDatePicker("data-especial-filtro-fim", "Data especial fim", dataEspecialFimFiltro, 'dataEspecialFimFiltro' ) }
              </div>
          </MuiPickersUtilsProvider>
        </div>
        <div className='div-filtrar-horario-especial'>
          <Button id='btn-filtrar-horario-especial' autoFocus onClick={this.filtrar}> Filtrar </Button>
        </div>
      </div>
    )
  }

  adicionarHorarioEspecial() {
    let novoRegistro = {
      dataEspecial: this.state.dataAdicao.toLocaleDateString("pt-BR"),
      abertura: this.state.horarioAbertura,
      fechamento: this.state.horarioFechamento
    }

    this.props.adicionarHorarioDiferenciado(novoRegistro)

    this.setState({dataAdicao: new Date(), horarioAbertura: "00:00", horarioFechamento: "00:00"})
  }

  getTabelaModelo() {    
    let colunas = [
      { id: 'dataCadastro', titulo: 'Data de Cadastro' },
      { id: 'dataEspecial',  titulo: 'Data Especial' },
      { id: 'abertura', titulo: 'Abertura' },
      { id: 'fechamento',  titulo: 'Fechamento' }
    ];

    let { horariosDiferenciados } = this.props.cadastroStore

    let linhas = horariosDiferenciados ? 
        horariosDiferenciados.map(linha => ({  
          id: linha.id,
          valores: [linha.data_cadastro, linha.data_especial, linha.abertura, linha.fechamento] 
        })) : []

    return new TabelaModelo(colunas, linhas)
  }

  removerHorariosDiferenciados(idsHorarios) {
    let { horariosDiferenciados } = this.props.cadastroStore
    var idsHorariosDiferenciados = horariosDiferenciados.map(hd => hd.id)
    
    idsHorarios ? 
      idsHorarios.map(id => {
          let index = idsHorariosDiferenciados.indexOf(id)
          horariosDiferenciados.splice(index, 1)

          this.props.removerHorarioDiferenciado(id) 
      }) : null

      this.setState({horariosDiferenciados: horariosDiferenciados})
  }

  render() {

    let { horarioAbertura, horarioFechamento } = this.state

    return (
      <div className='container-hora-especial'>
        <div style={{width:'100%', margin: '0 auto', padding: '15px', marginBottom: '10px', border: '1px solid rgb(214, 214, 214)'}}>

          <div style={{marginBottom: '10px'}}>
            <span className='texto'> Adicionar novo horário diferenciado </span>
          </div>

          <div className='div-data'>
            <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
              { this.criarDatePicker("data-adicionar", "Data", this.state.dataAdicao, 'dataAdicao' ) }
            </MuiPickersUtilsProvider>
          </div>
          <div className='container-horas'>
            <div className='div-horas-inicio-termino'> 
              <TextField 
                  id='horario-abertura' 
                  type="time"
                  label='Abertura' 
                  defaultValue="00:00"
                  value={horarioAbertura} 
                  onChange={(event) => this.handleDateChange(event.target.value, 'horarioAbertura')}/> 
            </div>
            <div className='div-horas-inicio-termino'> 
              <TextField 
                  id='horario-fechamento' 
                  type='time'
                  label='Fechamento' 
                  defaultValue="00:00"
                  value={horarioFechamento} 
                  onChange={(event) => this.handleDateChange(event.target.value, 'horarioFechamento')}/> 
            </div>
          </div>
          <div className='div-btn-adicionar-horario-especial'>
            <Button id='btn-adicionar-horario-especial' autoFocus onClick={this.adicionarHorarioEspecial}> + Adicionar </Button>
          </div>
        </div>    
        <div style={{width: '100%', margin: '0 auto'}}>
          <Tabela 
            habilitarCheckBox={true} 
            headerToolbar={this.criarHeaderBusca} 
            tabelaModelo={this.getTabelaModelo()} 
            remover={this.removerHorariosDiferenciados}/>
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

export default connect(mapStateToProps)(HorarioEspecial)

HorarioEspecial.propTypes = {
  adicionarHorarioDiferenciado: PropTypes.func.isRequired,
  removerHorarioDiferenciado: PropTypes.func.isRequired,
  filtrarHorarioDiferenciado: PropTypes.func.isRequired
}
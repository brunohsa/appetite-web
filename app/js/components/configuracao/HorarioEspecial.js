import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/locale';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import TabelaModelo from '../../modelos/TabelaModelo'

import Tabela from '../common/Tabela'

import '../../../styles/configuracoes/horario-especial.css';

const linhas = [
  { 
    id: 1,
    dataCadastro: '14/08/2020', 
    dataEspecial: '04/11/2020',
    abertura: '12:00',
    fechamento: '16:00'
  },
  { 
    id: 2,
    dataCadastro: '12/08/2020', 
    dataEspecial: '25/12/2020',
    abertura: '12:00',
    fechamento: '16:00'
  }
];


class HorarioEspecial extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataAdicao: new Date(),
      dataCadastroFiltro: null,
      dataEspecialFiltro: null,
      horarioAbertura: '00:00',
      horarioFechamento: '00:00',
      linhas: linhas
    }

    this.handleDateChange = this.handleDateChange.bind(this)
    this.criarHeaderBusca = this.criarHeaderBusca.bind(this)
    this.adicionarHorarioEspecial = this.adicionarHorarioEspecial.bind(this)
    this.getTabelaModelo = this.getTabelaModelo.bind(this)
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

  criarHeaderBusca() {
    let { dataCadastroFiltro, dataEspecialFiltro } = this.state
  
    return (
      <div style={{width: '100%'}}>
        <div style={{display: 'inline-block', width: '50%'}}>
          <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
              <div style={{display: 'inline-block', paddingRight: '30px'}}>
                {  this.criarDatePicker("data-cadastro-filtro", "Data de cadastro", dataCadastroFiltro, 'dataCadastroFiltro' ) }
              </div>
              <div style={{display: 'inline-block'}}>
                { this.criarDatePicker("data-especial-filtro", "Data especialo", dataEspecialFiltro, 'dataEspecialFiltro' ) }
              </div>
          </MuiPickersUtilsProvider>
        </div>
        <div className='div-filtrar-horario-especial'>
          <Button id='btn-filtrar-horario-especial' autoFocus> Filtrar </Button>
        </div>
      </div>
    )
  }

  adicionarHorarioEspecial() {
    let novoRegistro = {
      id: 3,
      dataCadastro: new Date().toLocaleDateString("pt-BR"), 
      dataEspecial: this.state.dataAdicao.toLocaleDateString("pt-BR"),
      abertura: this.state.horarioAbertura,
      fechamento: this.state.horarioFechamento
    }
    
    let linhasAtualizadas = this.state.linhas
    linhasAtualizadas.push(novoRegistro)
    this.setState({  
      linhas: linhasAtualizadas
    })
  }

  getTabelaModelo() {    
    let colunas = [
      { id: 'dataCadastro', titulo: 'Data de Cadastro' },
      { id: 'dataEspecial',  titulo: 'Data Especial' },
      { id: 'abertura', titulo: 'Abertura' },
      { id: 'fechamento',  titulo: 'Fechamento' }
    ];

    let linhas = this.state.linhas.map(linha => 
      (
        { id: linha.id,
          valores: [linha.dataCadastro, linha.dataEspecial, linha.abertura, linha.fechamento]
        }
      )
    )

    return new TabelaModelo(colunas, linhas)
  }

  render() {

    let { horarioAbertura, horarioFechamento } = this.state

    return (
      <div className='container-hora-especial'>
        <div style={{width:'95%', margin: '0 auto', marginBottom: '10px'}}>
          <div className='div-data'>
            <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
              { this.criarDatePicker("data-adicionar", "Data", this.state.dataAdicao, 'dataAdicao' ) }
            </MuiPickersUtilsProvider>
          </div>
          <div className='container-horas'>
            <div className='div-horas-inicio-termino'> 
              <TextField id='horario-abertura' type="time" label='Abertura' value={horarioAbertura} onChange={(event) => this.handleDateChange(event.target.value, 'horarioAbertura')}/> 
            </div>
            <div className='div-horas-inicio-termino'> 
              <TextField id='horario-fechamento' type='time' label='Fechamento' value={horarioFechamento} onChange={(event) => this.handleDateChange(event.target.value, 'horarioFechamento')}/> 
            </div>
          </div>
          <div className='div-btn-adicionar-horario-especial'>
            <Button id='btn-adicionar-horario-especial' autoFocus onClick={this.adicionarHorarioEspecial}> + Adicionar </Button>
          </div>
        </div>    
        <div style={{width: '95%', margin: '0 auto'}}>
          <Tabela headerToolbar={this.criarHeaderBusca} linhas={this.state.linhas} tabelaModelo={this.getTabelaModelo()}/>
        </div>
      </div>
    )
  }
}

export default HorarioEspecial
import React, { Component } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/locale';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../../../styles/horario-especial.css';

class HorarioEspecial extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: new Date()
    }

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(data) {
    this.setState({
      data: data
    })
  }

  render() {

    function criarHeaderBusca() {
      return (
        <div style={{width: '100%'}}>
          <div style={{display: 'inline-block', width: '50%'}}>
            <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                <div style={{display: 'inline-block', paddingRight: '30px'}}>
                  <KeyboardDatePicker
                    id="date-picker-filtro-data-cadastro"
                    label="Data de cadastro"
                    format="dd/MM/yyyy"
                    value={null}
                    //onChange={this.handleDateChange}
                    KeyboardButtonProps={{'aria-label': 'change date'}}
                    okLabel='Confirmar'
                    cancelLabel='Fechar'
                  />
                </div>
                <div style={{display: 'inline-block'}}>
                  <KeyboardDatePicker
                    id="date-picker-buscar"
                    label="Data especial"
                    format="dd/MM/yyyy"
                    value={null}
                    //onChange={this.handleDateChange}
                    KeyboardButtonProps={{'aria-label': 'change date'}}
                    okLabel='Confirmar'
                    cancelLabel='Fechar'
                  />
                </div>
            </MuiPickersUtilsProvider>
          </div>
          <div className='div-filtrar-horario-especial'>
            <Button id='btn-filtrar-horario-especial' autoFocus> Filtrar </Button>
          </div>
        </div>
      )
    }

    return (
      <div className='container-hora-especial'>
        <div style={{width:'90%', margin: '0 auto', marginBottom: '10px'}}>
          <div className='div-data'>
            <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="date-picker-dialog"
                label="Data"
                format="dd/MM/yyyy"
                value={this.state.data}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{'aria-label': 'change date'}}
                okLabel='Confirmar'
                cancelLabel='Fechar'
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className='container-horas'>
            <div className='div-horas-inicio-termino'> 
              <TextField id="time" type="time" label='Início' defaultValue="00:00"/> 
            </div>
            <div className='div-horas-inicio-termino'> 
              <TextField id="time" type="time" label='Termino' defaultValue="00:00"/> 
            </div>
          </div>
          <div className='div-btn-adicionar-horario-especial'>
            <Button id='btn-adicionar-horario-especial' autoFocus> + Adicionar </Button>
          </div>
        </div>
        <div style={{border: '1px solid #d6d6d6', width: '90%', margin: '0 auto', padding: '10px'}}>
            { criarHeaderBusca() }
            <div style={{height: '200px', width: '100%'}}>
              <div style={{textAlign: 'center', paddingTop: '100px'}}> AQUI VAI TER UMA TABELA </div>
            </div>
        </div>
      </div>
    )
  }
}

export default HorarioEspecial
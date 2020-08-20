import React, { Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';

import '../../../styles/configuracoes/horario-funcionamento.css';

const diasDaSemana = [
  {
    id: 'SEGUNDA',
    titulo: 'Seg'
  },
  {
    id: 'TERCA',
    titulo: 'Terç'
  },
  {
    id: 'QUARTA',
    titulo: 'Qua'
  },
  {
    id: 'QUINTA',
    titulo: 'Qui'
  },
  {
    id: 'SEXTA',
    titulo: 'Sex'
  },
  {
    id: 'sabado',
    titulo: 'Sáb'
  },
  {
    id: 'domingo',
    titulo: 'Dom'
  }
]

const horariosFuncionamento = [
  {
    dia: 'SEGUNDA',
    inicio: '10:00',
    termino: '12:00'
  },
  {
    dia: 'TERCA',
    inicio: '16:00',
    termino: '18:00'
  },
  {
    dia: 'QUARTA',
    inicio: '16:00',
    termino: '18:00'
  },
  {
    dia: 'QUINTA',
    inicio: '09:00',
    termino: '18:00'
  },
  {
    dia: 'SEXTA',
    inicio: '09:00',
    termino: '18:00'
  }
]

class HorarioFuncionamento extends Component {

  constructor(props) {
    super(props)

    this.state = {
      horariosFuncionamento: horariosFuncionamento
    }

    this.adicionarNovoHorario = this.adicionarNovoHorario.bind(this)
  }

  getMapaHorariosFuncionamento() {
    let mapa = new Map()
    let { horariosFuncionamento } = this.state
    
    horariosFuncionamento.map(hf => {
      let key = hf.inicio + '-' + hf.termino
      let horasFunc = mapa.get(key)

      if(horasFunc) {
        horasFunc.dias.push(hf.dia)
      } else {
        let horaFunc = {
          inicio: hf.inicio,
          termino: hf.termino,
          dias: [hf.dia]
        }
        mapa.set(key, horaFunc)
      }
    })

    return mapa
  }

  preencherListaHorariosFuncionamento() {
    let horariosFuncionamento = []
    let mapaHorarios = this.getMapaHorariosFuncionamento()
    for(let [key, hrsf] of mapaHorarios) {
      horariosFuncionamento.push(this.criarLinhaDiasDaSemana(hrsf))
    }

    return horariosFuncionamento
  }

  removerHorariosFuncionamento(horarioFun) {
    let hrsFuncionamento = this.state.horariosFuncionamento
    horarioFun.dias.map(d => {
      hrsFuncionamento.forEach((hf, index) => {
        if(hf.dia == d && (hf.inicio == horarioFun.inicio && hf.termino == horarioFun.termino)) {
          hrsFuncionamento.splice(index, 1)
          this.setState({
            horariosFuncionamento: horariosFuncionamento
          })
        }
      })
    }) 
  }

  criarLinhaDiasDaSemana(horarioFuncionamento) {
    return (
      <tr>
        <td className='divider-tabela'>
          { 
            diasDaSemana.map(ds =>
              {
                let marcarCheck = horarioFuncionamento.dias.includes(ds.id)
                return  <div style={{display: 'inline-block'}}>
                          <span> {ds.titulo} </span>
                          { 
                            marcarCheck ? <Checkbox defaultChecked color="default" /> 
                                        : <Checkbox color="default" /> 
                          }
                        </div>
              }
            )
          }
        </td>
        <td className='divider-tabela'>
          <TextField id="time" type="time" defaultValue="00:00" value={horarioFuncionamento.inicio} />
        </td>
        <td className='divider-tabela'>
          <TextField id="time" type="time" defaultValue="00:00" value={horarioFuncionamento.termino} />
        </td>
        <td className= 'divider-tabela border-right-none' id='td-remover'>
          <Button autoFocus onClick={() => this.removerHorariosFuncionamento(horarioFuncionamento)}> 
            <DeleteIcon style={{color: '#383838'}} />
          </Button>
        </td>
      </tr>
    )
  }

  adicionarNovoHorario() {
    let hrsFunc = this.state.horariosFuncionamento
    hrsFunc.push({
      dias: '',
      inicio: '00:00',
      termino: '00:00'
    })

    this.setState({
      horariosFuncionamento: hrsFunc
    })
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td className='divider-tabela border-right-none coluna-tabela'> Dias </td>
            <td className='divider-tabela border-right-none coluna-tabela'> Início </td>
            <td className='divider-tabela border-right-none coluna-tabela'> Término </td>
            <td className='divider-tabela border-right-none coluna-tabela'/>
          </tr>
          { this.preencherListaHorariosFuncionamento()}
        </table>
        <div className='div-btn-adicionar-horario'>
          <Button id='btn-adicionar' onClick={this.adicionarNovoHorario} autoFocus> + Adicionar </Button>
        </div>
      </div>
    )
  }
}

export default HorarioFuncionamento
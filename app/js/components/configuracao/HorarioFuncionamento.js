import React, { Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import iconeRemover from '../../../images/icons/remover.png';

import '../../../styles/horario-funcionamento.css';

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
    }
  }

  getMapaHorariosFuncionamento() {
    let mapa = new Map()
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

  criarLinhaDiasDaSemana(horariosFuncionamento) {
    return (
      <tr>
        <td>
          { 
            diasDaSemana.map(ds =>
              {
                let marcharCheck = horariosFuncionamento.dias.includes(ds.id)
                return  <div style={{display: 'inline-block'}}>
                          <span> {ds.titulo} </span>
                          { 
                            marcharCheck ? <Checkbox defaultChecked color="default" /> 
                                         : <Checkbox color="default" /> 
                          }
                        </div>
              }
            )
          }
        </td>
        <td>
          <TextField id="time" type="time" defaultValue="00:00" value={horariosFuncionamento.inicio} />
        </td>
        <td>
          <TextField id="time" type="time" defaultValue="00:00" value={horariosFuncionamento.termino}/>
        </td>
        <td className= 'border-right-none' id='td-remover'>
          <Button autoFocus> <img src={iconeRemover} width='25px' /> </Button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <table style={{width: '100%'}}>
          <tr>
            <td className='border-right-none coluna-tabela'> Dias </td>
            <td className='border-right-none coluna-tabela'> Início </td>
            <td className='border-right-none coluna-tabela'> Término </td>
            <td className='border-right-none coluna-tabela'/>
          </tr>
          { this.preencherListaHorariosFuncionamento()}
        </table>
        <div className='div-btn-adicionar-horario'>
          <Button id='btn-adicionar' autoFocus> + Adicionar </Button>
        </div>
      </div>
    )
  }
}

export default HorarioFuncionamento
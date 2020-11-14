import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import '../../../styles/configuracoes/horario-funcionamento.css';

class HorarioFuncionamento extends Component {

  constructor(props) {
    super(props)

    this.state = {
      horarios: null,
      editado: false
    }

    this.cancelarAlteracao = this.cancelarAlteracao.bind(this)
    this.alterarHorarioFuncionamento = this.alterarHorarioFuncionamento.bind(this)
    this.salvarAlteracao = this.salvarAlteracao.bind(this)
    this.alterarCheckFechado = this.alterarCheckFechado.bind(this)
  }

  getNomeDiaSemana(status) {
    switch(status) {
      case 'SEGUNDA':
        return 'Segunda-Feira'
      case 'TERCA':
        return 'Terça-Feira'
      case 'QUARTA':
        return 'Quarta-Feira'
      case 'QUINTA':
        return 'Quinta-Feira'
      case 'SEXTA':
        return 'Sexta-Feira'
      case 'SABADO':
        return 'Sábado'
      case 'DOMINGO':
        return 'Domingo'
    }
  }

  componentDidUpdate() {
    let { horariosFuncionamento } = this.props.cadastroStore
    if(!this.state.horarios && horariosFuncionamento) {
      let horarios = horariosFuncionamento.map(hf => Object.assign({}, hf))
      this.setState({horarios: horarios})
    }
  }

  alterarHorarioFuncionamento(horario, campo, valor) {
    horario[campo] = valor
    this.setState({horarios: this.state.horarios, editado: true})
  }

  alterarCheckFechado(hf, fechado) {
    if(fechado) {
      hf['abertura'] = null
      hf['fechamento'] = null
    }
    hf['fechado'] = fechado

    this.setState({horarios: this.state.horarios, editado: true})
  }

  salvarAlteracao() {
    let response = this.props.alterarHorariosFuncionamento(this.state.horarios)
    console.log(response)
    this.setState({editado: false})
  }

  cancelarAlteracao() {
    this.setState({horarios: null, editado: false})
  }

  render() {

    let { horarios, editado } = this.state
    let horariosFuncionamento = horarios ? horarios : this.props.cadastroStore.horariosFuncionamento

    return (
      <div style={{height: '650px'}}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Dia da Semana</TableCell>
                <TableCell align="center">Abertura</TableCell>
                <TableCell align="center">Fechamento</TableCell>
                <TableCell align="center">Fechado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { 
                horariosFuncionamento ? horariosFuncionamento.map(hf =>
                  <TableRow>
                    <TableCell align="center"> { this.getNomeDiaSemana(hf.dia) } </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="time"
                        defaultValue="00:00"
                        disabled={hf.fechado}
                        value={hf.abertura ? hf.abertura : "00:00"}
                        onChange={(e) => this.alterarHorarioFuncionamento(hf, 'abertura', e.target.value)}/>
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="time"
                        defaultValue="00:00"
                        disabled={hf.fechado}
                        value={hf.fechamento ? hf.fechamento : "00:00"} 
                        onChange={(e) => this.alterarHorarioFuncionamento(hf, 'fechamento', e.target.value)}/>
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox checked={hf.fechado} onChange={(e) => this.alterarCheckFechado(hf, e.target.checked)}/>
                    </TableCell>
                  </TableRow>
                ) : null
              }
            </TableBody>
          </Table>
        </TableContainer>
        {
          editado ?
          <div className='div-btns-horario-funcionamento'>
            <Button id='btn-cancelar-alteraracao-horario-funcionamento' onClick={this.cancelarAlteracao}> Cancelar </Button>
          </div> : null
        }
        <div className='div-btns-horario-funcionamento'>
          <Button id='btn-alterar-horario-funcionamento' onClick={this.salvarAlteracao}> Salvar </Button>
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

export default connect(mapStateToProps)(HorarioFuncionamento)

HorarioFuncionamento.propTypes = {
  alterarHorariosFuncionamento: PropTypes.func.isRequired
}
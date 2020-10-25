import React, { Component } from 'react';
import { connect } from 'react-redux'

import PropTypes from 'prop-types';

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
  }

  alterarHorarioDeFuncionamento(campo, valor) {
    this.setState({ 
      [campo]: valor
    })
  }

  render() {

    let { horariosFuncionamento } = this.props.cadastroStore

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Dia da Semana</TableCell>
              <TableCell align="center">Início</TableCell>
              <TableCell align="center">Término</TableCell>
              <TableCell align="center">Fechado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { 
              horariosFuncionamento ? horariosFuncionamento.map(hf =>
                <TableRow>
                  <TableCell align="center">
                    { hf.dia }
                  </TableCell>
                  <TableCell align="center">
                    <TextField 
                      type="time"
                      defaultValue="00:00" 
                      value={hf.inicio} />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="time"
                      defaultValue="00:00"
                      value={hf.termino} />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={hf.fechado}/>
                  </TableCell>
                </TableRow>
              ) : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      cadastroStore: state.cadastro
  }
}

export default connect(mapStateToProps)(HorarioFuncionamento)
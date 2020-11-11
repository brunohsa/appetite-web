import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MaskedInput from 'react-text-mask';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux'

const CustomFormControl = withStyles({
  root: {
    '& .MuiSelect-root': {
      fontSize: '15x',
      textAlign: 'initial'
    }
  }
})(FormControl);


const MENSAGEM_ERRO_CAMPO_OBRIGATORIO = '* Campo Obrigatório'

class FormEndereco extends Component {

  constructor(props) {
    super(props)

    let { endereco } = this.props.fornecedorStore
    this.state = {
      erros: {
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        estado: '',
        cidade: ''
      },
      cep: endereco ? endereco.cep : '',
      logradouro: endereco ? endereco.logradouro : '',
      numero: endereco ? endereco.numero : '',
      estado: endereco ? endereco.estado : '',
      bairro: endereco ? endereco.bairro : '',
      cidade: endereco ? endereco.cidade : ''
    }
  }

  handlerChange(campo, valor) {
    this.setState({
      [campo]: valor
    })
  }

  proximo() {
    if(!this.camposValidos()) {
      return
    }
    let body = this.getEnderecoBody()
    this.props.enderecoFornecedor(body)
    this.props.proximo(body);  
  }

  voltar() {
    let body = this.getEnderecoBody()
    this.props.enderecoFornecedor(body)
    this.props.voltar()
  }

  getEnderecoBody() {
    let { endereco } = this.props.localizacaoStore
    let enderecoBody = {
      cep: this.state.cep,
      logradouro: endereco && endereco.logradouro ? endereco.logradouro : this.state.logradouro,
      numero: this.state.numero,
      bairro:  endereco && endereco.bairro ? endereco.bairro : this.state.bairro,
      estado: endereco && endereco.estado ? endereco.estado : this.state.estado,
      cidade: endereco && endereco.cidade ? endereco.cidade : this.state.cidade
    }

    return enderecoBody
  }

  TextMaskCEP(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => { inputRef(ref ? ref.inputElement : null) }}
        mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

  camposValidos() {
    let { endereco } = this.props.localizacaoStore
    let { cep, logradouro, numero, bairro, estado, cidade } = this.state
    let erros = {
      cep: this.validarCampoObrigatorio(endereco && endereco.cep ? endereco.cep : cep),
      logradouro: this.validarCampoObrigatorio(endereco && endereco.logradouro ? endereco.logradouro : logradouro),
      numero: this.validarCampoObrigatorio(endereco && endereco.numero ? endereco.numero : numero),
      bairro: this.validarCampoObrigatorio(endereco && endereco.bairro ? endereco.bairro : bairro),
      estado: this.validarCampoObrigatorio(endereco && endereco.estado ? endereco.estado : estado),
      cidade: this.validarCampoObrigatorio(endereco && endereco.cidade ? endereco.cidade : cidade)
    }
    
    this.setState({ erros: erros })
    return erros.cep === '' && erros.logradouro === '' && erros.numero === '' && erros.bairro === '' && erros.estado === '' && erros.cidade === ''
  }

  validarCampoObrigatorio(value) {
    return value !== null && value !== '' ? '' : MENSAGEM_ERRO_CAMPO_OBRIGATORIO
  }

  getEstadoPorSigla(siglaEstado) {
    let { estados } = this.props.localizacaoStore
    return estados.filter(e => e.sigla == siglaEstado)[0].nome
  }

  render() {
    let props = this.props
    let { estados, endereco } = this.props.localizacaoStore
    let { cep, logradouro, numero, bairro, estado, cidade, erros } = this.state

    return (
      <div>
        <div>
          <TextField id="txtCEP" 
                     label="CEP"
                     required
                     value={cep} 
                     onChange={(event) => this.handlerChange('cep', event.target.value)} 
                     error={erros.cep != ''} 
                     helperText={erros.cep}
                     style={{width: '55%'}}
                     onBlur={() => this.props.buscarEnderecoPorCEP(cep)}
                     InputProps={{ inputComponent: this.TextMaskCEP}}/>
        </div>
        <div style={{paddingTop:'10px'}}>
          <TextField id="txtEndereco" 
                     label="Endereco" 
                     required
                     disabled={endereco && endereco.logradouro}
                     value={endereco && endereco.logradouro ? endereco.logradouro : logradouro }
                     onChange={(event) => this.handlerChange('logradouro', event.target.value)} 
                     error={erros.logradouro != ''} 
                     helperText={erros.logradouro}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtNumero" 
                     label="Número"
                     margin="normal"
                     required
                     value={numero} 
                     onChange={(event) => this.handlerChange('numero', event.target.value)}  
                     error={erros.numero != ''} 
                     helperText={erros.numero}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField id="txtBairro" 
                     label="Bairro"
                     margin="normal"
                     required
                     disabled={endereco && endereco.bairro}
                     value={endereco && endereco.bairro ? endereco.bairro : bairro }
                     onChange={(event) => this.handlerChange('bairro', event.target.value)}  
                     error={erros.bairro != ''} 
                     helperText={erros.bairro}
                     style={{width: '55%'}}/>
        </div>
        <div>
          <TextField
            label="Estado"
            margin="normal"
            required
            style={{width: '27.5%', paddingRight: '20px'}}
            disabled={endereco && endereco.estado}
            value={endereco && endereco.estado ? this.getEstadoPorSigla(endereco.estado) : estado}
            onChange={(e) => this.handlerChange('estado', e.target.value)}
            error={erros.estado != ''} 
            helperText={erros.estado}
            select
            SelectProps={{ native: true }}>
            { <option value={''}> { '' } </option>  }
            {  estados ? estados.map(e => <option value={e.nome}> { e.nome } </option> ) : null }
          </TextField>
          <TextField 
            id="txtCidade" 
            label="Cidade" 
            margin="normal"
            required
            disabled={endereco && endereco.cidade}
            value={endereco && endereco.cidade ? endereco.cidade : cidade }
            onChange={(event) => this.handlerChange('cidade', event.target.value)}  
            error={erros.cidade != ''} 
            helperText={erros.cidade}
            style={{width: '27.5%'}}/> 
        </div>

        <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
          <Button variant="contained" style={{backgroundColor: 'rgb(183, 28, 28)', color: 'white'}} onClick={() => this.voltar()} className={props.class}> Voltar </Button>
          <Button variant="contained"style={{backgroundColor: 'rgb(183, 28, 28)', color: 'white'}} onClick={() => this.proximo()} className={props.class}> Finalizar </Button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      fornecedorStore: state.fornecedor,
      localizacaoStore: state.localizacao
  }
}

export default connect(mapStateToProps)(FormEndereco)

FormEndereco.propTypes = {
  enderecoFornecedor: PropTypes.func.isRequired,
  voltar: PropTypes.func.isRequired,
  proximo: PropTypes.func.isRequired,
  class: PropTypes.string.isRequired
}
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux'

import { withRouter } from "react-router-dom";

import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';

import FormAcesso from './cadastro/FormAcesso'
import FormEndereco from './cadastro/FormEndereco'
import FormInformacoes from './cadastro/FormInformacoes'

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: 'rgb(183, 28, 28)',
    },
  },
  completed: {
    '& $line': {
      borderColor: 'rgb(183, 28, 28)',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);


const styles = theme => ({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: 'rgb(183, 28, 28)',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: 'rgb(183, 28, 28)',
    zIndex: 1,
    fontSize: 18,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
    
})

class CadastroComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0
    }

    this.QontoStepIcon = this.QontoStepIcon.bind(this)
    this.acaoVoltar = this.acaoVoltar.bind(this)
    this.acaoProximo = this.acaoProximo.bind(this)
  }

  componentDidUpdate() {
    let { fornecedor, erro } = this.props
    if(fornecedor.cadastroRealizado && fornecedor.enderecoCadastrado) {
      this.props.history.push('/home');
    }
    
    if(fornecedor.cadastroRealizado && fornecedor.endereco && !fornecedor.enderecoCadastrado && !erro.mensagem) {
      this.props.adicionarEndereco(fornecedor.endereco)
    }
  }

  renderForm() {
    let { classes, loginFornecedor, informacoesFornecedor, enderecoFornecedor, buscarEnderecoPorCEP } = this.props;
    switch(this.state.activeStep) {
      case 0 :
        return <FormAcesso loginFornecedor={loginFornecedor} voltar={this.acaoVoltar} proximo={this.acaoProximo} class={classes.button}/>
      case 1 :
        return <FormInformacoes informacoesFornecedor={informacoesFornecedor} voltar={this.acaoVoltar} proximo={this.acaoProximo}  class={classes.button}/>
      case 2 :
        return <FormEndereco enderecoFornecedor={enderecoFornecedor} buscarEnderecoPorCEP={buscarEnderecoPorCEP} voltar={this.acaoVoltar} proximo={this.acaoProximo} class={classes.button} />
    }
  }

  acaoVoltar() {
    let stepAtual = this.state.activeStep - 1;
    this.setState({ activeStep: stepAtual })
  }

  acaoProximo() {
    let totaisSteps = this.getSteps().length
    let stepAtual = this.state.activeStep + 1;
    let step = stepAtual == totaisSteps ? totaisSteps - 1 : stepAtual
    this.setState({ activeStep: step })

    let { fornecedor } = this.props
    if(stepAtual == this.getSteps().length && !fornecedor.cadastroRealizado) {
      this.props.salvarFornecedor(fornecedor.login, fornecedor.informacoes)
    }
  }

  handleReset() {
    this.setState({ activeStep: 0 })
  }

  QontoStepIcon(propsStep) {
    let { active, completed } = propsStep;
    let { classes } = this.props;

    return (
      <div className={clsx(classes.root, {[classes.active]: active })} >
        { completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }

  getSteps() {
    return ['Acesso', 'Suas informações', 'Endereço'];
  }

  render() {
    let { activeStep } = this.state
    let steps = this.getSteps()

    return (
        <div style={{height: '100%', width: '60%', margin: '0px auto', paddingTop: '30px'}}>
          <Stepper style={{backgroundColor: '#F0F0F0'}} alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {
              steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={this.QontoStepIcon}> {label} </StepLabel>
                </Step>
              ))
            }
          </Stepper>
          <div style={{textAlign: 'center'}}> 
            { this.renderForm() } 
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      fornecedor: state.fornecedor,
      erro: state.erro
  }
}

export default withStyles(styles)(withTheme(withRouter(connect(mapStateToProps)(CadastroComponent))))

CadastroComponent.propTypes = {
  loginFornecedor: PropTypes.func.isRequired,
  informacoesFornecedor: PropTypes.func.isRequired,
  enderecoFornecedor: PropTypes.func.isRequired,
  salvarFavorecido: PropTypes.func.isRequired,
  buscarEnderecoPorCEP: PropTypes.func.isRequired,
  adicionarEndereco: PropTypes.func.isRequired,
}
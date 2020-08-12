import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

const useQontoStepIconStyles = makeStyles({
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
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Acesso', 'Suas informações', 'Endereço'];
}

export default function CadastroComponent() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  
  function renderForm() {
    switch(activeStep) {
      case 0 :
        return <FormAcesso voltar={() => acaoVoltar()} proximo={() => acaoProximo()}  class={classes.button}/>
      case 1 :
        return <FormInformacoes voltar={() => acaoVoltar()} proximo={() => acaoProximo()}  class={classes.button}/>
      case 2 :
        return <FormEndereco voltar={() => acaoVoltar()} proximo={() => acaoProximo()}  class={classes.button}/>
    }
  }

  function acaoVoltar() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function acaoProximo() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function renderButtons() {
    return <div>
      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}> Voltar </Button>
      <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
        {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
      </Button>
    </div>
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  function handleReset() {
    setActiveStep(0);
  };

  function renderFormPreenchido() {
    return <div>
      <Typography className={classes.instructions}>
        All steps completed - you&apos;re finished
      </Typography>
      <Button onClick={handleReset} className={classes.button}>
        Reset
      </Button>
    </div>
  }

  return (
      <div style={{height: '100%', width: '60%', margin: '0px auto', paddingTop: '30px'}}>
        <Stepper style={{backgroundColor: '#F0F0F0'}} alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          { activeStep === steps.length ? 
            (renderFormPreenchido()) : 
            (<div>
              <div style={{textAlign: 'center'}}> { renderForm() } </div>                          
            </div>)
          }
        </div>
      </div>
  );
}
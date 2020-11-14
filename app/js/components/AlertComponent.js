import React, {Component} from 'react';
import { connect } from 'react-redux'

import Alert from '@material-ui/lab/Alert';

import '../../styles/common.css';

class AlertComponent extends Component {

    constructor(props) {
        super(props)
    }

    getMensagemETipo() {
        let { mensagemStore, erroStore } = this.props
        let mensagem = ''
        let tipo = ''

        if(erroStore.mensagem) {
            mensagem = erroStore.mensagem
            tipo = 'error'
        } else if (mensagemStore.mensagem) {
            mensagem = mensagemStore.mensagem
            tipo = 'success'
        }

        return { mensagem: mensagem, tipo: tipo }
    }

    render() {
        let mensagemETipo = this.getMensagemETipo()
        return (
            <div className={mensagemETipo.mensagem ? 'alert-container show' : 'alert-container'}>
                <Alert style={{fontSize: '16px'}} variant="filled" severity={mensagemETipo.tipo}> 
                    { mensagemETipo.mensagem }
                </Alert>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mensagemStore: state.mensagem,
        erroStore: state.erro
    }
  }

  
export default connect(mapStateToProps)(AlertComponent)
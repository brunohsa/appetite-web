import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Alert from '@material-ui/lab/Alert';

import '../../styles/common.css';

class AlertComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let { tipo, mensagem } = this.props
        return (
            <div className={mensagem ? 'alert-container show' : 'alert-container'}>
                <Alert style={{backgroundColor: 'rgb(183, 28, 28)', fontSize: '16px' }} variant="filled" severity={tipo}> 
                    { mensagem }
                </Alert>
            </div>
        )
    }
}
export default AlertComponent

AlertComponent.propTypes = {
    tipo: PropTypes.string.isRequired,
    mensagem: PropTypes.string,
  }
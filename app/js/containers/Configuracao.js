import React, {Component}from 'react';
import { withRouter } from 'react-router-dom'

import ConfiguracaoComponent from '../components/ConfiguracaoComponent';

import MenuApp from '../components/MenuApp';

class Configuracao extends Component {
	render() {

		return (
			<div style={{height: '100%', width: '100%'}}>
				<MenuApp />
				<ConfiguracaoComponent />
			</div>
		);
	}

}

export default withRouter(Configuracao);
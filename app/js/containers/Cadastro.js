import React, {Component}from 'react';
import { withRouter } from 'react-router-dom'


import CadastroComponent from '../components/CadastroComponent';

import '../../styles/not-found/not-found.css';
import MenuApp from '../components/MenuApp';

class Cadastro extends Component {
	render() {

		return (
			<div>
				<MenuApp />
				<CadastroComponent />
			</div>
		);
	}

}

export default withRouter(Cadastro);
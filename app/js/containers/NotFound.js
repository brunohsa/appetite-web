import React, {Component}from 'react';
import { withRouter } from 'react-router-dom'

import '../../styles/not-found/not-found.css';

class NotFound extends Component {

	render() {

		return (
			<div id="not-found">
				<div className="not-found">
					<div className="not-found-404"></div>
					<h1>404</h1>
					<h2>Oops! Página não encontrada</h2>
					<p>Desculpe mas a tela que você está buscando não existe, foi removida ou está temporariamente indispoível.</p>
					<a href='/home'> Voltar para a página principal </a>
				</div>
			</div>
		);
	}

}

export default withRouter(NotFound);
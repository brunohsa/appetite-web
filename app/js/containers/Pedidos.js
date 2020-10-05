import React, {Component}from 'react';
import { withRouter } from 'react-router-dom'

import MenuApp from '../components/MenuApp';

import PedidosComponente from '../components/PedidosComponente';

class Pedidos extends Component {
	render() {

		return (
			<div>
				<MenuApp />
				<PedidosComponente />
			</div>
		);
	}

}

export default withRouter(Pedidos);
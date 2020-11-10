import React, {Component} from 'react';
import { connect } from 'react-redux'

import CardapioComponent from '../components/CardapioComponent';

import '../../styles/login/login.css';

import cardapioAPI from '../redux/api/cardapioAPI'
import cardapioActions from '../redux/actions/creators/cardapioActionCreators'

class Cardapio extends Component {

    render() {
        let { criarCardapio, buscarCardapios, removerCardapio } = this.props

        return (
            <div style={{height: '100%', width: '100%'}}>
                <CardapioComponent criarCardapio={criarCardapio} buscarCardapios={buscarCardapios} removerCardapio={removerCardapio} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    	criarCardapio: (nomeCardapio) => {
            dispatch(cardapioActions.startLoaderTelaCardapios());
        	dispatch(cardapioAPI.criarCardapio(nomeCardapio));
	  	},
        buscarCardapios: () => {
            dispatch(cardapioActions.startLoaderTelaCardapios());
			dispatch(cardapioAPI.buscarCardapios());
        },
        removerCardapio: (idCardapio) => {
            dispatch(cardapioActions.startLoaderTelaCardapios());
			dispatch(cardapioAPI.removerCardapio(idCardapio));
        },
    }
}

export default connect(null, mapDispatchToProps)(Cardapio);
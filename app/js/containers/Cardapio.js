import React, {Component} from 'react';
import CardapioComponent from '../components/CardapioComponent';

import '../../styles/login/login.css';

class Cardapio extends Component {

    render() {
        return (
            <div style={{height: '100%', width: '100%'}}>
                <CardapioComponent />
            </div>
        );
    }
}

export default Cardapio;
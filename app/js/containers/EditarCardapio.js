import React, {Component} from 'react';
import CadastrarEditarCardapio from '../components/cardapio/CadastrarEditarCardapio';
import MenuApp from '../components/MenuApp';

class EditarCardapio extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let { cardapioId } = this.props
        return (
            <div style={{height: '100%', width: '100%'}}>
                <div style={{height: '8%'}}> <MenuApp /> </div>
                <div style={{height: '92%'}}> <CadastrarEditarCardapio cardapioId={cardapioId} /> </div>
            </div>
        );
    }
}

export default EditarCardapio
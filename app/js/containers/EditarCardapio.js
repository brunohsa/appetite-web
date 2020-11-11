import React, {Component} from 'react';
import { connect } from 'react-redux'

import cardapioActions from '../redux/actions/creators/cardapioActionCreators'
import cardapioAPI from '../redux/api/cardapioAPI'

import CadastrarEditarCardapio from '../components/cardapio/CadastrarEditarCardapio';
import MenuApp from '../components/MenuApp';

class EditarCardapio extends Component {

    constructor(props) {
        super(props)

        let { buscarCardapio, buscarCardapios, cardapioId } = this.props
        buscarCardapio(cardapioId)

        if(!this.props.cardapioStore.cardapios) {
            buscarCardapios()
        }
    }

    render() {
        let { cardapioId, alterarCategoria, adicionarProduto, alterarProduto, alterarImagemProduto, removerCategoria, 
              removerProduto, fazerDownloadImagem, buscarSubcategorias, alterarCardapio } = this.props
        
        return (
            <div style={{height: '100%', width: '100%'}}>
                <div> 
                    <MenuApp /> 
                </div>
                <div style={{height: '93.2%', overflowX: 'auto', position: 'relative'}}> 
                    <CadastrarEditarCardapio 
                        cardapioId={cardapioId}
                        alterarCardapio={alterarCardapio}
                        alterarCategoria={alterarCategoria} 
                        removerCategoria={removerCategoria}  
                        adicionarProduto={adicionarProduto} 
                        alterarProduto={alterarProduto} 
                        alterarImagemProduto={alterarImagemProduto}
                        removerProduto={removerProduto}
                        fazerDownloadImagem={fazerDownloadImagem}
                        buscarSubcategorias={buscarSubcategorias}/> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cardapioStore: state.cardapio
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      alterarCardapio: (idCardapio, cardapio) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.alterarCardapio(idCardapio, cardapio));
      },
      buscarCardapio: (idCardapio) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.buscarCardapio(idCardapio));
      },
      buscarCardapios: () => {
        dispatch(cardapioAPI.buscarCardapios());
      },
      adicionarCategoria: (idCardapio, nomeCategoria) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.adicionarCategoria(idCardapio, nomeCategoria));
      },
      alterarCategoria: (idCardapio, idCategoria, categoria) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.alterarCategoria(idCardapio, idCategoria, categoria));
      },
      adicionarProduto: (idCardapio, idCategoria, produto) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.adicionarProduto(idCardapio, idCategoria, produto));
      },
      alterarProduto: (idCardapio, idCategoria, idProduto, produto) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.alterarProduto(idCardapio, idCategoria, idProduto, produto));
      },
      alterarImagemProduto: (idProduto, imagemBase64) => {
        dispatch(cardapioAPI.alterarImagemProduto(idProduto, imagemBase64));
      },
      removerCategoria: (idCardapio, idCategoria) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.removerCategoria(idCardapio, idCategoria));
      },
      removerProduto: (idCardapio, idCategoria, idProduto) => {
        dispatch(cardapioActions.startLoaderTelaEditarCardapio());
        dispatch(cardapioAPI.removerProduto(idCardapio, idCategoria, idProduto));
      },
      fazerDownloadImagem: (idProduto) => {
        dispatch(cardapioAPI.fazerDownloadImagem(idProduto));
      },
      buscarSubcategorias: () => {
        dispatch(cardapioAPI.buscarSubcategorias());
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditarCardapio)
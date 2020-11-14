import cardapioActions from '../actions/creators/cardapioActionCreators'
import mensagemActions from '../actions/creators/mensagemActionCreators'

import requisicoesAjax from './requisicoesAjax'
import configs from '../configuracoes';

const CARDAPIOS_BASE_URL = 'v1/cardapios'
const PRODUTOS_BASE_URL = 'v1/produtos'
const CATEGORIA_BASE_URL = 'v1/categorias'

let carrinhoAPI = {

    criarCardapio(nomeCardapio) {
        let acao = (response, dispatch) => { 
            dispatch(cardapioActions.cardapioCriado(response.body));
            dispatch(mensagemActions.apresentarMensagemSucesso('Cardápio criado com sucesso.'))
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaCardapios());
        }
        
        let body = JSON.stringify({ nome: nomeCardapio })
        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/criar`
        return requisicoesAjax.post(getToken(), body, url, acao, customCatch)
    },

    alterarCardapio(idCardapio, cardapio) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
            dispatch(mensagemActions.apresentarMensagemSucesso('Cardápio alterado com sucesso.'))
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }
        
        let body = JSON.stringify({ nome: cardapio.nome, ativo: cardapio.ativo })
        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${idCardapio}/alterar`
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
    },

    removerCardapio(idCardapio) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.cardapioRemovido(response.body));
            dispatch(mensagemActions.apresentarMensagemSucesso('Cardápio removido com sucesso.'))
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaCardapios());
        }

        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${idCardapio}`
        return requisicoesAjax.delete(getToken(), url, acao, customCatch)
    },

    buscarCardapio(idCardapio) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.cardapioEncontrado(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }

        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${idCardapio}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    buscarCardapios() {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.cardapiosEncontrados(response.body));
            return response.body
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaCardapios());
        }

        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    adicionarCategoria(cardapioId, nomeCategoria) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.categoriaCriada(response.body));
            dispatch(mensagemActions.apresentarMensagemSucesso('Categoria adicionada com sucesso.'))
            return response.body
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }
        
        let body = JSON.stringify({ titulo: nomeCategoria })
        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${cardapioId}/adicionar-categoria`
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
    },

    alterarCategoria(cardapioId, categoriaId, categoria) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
            dispatch(mensagemActions.apresentarMensagemSucesso('Categoria alterada com sucesso.'));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }

        let body = JSON.stringify({
            titulo: categoria.titulo,
            subcategoria_id: categoria.subcategoria ? categoria.subcategoria.id : null
        })
        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${cardapioId}/cartegoria/${categoriaId}/alterar`
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
    },
    
    buscarSubcategorias() {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.subcategoriasEncontrada(response.body));
            return response
        }

        let url = `${configs.URL_MS_CARDAPIO}${CATEGORIA_BASE_URL}/subcategorias`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    removerCategoria(cardapioId, categoriaId) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.categoriaRemovida(response.body));
            dispatch(mensagemActions.apresentarMensagemSucesso('Categoria removida com sucesso.'))
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }

        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${cardapioId}/categoria/${categoriaId}`
        return requisicoesAjax.delete(getToken(), url, acao, customCatch)
    },

    adicionarProduto(idCardapio, idCategoria, produto) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.produtoCriado(response.body));
            dispatch(mensagemActions.apresentarMensagemSucesso('Produto adicionado com sucesso.'))
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }
        
        let body = JSON.stringify({ nome: produto.nome, valor: produto.valor })
        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${idCardapio}/categoria/${idCategoria}/adicionar-produto`
        return requisicoesAjax.put(getToken(), body, url, acao, customCatch)
    },

    alterarProduto(idCardapio, idCategoria, idProduto, produto) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
            dispatch(mensagemActions.apresentarMensagemSucesso('Produto alterado com sucesso.'))
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }

        let body = JSON.stringify({
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            estoque: produto.estoque
        })
        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${idCardapio}/categoria/${idCategoria}/produto/${idProduto}/alterar`
        return requisicoesAjax.put(getToken(), body,  url, acao, customCatch)
    },

    removerProduto(idCardapio, idCategoria, idProduto) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.produtoRemovido(response.body));
            dispatch(mensagemActions.apresentarMensagemSucesso('Produto removido com sucesso.'))
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderTelaEditarCardapio());
        }

        let url = `${configs.URL_MS_CARDAPIO}${CARDAPIOS_BASE_URL}/${idCardapio}/categoria/${idCategoria}/produto/${idProduto}`
        return requisicoesAjax.delete(getToken(), url, acao, customCatch)
    },

    alterarImagemProduto(idProduto, imagemBase64) {
        let acao = (response, dispatch) => {
            dispatch(mensagemActions.apresentarMensagemSucesso('Imagem do produto alterada.'))
            return response
        }
        let body = JSON.stringify({imagem: imagemBase64 })

        let url = `${configs.URL_MS_CARDAPIO}${PRODUTOS_BASE_URL}/${idProduto}/alterar-imagem`
        return requisicoesAjax.put(getToken(), body, url, acao)
    },
    
    fazerDownloadImagem(idProduto) {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.downloadImagemRealizado(response.body));
            return response
        }

        let url = `${configs.URL_MS_CARDAPIO}${PRODUTOS_BASE_URL}/${idProduto}/imagem/download`
        return requisicoesAjax.get(getToken(), url, acao)
    },

    buscarProdutosMelhoresAvaliados() {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.produtosMelhoresAvaliadosBuscado(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderBuscaProdutosMelhoresAvaliados());
        }
        let url = `${configs.URL_MS_CARDAPIO}${PRODUTOS_BASE_URL}/melhores-avaliados`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    },

    buscarProdutosMaisVendidos() {
        let acao = (response, dispatch) => {
            dispatch(cardapioActions.produtosMaisVendidosBuscado(response.body));
            return response
        }
        let customCatch = (dispatch) => {
            dispatch(cardapioActions.stopLoaderBuscaPedidosMaisVendidos());
        }
        let url = `${configs.URL_MS_CARDAPIO}${PRODUTOS_BASE_URL}/mais-vendidos`
        return requisicoesAjax.get(getToken(), url, acao, customCatch)
    }
}

function getToken() {
    return localStorage.getItem('token')
}

export default carrinhoAPI;
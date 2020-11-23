import actionTypes from '../actionTypes';

let localizacaoActions = {

    estadosEncontrados(estados) {
        return {
            type: actionTypes.ESTADOS_ENCONTRADOS,
            estados: estados
        }
    },

    enderecoEncontrado(endereco) {
        return {
            type: actionTypes.ENDERECO_ENCONTRADO,
            endereco: endereco
        }
    }
}

export default localizacaoActions;
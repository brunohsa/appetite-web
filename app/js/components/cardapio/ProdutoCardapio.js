import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import NumberFormat from 'react-number-format';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import semImagem from '../../../images/sem_imagem.jpg';

import '../../../styles/cardapio/cadastrar-editar-cardapio.css';
import '../../../styles/common.css';

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-input': {
            padding: '15px 0px 15px 10px',
            width: '100px',
            height: '20px'
        }
    }
})(TextField);

const TextFieldNome = withStyles({
    root: {
        '& .MuiInputBase-root': {
            color: '#989898',
            fontSize: '16px',
            fontWeight:'bold'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(112, 123, 129)',
        }
    }
})(TextField);

const DetalhesTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            padding: '0px 10px 0px 10px',
            width: '400px',
            height: '60px',
            fontSize: '15px',
            color: '#989898'
        }
    }
})(TextField);

class ProdutoCardapio extends Component {

    constructor(props) {
        super(props)

        let { produto } = this.props
        this.state = {
            editar: false,
            nome: produto.nome,
            valor: produto.valor,
            estoque: produto.estoque,
            imagem: produto.imagem,
            descricao: produto.descricao
        }

        this.alterarImagem = this.alterarImagem.bind(this)
        this.excluirProduto = this.excluirProduto.bind(this)
        this.fecharDialogRemocaoProduto = this.fecharDialogRemocaoProduto.bind(this)
    }

    componentDidMount() {
        this.setState({nome: null, valor: null, estoque: null, imagem: null})
    }

    handlerChange(state, valor) {
        this.setState({ [state]: valor })
    }

    alterarImagem(event) {
        let blob = event.target.files[0]
        
        var reader = new FileReader();
        reader.readAsDataURL(blob); 

        let scope = this
        let { produto, alterarImagemProduto } = this.props
        reader.onloadend = function() {
            let imagemBase64 = reader.result
            alterarImagemProduto(produto.id, imagemBase64)
            produto.url = imagemBase64
            
            scope.setState({ produto: produto })
        }
    }

    renderizarBotoesDefault() {
        return (
            <div>
                <Button autoFocus onClick={() => this.handlerChange('editar', true)}>
                    <EditIcon className='icones-produto-cardapio' />
                </Button>
                <Button autoFocus onClick={() => this.abrirDialogRemocaoProduto()}>
                    <DeleteIcon className='icones-produto-cardapio' />
                </Button>
            </div>
        )
    }

    renderizarBotoesEdicao() {
        return (
            <div>
                <Button autoFocus onClick={() => this.confirmarEdicao()}>
                    <CheckIcon className='icones-produto-cardapio' />
                </Button>
                <Button autoFocus onClick={() => this.cancelarEdicao()}>
                    <CancelIcon className='icones-produto-cardapio' />
                </Button>
            </div>
        )
    }
 
    confirmarEdicao() {
        let { nome, valor, estoque, descricao } = this.state
        let { cardapio, produto, categoria, alterarProduto } = this.props

        produto.nome = nome ? nome : produto.nome
        produto.valor = valor ? valor : produto.valor
        produto.estoque = estoque ? estoque : produto.estoque
        produto.descricao = descricao ? descricao : produto.descricao

        alterarProduto(cardapio.id, produto.id, categoria.id, produto)
        this.setState({ cardapio: cardapio, editar: false, nome: null, valor: null, estoque: null })
    }

    cancelarEdicao() {
        this.setState({ editar: false, nome: null, valor: null, estoque: null })
    }

    excluirProduto() {
        let { cardapio, categoria, produto, removerProduto } = this.props
        removerProduto(cardapio.id, categoria.id, produto.id)
        this.fecharDialogRemocaoProduto()
    }

    abrirDialogRemocaoProduto() {
        this.setState({ abrirDialogRemocaoProduto: true })
    }
    
    fecharDialogRemocaoProduto() {
        this.setState({ abrirDialogRemocaoProduto: false })
    }

    criarDialogRemocaoProduto() {
        return (
            <Dialog onClose={this.fecharDialogRemocaoProduto} open={this.state.abrirDialogRemocaoProduto}>
                <DialogTitle onClose={this.fecharDialogRemocaoProduto}> Informativo </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Deseja realmente remover o produto <span style={{fontWeight: 'bold'}}> {this.props.produto.nome} </span> ? <br/>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.fecharDialogRemocaoProduto} color="inherit"> Fechar </Button>
                    <Button autoFocus onClick={this.excluirProduto} color="Secondary"> Remover </Button>
                </DialogActions>
            </Dialog>
        )
    }

    NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;
      
        return (
          <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => { 
                onChange({
                    target: {
                    name: props.name,
                    value: values.value,
                    },
                });
            }
            }
            thousandSeparator
            isNumericString
            prefix='R$ '
          />
        )
    }

    render() {
        let { editar, nome, valor, estoque, descricao } = this.state
        let { produto } = this.props
        
        return (
            <div className='div-conteudo-produtos-categoria'>
                <div className='div-imagem-produto-cardapio'>
                    <label htmlFor={`inputImagemProduto-${produto.id}`} style={{cursor: 'pointer'}}>
                        <img className='img-produto-cardapio' src={ produto.url ? produto.url : semImagem } />
                    </label>
                    <input id={`inputImagemProduto-${produto.id}`} type="file" accept="image/jpeg" onChange={this.alterarImagem}/>
                </div>
                <div className='div-informacoes-produto-cardapio'>
                    <div className='div-nome-produto-categoria'>
                        <CustomTextField 
                            style={{width: '100%'}}
                            disabled={!editar}
                            label='Nome'
                            value={nome != null ? nome : produto.nome}
                            variant="outlined"
                            onChange={(event) => this.handlerChange('nome', event.target.value)}/>
                    </div>
                    <div className='div-descricao-produto'>
                        <DetalhesTextField 
                            disabled={!editar}
                            multiline
                            rowsMax={2} 
                            variant="outlined" 
                            label='Descrição' 
                            value={descricao ? descricao : ''} 
                            onChange={(event) => this.handlerChange('descricao', event.target.value)}/>
                    </div>
                    <div className='div-texts-valor-estoque-produto'>
                        <CustomTextField
                            disabled={!editar}
                            label='Valor'
                            value={valor ? valor : produto.valor}
                            variant="outlined"
                            onChange={(event) => this.handlerChange('valor', event.target.value ? parseFloat(event.target.value) : null)}
                            InputProps={{ inputComponent: this.NumberFormatCustom }}
                        />
                        <CustomTextField
                            disabled={!editar}
                            style={{marginLeft: '20px'}}
                            label='Estoque'
                            defaultValue={0}
                            value={estoque ? estoque : produto.estoque}
                            variant="outlined"
                            onChange={(event) => this.handlerChange('estoque', event.target.value ? parseInt(event.target.value) : null)}
                        />
                    </div>
                </div>
                <div className='div-botoes-produto-cardapio'>
                    { editar ? this.renderizarBotoesEdicao() : this.renderizarBotoesDefault() }
                </div>
                { this.state.abrirDialogRemocaoProduto ? this.criarDialogRemocaoProduto() : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cardapioStore: state.cardapio,
        erro: state.erro
    }
}

export default connect(mapStateToProps)(ProdutoCardapio)

ProdutoCardapio.propTypes = {
    cardapio: PropTypes.object.isRequired,
    categoria: PropTypes.object.isRequired,
    produto: PropTypes.object.isRequired,
    alterarProduto: PropTypes.func.isRequired,
    alterarImagemProduto: PropTypes.func.isRequired,
    removerProduto: PropTypes.func.isRequired,
    fazerDownloadImagem: PropTypes.func.isRequired
}
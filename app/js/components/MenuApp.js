import React, {Component} from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import { withStyles, withTheme } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AlertComponent from './AlertComponent';

import cardapioIcone from '../../images/icons/cardapio.png';
import configIcone from '../../images/icons/configuracoes.png';
import pedidosIcone from '../../images/icons/pedidos.png';
import sairIcone from '../../images/icons/sair.png';

import configs from '../redux/configuracoes'

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'inline'
  },
  
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
  hide: {
    display: 'none',
  },
  
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  
  drawerPaper: {
    width: drawerWidth,
  },
  
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class MenuApp extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleDrawerOpen() {
    this.setState({open: true});
  }

  handleDrawerClose() {
    this.setState({open: false});
  }

  navegar(path) {
    this.props.history.push(path);
  }
  
  sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('podeRedirecionar')
    this.navegar('/')
  }

  render() {
    let { classes, theme, cadastroStore} = this.props;
    let open = this.state.open
    
    let usuarioLogado = localStorage.getItem('token')
    let cadastroUUID = localStorage.getItem('cadastroUUID');
    let urlDownloadImagem = configs.URL_MS_DOWLOAD_IMAGEM_FORNECEDOR.replace('%s', cadastroUUID)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" style={{height: '100%'}} className={clsx(classes.appBar, {[classes.appBarShift]: open})}>
          <Toolbar style={{backgroundColor: 'rgb(183, 28, 28)', height: '100%'}}>
            {
              usuarioLogado ? 
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => this.handleDrawerOpen()}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                : null
            }
            
            <Typography variant="h6" color="inherit" style={{ flexGrow: '1'}}> 
              <Link to="/" style={{fontFamily: 'Arial, Helvetica, sans-serif', color: 'white', textDecoration: 'none'}}> Appetito </Link> 
            </Typography>

            {
              usuarioLogado 
              ? <div>
                  <Avatar 
                    style={{height:'52px', width: '52px'}} 
                    alt="Logo" 
                    src={cadastroStore.imagemFornecedor ? cadastroStore.imagemFornecedor : urlDownloadImagem } />
                </div>
              : null
            }
          </Toolbar>
        </AppBar>
        <Drawer
          style={{zIndex: '9999999999 !important'}}
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{paper: classes.drawerPaper}}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h6" color="inherit" style={{ flexGrow: '1'}}>
                  <a href="/home" style={{color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none'}}> Appetito </a>
            </Typography>
            <IconButton onClick={() => this.handleDrawerClose()}>
              { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
            </IconButton>
          </div>
          <Divider />
          <List style={{width: '100%'}}>
            <ListItem button onClick={() => this.navegar('/pedidos')}>
              <ListItemIcon> <img src={pedidosIcone} width='27px' height='27px' /> </ListItemIcon>
              <ListItemText primary={'Pedidos'} />
            </ListItem>
            <ListItem button onClick={() => this.navegar('/cardapios')}>
              <ListItemIcon> <img src={cardapioIcone} width='20px' height='22px'/> </ListItemIcon>
              <ListItemText primary={'Cardapios'} />
            </ListItem>
            <ListItem button onClick={() => this.navegar('/configuracoes')}>
              <ListItemIcon> <img src={configIcone} width='26px' /> </ListItemIcon>
              <ListItemText primary={'Configurações'} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => this.sair()}>
              <ListItemIcon> <img src={sairIcone} width='25px' height='26px'/> </ListItemIcon>
              <ListItemText primary={'Sair'} />
            </ListItem>
          </List>
        </Drawer>
        <AlertComponent />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
    cadastroStore: state.cadastro,
	}
}

export default withStyles(styles)(withTheme(withRouter(connect(mapStateToProps)(MenuApp))));
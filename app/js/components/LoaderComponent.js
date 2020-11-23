import React, {Component} from 'react';

import { withStyles, withTheme } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        position: 'absolute',
        height: '100% !important'
    },
})

class LoaderComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let { classes } = this.props;
        return (    
            <div style={{height: '100%', width: '100%', position: 'absolute', zIndex: 1000}}>
                <Backdrop className={classes.backdrop} open={true} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }
}
export default withStyles(styles)(withTheme(LoaderComponent))
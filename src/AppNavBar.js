import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    width: 300
  },
  bar: {
    backgroundColor: '#115293',
    alignItems: 'center',
  },
  margin: {
    
  },
  tool: {
    flexGrow: 1,
    alignItems: 'center',
  }
}));

const AppNavBar = (props) => {
    const {title} = props;
    const classes = useStyles();
    return (
        <div align="center" className={classes.root}>
            <AppBar className={classes.bar} position="relative">
                <Toolbar className={classes.tool} position="relative">
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <Link to='/addBook'>
                      <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
                        <AddIcon />
                      </Fab>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );    
};
AppNavBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default AppNavBar;
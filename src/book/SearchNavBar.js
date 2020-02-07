import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#FFFF'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
}));
  

const SearchNavBar = (props) => {
    const {handleSearchBooks} = props;
    const classes = useStyles();
    const [query, setQuery] = React.useState('');

    const handleChange = event => {
        handleTextOfSearchBox(event.target.value)
    };

    const handleTextOfSearchBox = (text) => {
        setQuery(text);
        handleSearchBooks(text);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to='/'>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="open drawer"
                            onClick={()=>handleTextOfSearchBox('')}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search books…"
                            onChange={handleChange}
                            value={query}
                            autoFocus={true}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SearchNavBar.propTypes = {
    handleSearchBooks: PropTypes.func.isRequired
}

export default SearchNavBar;
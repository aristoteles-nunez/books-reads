import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { green, blue, orange, red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

/**
 * Styles used for material-ui to render the components
 * correctly
 */
const useStyles = makeStyles(theme => ({
    green: {
        color: green[500],
        backgroundColor: '#fff', 
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    blue: {
        color: blue[500],
        backgroundColor: '#fff', 
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    orange: {
        color: orange[500],
        backgroundColor: '#fff', 
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    red: {
        color: red[500],
        backgroundColor: '#fff', 
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

/**
 * Returns the correct icon based on the shelfId
 * @param {*} shelf The shelfId
 */
const mapIconFromShelf = (shelf) => {
    if(shelf === 'currentlyReading') return <VisibilityIcon />
    if(shelf === 'read') return <LocalLibraryIcon />
    if(shelf === 'wantToRead') return <WatchLaterIcon />
    return <MenuBookIcon />
}

/**
 * Returns the text that is human readable from 
 * the shelfId
 * @param {*} shelf 
 */
const mapTextrFromShelf = (shelf) => {
    if(shelf === 'currentlyReading') return 'Currently reading';
    if(shelf === 'read') return 'Read';
    if(shelf === 'wantToRead') return 'Want to Read';
    return 'Not in personal library';
}

/**
 * The icon's color is different for each shelf
 * @param {*} shelf 
 */
const colorFromShelf = (shelf) => {
    if(shelf === 'currentlyReading') return 'blue';
    if(shelf === 'read') return 'green';
    if(shelf === 'wantToRead') return 'orange';
    return 'red';
}

/**
 * Renders the correct icon based on the shelf 
 * @param {*} props 
 */
const ShelfIcon = (props) => {
    const {shelf} = props;
    const classes = useStyles();
    const iconColor = colorFromShelf(shelf);
    return (
        <Avatar size="small" className={classes[iconColor]}>
            <Tooltip title={mapTextrFromShelf(shelf)}>
                {mapIconFromShelf(shelf)}
            </Tooltip>
        </Avatar>
    );
}

ShelfIcon.propTypes = {
    shelf: PropTypes.string
}
export default ShelfIcon;
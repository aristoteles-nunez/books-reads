import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const ChangeShelfBtn = (props) => {
    const {selectedShelf, handleShelfChange, bookId} = props;
    console.log(`bookId received: ${bookId}`);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOnItem = (bookId, item) => {
        console.log(`clicked on: ${bookId} ${item}`);
        handleShelfChange(bookId, item);
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClick}>
                <Tooltip title="Move to another shelf">
                    <SwapHorizIcon />
                </Tooltip>
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem selected={selectedShelf === 'currentlyReading'} onClick={() => handleClickOnItem(bookId, 'currentlyReading')}>
                    <ListItemIcon>
                        <VisibilityIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Currently reading" />
                </StyledMenuItem>
                <StyledMenuItem selected={selectedShelf === 'read'} onClick={() => handleClickOnItem(bookId, 'read')}>
                    <ListItemIcon>
                        <LocalLibraryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Read" />
                </StyledMenuItem>
                <StyledMenuItem selected={selectedShelf === 'wantToRead'} onClick={() => handleClickOnItem(bookId, 'wantToRead')}>
                    <ListItemIcon>
                        <WatchLaterIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Want to read" />
                </StyledMenuItem>
                <StyledMenuItem selected={selectedShelf === null} onClick={() => handleClickOnItem(bookId, 'none')}>
                    <ListItemIcon>
                        <MenuBookIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="None" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

ChangeShelfBtn.propTypes = {
    selectedShelf: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    bookId: PropTypes.string.isRequired
}

export default ChangeShelfBtn;
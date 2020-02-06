import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Box from '@material-ui/core/Box';
import ShelfIcon from './ShelfIcon';
import BookDetail from './BookDetail';

const useStyles = makeStyles(theme => ({
    root: {
        width: 220
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    media: {
        height: 250,
    },
    moveBtn: {
        marginLeft: 'auto'
    }
}));

const BookCard = (props) => {
    const {book} = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleBookDetailOpen = () => {
        setOpen(true);
      };

    const handleBookDetailClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
            <Paper elevation={4} className={classes.root}>
                <Card >
                    <CardActionArea onClick={handleBookDetailOpen}>
                        <CardMedia
                            className={classes.media}
                            image={book.imageLinks.thumbnail}
                            title={book.title}
                        />
                        <CardContent>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <Box
                                    component="div"
                                    my={2}
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    bgcolor="background.paper"
                                    className={classes.title}
                                >
                                    {book.title}
                                </Box>
                            </div>
                        
                            
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing>
                        <ShelfIcon shelf={book.shelf}/>
                        <Button size="small" color="primary" className={classes.moveBtn}>
                            <Tooltip title="Move to another shelf">
                                <SwapHorizIcon />
                            </Tooltip>
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
            <BookDetail book={book} open={open} handleBookDetailClose={handleBookDetailClose} />
        </div>
    );

}

BookCard.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookCard;
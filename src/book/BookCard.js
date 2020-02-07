import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ShelfIcon from './ShelfIcon';
import BookDetail from './BookDetail';
import ChangeShelfBtn from './ChangeShelfBtn';

/**
 * Styles used for material-ui to render the components
 * correctly
 */
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
    }
}));

/**
 * The `BookCard` render the book presentation, and provided the 
 * click capability to expose the detail of each book in modal mode
 * @param {*} props 
 */
const BookCard = (props) => {
    const {book, handleShelfChange} = props;
    const classes = useStyles();

    /**
     * The states for modal mode are used as described in the
     * `material-ui` documentation, and ii is handle to this level
     */
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
                            image={
                                book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail: './images/imageNotFound.jpg'
                            }
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
                        <ChangeShelfBtn selectedShelf={book.shelf} handleShelfChange={handleShelfChange} book={book}/>
                    </CardActions>
                </Card>
            </Paper>
            <BookDetail book={book} open={open} handleBookDetailClose={handleBookDetailClose} />
        </div>
    );

}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    handleShelfChange: PropTypes.func.isRequired
}

export default BookCard;
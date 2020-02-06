import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import BookTitle from './BookTitle'
import AuthorList from './AuthorList';
import ShelfIcon from './ShelfIcon';
import BookDetail from './BookDetail';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 220
    },
    title: {
        fontSize: 16,
    },
    media: {
        height: 180,
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
                        <CardHeader 
                            title={ 
                                <BookTitle className={classes.title} title={book.title}/>
                            }
                        />
                        <CardMedia
                            className={classes.media}
                            image={book.imageLinks.thumbnail}
                            title={book.title}
                        />
                        <CardContent>
                            <AuthorList authors={book.authors} />
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
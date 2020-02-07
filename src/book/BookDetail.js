import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import BookTitle from './BookTitle';
import AuthorList from './AuthorList';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: 500
    },
    image: {
        width: '100%'
    },
    description: {
        height: 210
    },
    authors: {
        fontWeight: 'bolder'
    }
}));

const BookDetail = (props) => {
    const {book, open, handleBookDetailClose} = props;
    const classes = useStyles();
    
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleBookDetailClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.content}>
                            <Grid container spacing={1} >
                                <Grid item xs={12} >
                                    <div align="center">
                                        <BookTitle title={book.title}/>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <img className={classes.image} alt={book.title} src={
                                        book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail: './images/imageNotFound.jpg'
                                        }/>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box component="div" className={classes.description} overflow="auto">
                                        {book.description}
                                    </Box>
                                </Grid>
                                {
                                    Array.isArray(book.authors)  && (
                                        <Grid item xs={12}>
                                            <div className={classes.authors} align="center">{book.authors.length > 1? 'Authors': 'Author'}</div>
                                            <AuthorList authors={book.authors}/>
                                        </Grid>
                                    )
                                }
                                
                                <Grid item xs={6}>
                                    <ul>
                                        <li>Publisher: {book.publisher}</li>
                                        <li>Published Date: {book.publishedDate}</li>
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul>
                                        <li>Pages: {book.pageCount}</li>
                                        <li>Average rating: {book.averageRating}</li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
} 

BookDetail.propTypes = {
    book: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleBookDetailClose: PropTypes.func.isRequired
}

export default BookDetail;
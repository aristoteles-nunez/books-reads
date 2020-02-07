import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(2),
    }
  }));


const BookList = (props) => {
    const {books, handleShelfChange} = props;
    const classes = useStyles();
    return (
        <div className={classes.mainContainer}>
            <Grid container justify="center" className={classes.root} spacing={2}>
                {
                    books.map((book)=>(
                        <Grid key={book.id} item >
                            <BookCard book={book} handleShelfChange={handleShelfChange}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
}

export default BookList;
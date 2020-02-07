import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }));


const BookList = (props) => {
    const {books, handleShelfChange} = props;
    const classes = useStyles();
    return (
        <div>
            <Grid container justify="center" className={classes.root} spacing={2}>
                {
                    books.map((book)=>(
                        <Grid key={book.title} item >
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
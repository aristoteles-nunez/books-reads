import React from 'react';
import PropTypes from 'prop-types';
import AppNavBar from './AppNavBar';
import BookCategories from './book/BookCategories';

/**
 * Component that displays the title and the books in each shelf
 * @param {*} props 
 */
const DisplayShelfs = (props) => {
    const {books, handleShelfChange, currentlyReading, wantToRead, read} = props;
    return (
        <div>
            <AppNavBar title={'My Reads'}/>
            <BookCategories 
                books={books} 
                handleShelfChange={handleShelfChange}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
            />
        </div>
    );
}

DisplayShelfs.propTypes = {
    books: PropTypes.object.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
}

export default DisplayShelfs;
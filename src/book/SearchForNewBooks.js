import React from 'react';
import PropTypes from 'prop-types';
import SearchNavBar from './SearchNavBar';
import BookList from './BookList';

const SearchForNewBooks = (props) => {
    const {handleSearchBooks, searchedBooks, handleShelfChange} = props;
    return (
        <div>
            <SearchNavBar handleSearchBooks={handleSearchBooks}/>
            <BookList 
                books={searchedBooks} 
                handleShelfChange={handleShelfChange}
            />
        </div>
    );
}

SearchForNewBooks.propTypes = {
    handleSearchBooks: PropTypes.func.isRequired,
    searchedBooks: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
}

export default SearchForNewBooks;
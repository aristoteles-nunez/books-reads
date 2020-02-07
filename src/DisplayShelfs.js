import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import BookCategories from './book/BookCategories';
import * as BooksAPI from './utils/BooksAPI';

class DisplayShelfs extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        console.log('Display shelfs loaded..');
        this.handleBooksRequest();
    }

    handleBooksRequest = () => {
        BooksAPI.getAll().then(books => this.setState({books:books}));
    }

    handleShelfChange = (bookId, shelf) => {
        console.log(`updating shelf with bookId:${bookId} shelf:${shelf}`);
        BooksAPI.update(bookId, shelf).then((response)=>{
            console.log(`response from updating: ${JSON.stringify(response)}`);
        }).then(()=>this.handleBooksRequest);
    }

    render() {
        return (
            <div>
                <AppNavBar title={'My Reads'}/>
                <BookCategories books={this.state.books} handleShelfChange={this.handleShelfChange}/>
            </div>
        );
        
    }
}

export default DisplayShelfs;
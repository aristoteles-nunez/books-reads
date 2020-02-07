import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import BookCategories from './book/BookCategories';
import * as BooksAPI from './utils/BooksAPI';

class DisplayShelfs extends Component {
    state = {
        books: {},
        currentlyReading:[],
        wantToRead:[],
        read:[]
    }

    componentDidMount() {
        console.log('Display shelfs loaded..');
        this.handleBooksRequest();
    }

    handleBooksRequest = () => {
        BooksAPI.getAll().then(booksArray => {
            const newBooks = {};
            const booksCurrentlyReading = [];
            const booksWantToRead = [];
            const booksRead = [];
            for(const book of booksArray){
                newBooks[book.id] = book;
                switch(book.shelf){
                    case 'currentlyReading':
                        booksCurrentlyReading.push(book.id);
                        break;
                    case 'wantToRead':
                        booksWantToRead.push(book.id);
                        break;
                    case 'read':
                        booksRead.push(book.id);
                        break;
                    default:
                        break;
                }
            }
            this.setState(()=>({
                books: newBooks,
                currentlyReading: booksCurrentlyReading,
                wantToRead: booksWantToRead,
                read: booksRead
            }));
        });
    }

    handleShelfChange = (book, shelf) => {
        console.log(`updating shelf with bookId:${book.id} shelf:${shelf}`);
        BooksAPI.update(book, shelf).then((response)=>{
            console.log(`response from updating: ${JSON.stringify(response)}`);
            this.setState(()=>(response));
            this.setState((prevState)=> {
                const updatedBooks = prevState.books;
                updatedBooks[book.id] = book;
                return (
                    {books: updatedBooks}
                );
            });
        });
    }

    render() {
        return (
            <div>
                <AppNavBar title={'My Reads'}/>
                <BookCategories 
                    books={this.state.books} 
                    handleShelfChange={this.handleShelfChange}
                    currentlyReading={this.state.currentlyReading}
                    wantToRead={this.state.wantToRead}
                    read={this.state.read}
                />
            </div>
        );
        
    }
}

export default DisplayShelfs;
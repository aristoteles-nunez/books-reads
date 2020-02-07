import React, { Component } from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue, amber } from '@material-ui/core/colors';
import SearchForNewBooks from './book/SearchForNewBooks';
import debounce from 'lodash/debounce';
import { Route } from 'react-router-dom';
import DisplayShelfs from './DisplayShelfs';
import * as BooksAPI from './utils/BooksAPI';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
    default: {
      main: '#115293'
    }
  },
});

class App extends Component {
  state = {
    books: {},
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchedBooks: []
  }
  constructor(){
    super();
    this.handleSearchBooksDebounced = debounce(this.emitSearch, 350);
  }

  componentDidMount() {
    console.log('App loaded..');
    this.handleBooksRequest();
  }

  handleBooksRequest = () => {
    console.log('Getting the books from the library...');
    BooksAPI.getAll().then(booksArray => {
      const newBooks = {};
      const booksCurrentlyReading = [];
      const booksWantToRead = [];
      const booksRead = [];
      for (const book of booksArray) {
        newBooks[book.id] = book;
        switch (book.shelf) {
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
      this.setState(() => ({
        books: newBooks,
        currentlyReading: booksCurrentlyReading,
        wantToRead: booksWantToRead,
        read: booksRead
      }));
    });
  }

  handleShelfChange = (book, shelf) => {
    console.log(`updating shelf with bookId:${book.id} shelf:${shelf}`);
    BooksAPI.update(book, shelf).then((response) => {
      // console.log(`response from updating: ${JSON.stringify(response)}`);
      book.shelf = shelf;
      this.setState(() => (response));
      this.setState((prevState) => {
        const updatedBooks = prevState.books;
        updatedBooks[book.id] = book;
        return (
          { books: updatedBooks }
        );
      });
    });
  }

  handleSearchBooks = (query) => {
    this.handleSearchBooksDebounced(query);
  }
  handleSearchBooksDebounced = (query) => {
    this.emitSearch(query);
  }
  emitSearch = (query) => {
    console.log(`Searching bor books with query: ${query}`);
    if(query && query !== '') {
      BooksAPI.search(query).then((response)=>{
        //console.log(`response: ${JSON.stringify(response)}`);
        const booksResult = [];
        if(response.error) {
          console.log('Empty results');
        } else {
          for(const book of response){
            book.shelf = this.state.books[book.id]? this.state.books[book.id].shelf: 'none';
            booksResult.push(book);
          }
        }
        this.setState(()=>({
          searchedBooks: booksResult
        }));
      });
    }else {
      this.setState(()=>({
        searchedBooks: []
      }));
    }
    
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Route exact path='/' render={()=>(
            <DisplayShelfs 
              books={this.state.books}
              handleShelfChange={this.handleShelfChange}
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
            /> 
          )}/>
          <Route exact path='/addBook' render={()=>(
              <SearchForNewBooks 
                handleSearchBooks={this.handleSearchBooks} 
                searchedBooks={this.state.searchedBooks}
                handleShelfChange={this.handleShelfChange}
              />
            )} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

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

/**
 * Styles used for material-ui to render the components
 * correctly
 */
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
    default: {
      main: '#115293'
    }
  },
});

/**
 * This is the main class that load all the components
 * It handles the state used in the components, because the main two components `DisplayShelfs`
 * and `SearchForNewBooks` share the same books origiin
 */
class App extends Component {
  /**
   * The state store the books as an object because it works like a dictionary
   * to access the data in O(1) time
   * 
   * For the shelfs an array of indexes are used
   */
  state = {
    books: {},
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchedBooks: []
  }

  /**
   * In the constructor was asigned the debounce function to avoid
   * a lot of calls when writting in the text search box
   */
  constructor(){
    super();
    this.handleSearchBooksDebounced = debounce(this.emitSearch, 350);
  }

  /**
   * When the main component is mounted, we make 
   * the initial call to get all the books in the current shelf
   */
  componentDidMount() {
    console.log('App loaded..');
    this.handleBooksRequest();
  }

  /**
   * @description This function maje the call to the getAll component
   * For each book returned we build the dictionary to access the books by id in O(1) time
   * and populate the state arrays accordinly to each shelf
   */
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

  /**
   * @description Funtion to handle when a book is changed to another shelf
   * @param {object} book The book that it's changing of shelf
   * @param {string} shelf The destination shelf where the book will reside
   */
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

  /**
   * @description Function to handle the search for new books
   * It will call the debounced version of the call
   * @param {string} query Text to search 
   */
  handleSearchBooks = (query) => {
    this.handleSearchBooksDebounced(query);
  }

  /**
   * @description Funtion to handle the search for new books
   * But this versions is debounced to avoid multiple calls
   * @param {string} query Text to search 
   */
  handleSearchBooksDebounced = (query) => {
    this.emitSearch(query);
  }

  /**
   * @description Function that actually makes the search call to the server
   * The response is processed to asign a value to each book accordingly to 
   * our library
   * @param {string} query Text to search 
   */
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

  /**
   * Render both main components using Routesß
   */
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

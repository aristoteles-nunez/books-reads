import React, { Component } from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue, amber } from '@material-ui/core/colors';
import SearchForNewBooks from './book/SearchForNewBooks';
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
    read: []
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
          <Route exact path='/addBook' component={SearchForNewBooks} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue, amber } from '@material-ui/core/colors';
import AppNavBar from './AppNavBar';
import BookCategories from './book/BookCategories';
import data from './input/data2.json';
import SearchForNewBooks from './book/SearchForNewBooks';
import { Route } from 'react-router-dom';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
    default: {
      main: '#115293'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Route exact path='/' render={() => (
          <div>
            <AppNavBar title={'My Reads'}/>
            <BookCategories books={data}/>
          </div>
          
        )} />
        <Route exact path='/addBook' component={SearchForNewBooks} />
      </div>
    </ThemeProvider>
  );
}

export default App;

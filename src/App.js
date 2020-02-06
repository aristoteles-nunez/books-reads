import React from 'react';
import './App.css';
import AppNavBar from './AppNavBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue, amber } from '@material-ui/core/colors';
import BookCategories from './book/BookCategories';
// import BookCard from './book/BookCard';
import data from './input/data.json';


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
        <AppNavBar title={'My Reads'}/>
        {/* <BookCard book={data.book}/> */}
        <BookCategories books={data}/>
        
      </div>
    </ThemeProvider>
  );
}

export default App;

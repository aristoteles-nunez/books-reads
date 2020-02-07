import React from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue, amber } from '@material-ui/core/colors';
import SearchForNewBooks from './book/SearchForNewBooks';
import { Route } from 'react-router-dom';
import DisplayShelfs from './DisplayShelfs';


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
        <Route exact path='/' component={DisplayShelfs} />
        <Route exact path='/addBook' component={SearchForNewBooks} />
      </div>
    </ThemeProvider>
  );
}

export default App;

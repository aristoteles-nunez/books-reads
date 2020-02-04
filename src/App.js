import React from 'react';
import './App.css';
import AppNavBar from './AppNavBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppNavBar title={'My Reads'}/>        
      </div>
    </ThemeProvider>
  );
}

export default App;

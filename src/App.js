import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import HomePage from '../src/pages/HomePage.js'
import GridPage from '../src/pages/GridPage.js'

const theme = createTheme({
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/grid" component={GridPage} />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
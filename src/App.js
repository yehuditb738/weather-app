import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage from '../src/pages/HomePage.js'
import GridPage from '../src/pages/GridPage.js'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/grid" element={<GridPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./routes/Home";
import About from './routes/About';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/about" exact={true} component={About}/>
    </BrowserRouter>
  )
}

export default App;
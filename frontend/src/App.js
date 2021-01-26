import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./routes/Home";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Route path="/" exact={true} component={Home}/>
    </BrowserRouter>
  )
}

export default App;
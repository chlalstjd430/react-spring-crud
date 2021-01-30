import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Posts from "./routes/Posts.js";
import About from './routes/About';
import './App.css';
import DetailPost from './routes/DetailPost';


function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Route path="/" exact={true} component={Posts}/>
      <Route path="/posts" exact={true} component={Posts}/>
      <Route path="/posts/:id" exact={true} component={DetailPost}/>
      <Route path="/about" exact={true} component={About}/>
    </BrowserRouter>
  )
}

export default App;
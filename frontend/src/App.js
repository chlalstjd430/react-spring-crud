import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Posts from "./routes/post/Posts.js";
import About from './routes/About';
import './App.css';
import DetailPost from './routes/post/DetailPost';
import CreatePost from './routes/post/CreatePost';
import UpdatePost from './routes/post/UpdatePost';


function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Switch>
        <Route path="/" exact={true} component={Posts}/>
        <Route path="/posts" exact={true} component={Posts}/>
        <Route path="/posts/create" exact={true} component={CreatePost}/>
        <Route path="/posts/:id" exact={true} component={DetailPost}/>
        <Route path="/posts/:id/edit" exact={true} component={UpdatePost}/>
        <Route path="/about" exact={true} component={About}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
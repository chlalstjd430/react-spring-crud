import React, { useState } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Posts from "./routes/post/Posts.js";
import About from './routes/About';
import './App.css';
import DetailPost from './routes/post/DetailPost';
import CreatePost from './routes/post/CreatePost';
import UpdatePost from './routes/post/UpdatePost';
import { PostsContext } from './context/PostsContext';
import { PostsPageInfoContext } from './context/PostsPageInfoContext';


function App() {
  const [posts, setPosts] = useState([]);
  const [postsPageInfo, setPostsPageInfo] = useState({last: false, currentPage: 0, nextPage: 0, total: 0 });

  return (
    <BrowserRouter>
      <Switch>
        <PostsContext.Provider value={{posts, setPosts}}>
          <PostsPageInfoContext.Provider value={{postsPageInfo, setPostsPageInfo}}>
            <Route path="/" exact={true} component={Posts}/>
            <Route path="/posts" exact={true} component={Posts}/>
          </PostsPageInfoContext.Provider>
        </PostsContext.Provider>
        <Route path="/posts/create" exact={true} component={CreatePost}/>
        <Route path="/posts/:id" exact={true} component={DetailPost}/>
        <Route path="/posts/:id/edit" exact={true} component={UpdatePost}/>
        <Route path="/about" exact={true} component={About}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
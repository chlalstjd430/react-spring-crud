import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useTitle from '../../hooks/useTitle';
import styles from "./Posts.module.scss";
import Post from '../../components/Post/Post';
import PostButton from '../../components/button/PostButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navigation from '../../components/Navigation/Navigation';
import { PostsContext } from '../../context/PostsContext';
import { PostsPageInfoContext } from '../../context/PostsPageInfoContext';

const Posts = ({ location }) => {
  const query = queryString.parse(location.search);
  const {posts, setPosts} = useContext(PostsContext);
  const {postsPageInfo, setPostsPageInfo} = useContext(PostsPageInfoContext);
  console.log(query);

  const initState = () => {
    setPosts([]);
    setPostsPageInfo({last: false, currentPage: 0, nextPage: 0, total: 0 });
  }
  
  const url = 'https://angelhack-anywhere-library.herokuapp.com/v1/api/posts' + (location.search === '' ? '?' : location.search + '&')
  const getPosts = async() => {
    await axios.get(`${url}currentPage=${postsPageInfo.nextPage}`)
      .then((response) => {
        const data = response.data;
        const postsData = response.data.content;
        const mergeData = posts.concat(...postsData);
        setPosts(mergeData);
        setPostsPageInfo({last: data.last, currentPage: data.pageable.pageNumber, nextPage: data.pageable.pageNumber + 1, total: data.totalElements});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    initState();
    getPosts();
  }, [location.search])
  
  useTitle('HOME');

  return (
    <>
    <Navigation/>
      <div className={styles.home}>
      <div className={styles.home__header}>
        <h1>게시글 목록</h1>
        {
          (function() {
            if (query.keyword !== undefined) return (<h3>"{query.keyword}" 검색 결과</h3>);
          })()
        }
      </div>
      <div className={styles.posts}>
        <div className={styles.posts__header}>
          <div className={styles.posts__header__column}>
            <h2>전체 게시글 수 {postsPageInfo.total}</h2>
            {
              (function() {
                if (query.keyword !== undefined) 
                return (
                  <>
                    <h2> &nbsp; |  &nbsp; </h2>
                    
                    <Link to="/posts" onClick={initState}>
                      <h2> 전체검색</h2>
                    </Link>
                  </>
                );
              })()
            }
          </div>
          <div className={styles.posts__header__column}>
            <Link to="/posts/create">
              <PostButton content="글작성">
              </PostButton>
            </Link>
          </div>
        </div>
        <div className={styles.post__container}>
            <InfiniteScroll
              dataLength={posts.length}
              next={getPosts}
              hasMore={!postsPageInfo.last}
              loader={
                <p style={{ textAlign: 'center' }}>
                  <b>laoding...</b>
                </p>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>마지막 게시글입니다.</b>
                </p>
              }
            >
            {[...posts].map(post => (
              <Post 
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdDate={post.createdDate}
              />
            ))}
            </InfiniteScroll>
          </div>
      </div>
    </div>
    </>
  )
}


export default Posts;
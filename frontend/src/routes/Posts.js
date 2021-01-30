import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useTitle from '../hooks/useTitle';
import styles from "./Posts.module.scss";
import Post from '../components/Post/Post';
import PostButton from '../components/button/PostButton';


const Posts = ({ location }) => {
  const query = queryString.parse(location.search);
  console.log(query);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({last: false, currentPage: 0, nextPage: 0, total: 0, });
  
  const url = '/v1/api/posts' + (location.search === '' ? '?' : location.search + '&')
  const getPosts = async() => {
    await axios.get(`${url}currentPage=${pageInfo.nextPage}`)
      .then((response) => {
        console.log("api 실행...")
        const data = response.data;
        const postsData = response.data.content;
        const mergeData = posts.concat(...postsData);
        setPosts(mergeData);
        setPageInfo({last: data.last, currentPage: data.pageable.pageNumber, nextPage: data.pageable.pageNumber + 1, total: data.totalElements});
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getPosts();
    console.log("userEffect!!");
  }, [])

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && !pageInfo.last) {
      getPosts();
    }
  };


  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useTitle('HOME');

  return (
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
            <h2>전체 게시글 수 {pageInfo.total}</h2>
            {
              (function() {
                if (query.keyword !== undefined) 
                return (
                  <>
                    <h2> &nbsp; |  &nbsp; </h2>
                    <Link to="/posts">
                      <h2> 전체검색</h2>
                    </Link>
                  </>
                );
              })()
            }
          </div>
          <div className={styles.posts__header__column}>
            <Link to="/create-post">
              <PostButton content="글작성">
              </PostButton>
            </Link>
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.post__container}>
            {posts.map(post => (
              <Post 
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdDate={post.createdDate}
              />
            ))}
          </div>
        ) 
        }
      </div>
    </div>
    
  )
}


export default Posts;
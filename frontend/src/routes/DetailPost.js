import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import styles from "./Posts.module.scss";
import Post from '../components/Post/Post';
import PostButton from '../components/button/PostButton';


const DetailPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({last: false, currentPage: 0, nextPage: 0, total: 0, });
  
  const getPosts = async() => {
    await axios.get(`/v1/api/posts?currentPage=${pageInfo.nextPage}`)
      .then((response) => {
        const data = response.data;
        const postsData = response.data.content;
        const mergeData = posts.concat(...postsData);
        setPosts(mergeData);
        setPageInfo({last: data.last, currentPage: data.pageable.pageNumber, nextPage: data.pageable.pageNumber + 1, total: data.totalElements});
        setIsLoading(false);
        console.log(pageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getPosts();
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
      </div>
      <div className={styles.posts}>
        <div className={styles.posts__header}>
          <div className={styles.posts__header__column}>
            <h2>전체 게시글 수 {pageInfo.total}</h2>
            {}
          </div>
          <div className={styles.posts__header__column}>
            <Link to="/create-post">
              <PostButton content="글쓰기">
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


export default DetailPost;
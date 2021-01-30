import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTitle from '../hooks/useTitle';
import styles from "./DetailPost.module.scss";
import { Link } from 'react-router-dom';
import useConfirm from '../hooks/useConfirm';


const DetailPost = ({ match }) => {
  const postId = match.params.id;
  const [post, setPost] = useState([]);

  const deletePost = useConfirm(
    "삭제하시겠습니까?",  
    async() => {
      await axios.delete(`/v1/api/posts/${postId}`)
      .then((response) => {
        alert("삭제가 완료되었습니다.");
        document.location.href='/posts';
      })
      .catch((error) => {
        console.log(error);
      });
    },
    () => alert("삭제가 취소되었습니다.")
    );

  
  const getPost = async() => {
    await axios.get(`/v1/api/posts/${postId}`)
      .then((response) => {
        const data = response.data;

        setPost(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getPost();
  }, [])

  useTitle('Post');

  return (
    <div className={styles.post__detail}>
      <div className={styles.post__detail__container}>
        <div className={styles.post__title}>
          <h1>{post.title}</h1>
        </div>
        <div className={styles.post__info}>
          <div className={styles.post__info__column}>
            <h3>{post.createdDate}</h3>
          </div>
          <div className={styles.post__info__column}>
            <Link to="">
              <h3>수정</h3>
            </Link>

            <Link onClick={deletePost}>
              <h3>삭제</h3>
            </Link>
            
          </div>
        </div>
        <div className={styles.post__content}>
          {post.content}
        </div>
      </div>
    </div>
    
  )
}


export default DetailPost;
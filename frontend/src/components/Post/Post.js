import React from "react";
import { Link } from "react-router-dom";
import styles from "./Post.module.scss";

function Post({id, title, content, createdDate}) {
  return (
    <Link to={{
      pathname: `posts/${id}`,
      state: {
        id,
        title,
        content,
        createdDate
      }
    }}>
      <div className={styles.post}>
        <div className={styles.post__id}>
            {id}
        </div>
        <div className={styles.post__title}>
          {title}
        </div>
        <div className={styles.post__date}>
          {createdDate.split('T')}
        </div>
      </div>
    </Link>
    
  )
}

export default Post;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTitle from '../../hooks/useTitle';
import styles from "./CreatePost.module.scss";
import useConfirm from '../../hooks/useConfirm';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import PostButton from '../../components/button/PostButton';

const UpdatePost = ({match}) => {
  const postId = match.params.id;
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [editorRef] = useState(React.createRef());
  const [isLoading, setIsLoading] = useState(true);

  const getPost = async() => {
    await axios.get(`/v1/api/posts/${postId}`)
      .then((response) => {
        const data = response.data;
  
        setTitle(data.title);
        setContent(data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getPost();
  }, [])

  const updatePost = async() => {
    await axios.put(`https://angelhack-anywhere-library.herokuapp.com/v1/api/posts/${postId}`, {
      title: title,
      content: editorRef.current.getInstance().getHtml()
    })
    .then((response) => {
      document.location.href=`/posts/${postId}`;
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const cancleClick = useConfirm("작성중인 글은 저장되지않습니다.\n정말 나가시겠습니까?", () => document.location.href='/posts');
  const titleChange = (e) => {
    setTitle(e.target.value);
  }

  useTitle('Create Post');

  return (
    <div className={styles.post__create}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (   
        <div className={styles.post__create__container}>
          <div className={styles.post__create__title}>
            <input onChange={titleChange} id="post__title" type="text" placeholder="제목을 입력하세요" value={title}/>  
          </div>
          <div className={styles.post__create__content}>
            <Editor
              previewStyle="vertical"
              height="600px"
              initialEditType="wysiwyg"
              placeholder="글을 작성해주세요"
              initialValue={content}
              ref={editorRef}
            />
          </div>
          <div className={styles.post__create__bottom}>
            <PostButton onClick={updatePost} content="수정하기"/>
            <PostButton
              onClick={cancleClick}
              content="취소하기" 
              color="black" 
              backgroundColor="white" 
              borderColor="rgba(0, 0, 0, 0.2)"
            />
            
          </div>
        
        </div>
      )}
      
    </div>
    
  )
}


export default UpdatePost;
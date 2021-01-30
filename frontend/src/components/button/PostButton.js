import React from "react";
import styled from "styled-components";


function PostButton({content, backgroundColor, color, width, height}) {
  const PostBtn = styled.button `
    width: ${width === undefined ? '126' : width}px;
    height: ${width === undefined ? '48' : height}px;
    border-radius: 4px;
    background-color: ${backgroundColor === undefined ? '#BAA2FF' : backgroundColor};
    font-size: 20px;
    color: ${color === undefined ? 'white' : color};
    border: none;
  `

  return (
    <PostBtn>
      {content}
    </PostBtn>
  )
}

export default PostButton;
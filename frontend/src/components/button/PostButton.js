import React from "react";
import styled from "styled-components";

const TestButton = styled.button `
  width: ${props => props.width ?? '126'}px;
  height: ${props => props.height ?? '48'}px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor ?? '#BAA2FF'};
  font-size: 20px;
  color: ${props => props.color ?? 'white'};
  border: none;
`

function PostButton({content, backgroundColor, color, width, height}) {

  return (
    <TestButton>
      {content}
    </TestButton>
  )
}

export default PostButton;
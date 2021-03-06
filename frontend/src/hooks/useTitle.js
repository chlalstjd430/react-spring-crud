import { useState, useEffect } from 'react';

const useTitle = (initialTitle = "CRUD TEST") => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = `${title}:Spring&React`;
  };
  useEffect(updateTitle, [title]);

  return setTitle;
};

export default useTitle;
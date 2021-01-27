import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTitle from '../hooks/useTitle';


const Home = () => {
  useTitle('HOME');

  return (
    <div>
      Home...
    </div>
  )
}


export default Home;
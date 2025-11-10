import React from 'react';
import { Spinner } from '../ui/spinner';

const Loader = () => {
  return (
    <div>
      <Spinner></Spinner>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loader;
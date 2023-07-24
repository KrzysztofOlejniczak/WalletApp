import React from 'react';
import { Circles } from 'react-loader-spinner';
import css from './loader.module.css';

const Loader = () => {
  return (
    <Circles
      height="25vh"
      width="25vw"
      color="blue"
      ariaLabel="circles-loading"
      wrapperClass={css.spinner}
      visible={true}
      animationDuration="0.99"
    />
  );
};

export default Loader;
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './loader.module.css';

const Loader = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.spinner}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#00AD84"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;

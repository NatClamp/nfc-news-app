import React from 'react';
import './Errors.css';

const Errors = props => {
  const { goHome } = props;
  return (
    <main className='content-well'>
      <h1 className='title title--404'>404</h1>
      <h2 className='subTitle--404'>Something went wrong!</h2>
      <p className='description description--404'>
        The rigging is all tangled and there's sharks circling. <br />
        Best head back home, sailor!
      </p>
      <button onClick={goHome} className='button button--404'>
        Go Home
      </button>
    </main>
  );
};

export default Errors;

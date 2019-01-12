import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ toggleNav, goHome }) => {
  return (
    <div className='header'>
      <section className='header__content'>
        <button onClick={goHome} className='button'>
          Home
        </button>
        <h1>NFC news</h1>
        <button className='button__hamburger' onClick={toggleNav}>
          <FontAwesomeIcon icon='bars' />
        </button>
      </section>
    </div>
  );
};

export default Header;

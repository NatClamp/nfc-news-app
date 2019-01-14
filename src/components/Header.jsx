import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ toggleNav, goHome, navOpen }) => {
  return (
    <div className='header'>
      <section className='header__content'>
        <button className='button__hamburger' onClick={toggleNav}>
          {!navOpen ? (
            <FontAwesomeIcon icon='bars' />
          ) : (
            <FontAwesomeIcon
              className='button__hamburger--close'
              icon='times'
            />
          )}
        </button>
        <button
          onClick={goHome}
          className='invisibleButton invisibleButton--header'
        >
          <h1>NFC news</h1>
        </button>
      </section>
    </div>
  );
};

export default Header;

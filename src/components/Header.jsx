import React from 'react';
import './Header.css';
import { Link } from '@reach/router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

library.add(faBars);

const Header = ({ toggleNav }) => {
  return (
    <div className='header'>
      <p>
        <Link to='/'>Home</Link>
      </p>
      <h1>NFC news</h1>
      <button className='button button__hamburger' onClick={toggleNav}>
        <FontAwesomeIcon icon='bars' />
      </button>
    </div>
  );
};

export default Header;

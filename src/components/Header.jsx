import React from 'react';
import './Header.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

library.add(faBars);

const Header = ({ toggleNav }) => {
  return (
    <div className='header blackborder'>
      <h1>Header Component</h1>
      <button onClick={toggleNav}>
        <FontAwesomeIcon icon='bars' />
      </button>
    </div>
  );
};

export default Header;

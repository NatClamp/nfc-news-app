import React, { Component } from 'react';
import './Nav.css';
// import * as api from '../api';
import { Link, navigate } from '@reach/router';
import Topic from './Topics';

class Nav extends Component {
  render() {
    const { navOpen, logout, topics } = this.props;
    return (
      <>
        <div className={navOpen ? 'nav nav--open' : 'nav'}>
          <h2>Topics</h2>
          <Topic topics={topics} />
          <button onClick={this.navPostTopic} className='button'>
            Create Topic
          </button>
          <button onClick={this.navPostArticle} className='button'>
            Create Article
          </button>
          <div>
            <h2>Users</h2>
            <Link to='/users'>Users</Link>
          </div>
          <button onClick={logout} className='button'>
            logout
          </button>
        </div>
      </>
    );
  }

  navPostTopic = () => {
    navigate('/post-topic');
  };

  navPostArticle = () => {
    navigate('/post-article');
  };
}

export default Nav;

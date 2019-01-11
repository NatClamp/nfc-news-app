import React, { Component } from 'react';
import './Nav.css';
import { Link, navigate } from '@reach/router';
import Topic from './Topics';

class Nav extends Component {
  render() {
    const { navOpen, logout, topics } = this.props;
    return (
      <>
        <div className={navOpen ? 'nav nav--open' : 'nav'}>
          <section className='navButtons'>
            <button onClick={logout} className='button'>
              logout
            </button>
            <div>
              <Link className='navLink' to='/users'>
                Users
              </Link>
            </div>
          </section>
          <h2>Topics</h2>
          <Topic topics={topics} />
          <section className='navButtons'>
            <button onClick={this.navPostTopic} className='button'>
              Create Topic
            </button>
            <button onClick={this.navPostArticle} className='button'>
              Create Article
            </button>
          </section>
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

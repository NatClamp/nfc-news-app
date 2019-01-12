import React, { Component } from 'react';
import './Nav.css';
import { Link, navigate } from '@reach/router';
import Topic from './Topics';

class Nav extends Component {
  render() {
    const { navOpen, logout, topics, user } = this.props;
    return (
      <>
        <div className={navOpen ? 'nav nav--open' : 'nav'}>
          <section className='userDetails'>
            <img
              src={user.avatar_url}
              alt='user_avatar'
              className='userDetails__avatar'
            />
            <p className='userDetails__username'>
              <Link to={`/user/${user.username}`}>{user.username}</Link>
            </p>
          </section>
          <section className='navButtonsContainer'>
            <button onClick={logout} className='button button--nav--danger'>
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
          <section className='navButtonsContainer'>
            <button onClick={this.navPostTopic} className='button button--nav'>
              Create Topic
            </button>
            <button
              onClick={this.navPostArticle}
              className='button button--nav'
            >
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

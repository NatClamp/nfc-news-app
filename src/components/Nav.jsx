import React, { Component } from 'react';
import './Nav.css';
import { Link, navigate } from '@reach/router';
import Topic from './Topics';

class Nav extends Component {
  render() {
    const { navOpen, logout, topics, user } = this.props;
    return (
      <>
        <main className={navOpen ? 'nav nav--open' : 'nav'}>
          <section className='userDetails'>
            <img
              src={user.avatar_url}
              alt='user_avatar'
              className='userDetails__avatar'
            />
            <p className='userDetails__username'>
              <Link to={`/user/${user.username}`} className='navLink'>
                {user.username}
              </Link>
            </p>
          </section>
          <section className='topicsList'>
            <h2 className='title--nav'>Topics</h2>
            <Topic topics={topics} />
          </section>
          <section className='navButtonsContainer'>
            <h2 className='title--nav'>Create</h2>
            <button onClick={this.navPostTopic} className='button'>
              Create Topic
            </button>
            <button onClick={this.navPostArticle} className='button'>
              Create Article
            </button>
            <h2 className='title--nav'>Other</h2>
            <button onClick={logout} className='button button--nav--danger'>
              logout
            </button>
          </section>

          <section className='navButtonsContainer' />
        </main>
      </>
    );
  }

  navPostTopic = () => {
    navigate('/post-topic');
  };

  navPostArticle = () => {
    navigate('/post-article');
  };

  navToUsers = () => {
    navigate('/users');
  };
}

export default Nav;

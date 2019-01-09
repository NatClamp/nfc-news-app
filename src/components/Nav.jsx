import React, { Component } from 'react';
import './Nav.css';
import * as api from '../api';
import { Link } from '@reach/router';

class Nav extends Component {
  state = {
    topics: [],
  };
  render() {
    const { topics } = this.state;
    const { navOpen, logout } = this.props;
    return (
      <>
        <div className={navOpen ? 'nav nav--open' : 'nav'}>
          <h2>Topics</h2>
          {topics.map(topic => {
            return (
              <p key={topic.slug}>
                <Link to={`/${topic.slug}`}>{topic.slug}</Link>
              </p>
            );
          })}
          <div>
            <h2>Users</h2>
            <Link to='/users'>Users</Link>
          </div>
          <button onClick={logout} className='button button--logout'>
            logout
          </button>
        </div>
      </>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api.getTopics().then(topics =>
      this.setState({
        topics,
      }),
    );
  };
}

export default Nav;

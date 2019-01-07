import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';

class Nav extends Component {
  state = {
    topics: [],
  };
  render() {
    const { topics } = this.state;
    return (
      <>
        <div className='nav blackborder'>
          <h2>Topics</h2>
          {topics.map(topic => {
            return (
              <p>
                <Link to={`/${topic.slug}`}>{topic.slug}</Link>
              </p>
            );
          })}
        </div>
      </>
    );
  }
}

export default Nav;

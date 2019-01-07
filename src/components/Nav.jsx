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
    const { navOpen } = this.props;
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

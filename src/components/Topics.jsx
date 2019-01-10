import React, { Component } from 'react';
import { Link } from '@reach/router';

class Topics extends Component {
  render() {
    const { topics } = this.props;
    return (
      <div>
        {topics.map(topic => {
          return (
            <p key={topic.slug}>
              <Link to={`/${topic.slug}`}>{topic.slug}</Link>
            </p>
          );
        })}
      </div>
    );
  }
}

export default Topics;
import React from 'react';
import { Link } from '@reach/router';

const Topics = ({ topics }) => {
  return (
    <ul className='topicList'>
      {topics.map(topic => {
        return (
          <li key={topic.slug} className='topicSlug'>
            <Link className='navLink' to={`/${topic.slug}`}>
              {topic.slug}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Topics;

import React from 'react';
import { Link } from '@reach/router';

const Topics = ({ topics }) => {
  return (
    <div className='topicList'>
      {topics.map(topic => {
        return (
          <p key={topic.slug} className='topicSlug'>
            <Link className='navLink' to={`/${topic.slug}`}>
              {topic.slug}
            </Link>
          </p>
        );
      })}
    </div>
  );
};

export default Topics;

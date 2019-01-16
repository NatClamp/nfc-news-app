import React from 'react';
import { Link } from '@reach/router';
import './Cards.css';
import moment from 'moment';

const Cards = props => {
  const { articles } = props;
  return articles.map(article => {
    return (
      <article key={article.article_id} className='card'>
        <Link to={`/articles/${article.article_id}`}>
          <p className='card__title'>{article.title}</p>
        </Link>
        <p className='card__authortopicdate'>
          Posted in{' '}
          <span className='card__topic'>
            <Link to={`/${article.topic}`}>{article.topic}</Link>
          </span>{' '}
          by <Link to={`/user/${article.author}`}>{article.author}</Link> |{' '}
          {moment(article.created_at).fromNow()}
        </p>
      </article>
    );
  });
};

export default Cards;

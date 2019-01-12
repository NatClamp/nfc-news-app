import React from 'react';
import { Link } from '@reach/router';
import './Cards.css';
import moment from 'moment';

const Cards = props => {
  const { articles, users } = props;
  return articles ? (
    <>
      {articles.map(article => {
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
      })}
    </>
  ) : (
    <>
      <main className='cardList'>
        {users.map(user => {
          return (
            <article key={user.user_id} className='card--userCard'>
              <img
                src={user.avatar_url}
                alt='user_profile_image'
                className='userCard__pic'
              />
              <br />
              <p className='userCard__username'>{user.username}</p>
            </article>
          );
        })}
      </main>
    </>
  );
};

export default Cards;

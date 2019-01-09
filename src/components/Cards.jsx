import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Articles.css';
import './Cards.css';
import moment from 'moment';

class Cards extends Component {
  render() {
    const { articles, users } = this.props;
    return articles ? (
      <>
        {articles.map(article => {
          return (
            <article key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
                <br />
                {article.author}
                <br />
                {moment(article.created_at).format(
                  'dddd, MMMM Do YYYY, h:mm a',
                )}
              </Link>
            </article>
          );
        })}
      </>
    ) : (
      <>
        {users.map(user => {
          return (
            <article key={user.user_id}>
              <img src={user.avatar_url} alt='user_profile_image' />
              <br />
              {user.name}
              <br />
              {user.username}
            </article>
          );
        })}
      </>
    );
  }
}

export default Cards;

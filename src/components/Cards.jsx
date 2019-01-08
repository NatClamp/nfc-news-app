import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Articles.css';
import './Cards.css';
import moment from 'moment';

class Cards extends Component {
  render() {
    const { articles } = this.props;
    return (
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
    );
  }
}

export default Cards;

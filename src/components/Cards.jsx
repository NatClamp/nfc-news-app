import React, { Component } from 'react';
import './Articles.css';
import './Cards.css';

class Cards extends Component {
  render() {
    const { articles } = this.props;
    return (
      <div>
        {articles.map(article => {
          return (
            <article key={article.article_id}>
              {article.title}
              <br />
              {article.author}
            </article>
          );
        })}
      </div>
    );
  }
}

export default Cards;

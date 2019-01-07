import React, { Component } from 'react';
import './Articles.css';
import * as api from '../api';
import './Cards.css';

class Cards extends Component {
  render() {
    const { articles } = this.props;
    return (
      <div>
        {articles.map(article => {
          return (
            <article>
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

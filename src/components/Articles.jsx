import React, { Component } from 'react';
import './Articles.css';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: [],
  };
  render() {
    const { articles } = this.state;
    return (
      <main className='blackborder'>
        <h1>Articles Component</h1>
        {articles.map(article => {
          return <p>{article.title}</p>;
        })}
      </main>
    );
  }

  componentDidMount() {
    this.fetchArticles(this.props.topic);
  }

  fetchArticles = topic => {
    api.getArticles(topic).then(articles => {
      this.setState({
        articles,
      });
    });
  };

  componentDidUpdate() {
    this.fetchArticles(this.props.topic);
  }
}

export default Articles;

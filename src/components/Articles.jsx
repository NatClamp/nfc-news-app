import React, { Component } from 'react';
import './Articles.css';
import * as api from '../api';
import Cards from './Cards';

class Articles extends Component {
  state = {
    articles: [],
  };
  render() {
    return (
      <main className='blackborder'>
        <h1>Articles Component</h1>
        <Cards articles={this.state.articles} />
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic !== prevProps.topic) {
      this.fetchArticles(this.props.topic);
    }
  }
}

export default Articles;

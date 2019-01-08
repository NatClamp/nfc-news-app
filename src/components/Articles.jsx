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
      <section className='content-well'>
        <Cards articles={this.state.articles} />
      </section>
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

import React, { Component } from 'react';
import './Articles.css';
import * as api from '../api';
import Cards from './Cards';

class Articles extends Component {
  state = {
    articles: [],
    currentPage: 1,
    lastPage: false,
  };
  render() {
    const { articles, lastPage } = this.state;
    return (
      <section className='content-well'>
        <Cards articles={articles} />
        <button onClick={this.handlePage} disabled={lastPage === true}>
          Next Page
        </button>
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticles(this.props.topic);
  }

  fetchArticles = topic => {
    const apiCall =
      this.state.currentPage !== 1
        ? api.getArticles(this.state.currentPage, topic)
        : api.getArticles(null, topic);
    apiCall.then(articles => {
      articles = !Array.isArray(articles) ? [articles] : articles;
      if (articles.length < 10) this.setState({ lastPage: true });
      this.setState({
        articles,
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic !== prevProps.topic) {
      this.setState({ currentPage: 1 }, () => {
        this.fetchArticles(this.props.topic);
      });
    }
  }

  handlePage = () => {
    this.setState(prevState => {
      prevState.currentPage++;
      this.fetchArticles(this.props.topic);
    });
  };
}

export default Articles;

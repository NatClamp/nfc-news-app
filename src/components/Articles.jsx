import React, { Component } from 'react';
import './Articles.css';
import * as api from '../api';
import Cards from './Cards';

class Articles extends Component {
  state = {
    articles: [],
    currentPage: 1,
    lastPage: false,
    err: null,
  };
  render() {
    const { articles, lastPage, currentPage, err } = this.state;
    return err ? (
      <section className='content-well'>
        <h2>There are no articles here, why not create one?</h2>
      </section>
    ) : (
      <section className='content-well'>
        <Cards articles={articles} />
        <button onClick={this.handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={this.handleNextPage} disabled={lastPage === true}>
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
    apiCall
      .then(articles => {
        articles = !Array.isArray(articles) ? [articles] : articles;
        articles.length < 10
          ? this.setState({ lastPage: true })
          : this.setState({ lastPage: false });
        this.setState({
          articles,
        });
      })
      .catch(err => this.setState({ err: err }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic !== prevProps.topic) {
      this.setState({ currentPage: 1, err: null }, () => {
        this.fetchArticles(this.props.topic);
      });
    }
  }

  handleNextPage = () => {
    this.setState(
      prevState => {
        prevState.currentPage++;
      },
      () => {
        this.fetchArticles(this.props.topic);
      },
    );
  };

  handlePrevPage = () => {
    this.setState(prevState => {
      prevState.currentPage--;
      this.fetchArticles(this.props.topic);
    });
  };
}

export default Articles;

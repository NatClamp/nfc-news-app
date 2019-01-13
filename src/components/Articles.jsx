import React, { Component } from 'react';
import './Articles.css';
import * as api from '../api';
import Cards from './Cards';

class Articles extends Component {
  state = {
    articles: [],
    currentPage: 1,
    lastPage: false,
    isLoading: true,
    err: null,
  };
  render() {
    const { articles, lastPage, currentPage, err, isLoading } = this.state;
    return isLoading ? (
      <section className='content-well'>
        <p>Loading...</p>
      </section>
    ) : err ? (
      <section className='content-well'>
        <h1 className='title title--404'>Oh no!</h1>
        <h2 className='description description--noarticles'>
          There aren't any articles in this topic yet. <br />
          Fancy writing the first?
        </h2>
        <button className='button' onClick={this.handleNavToPost}>
          Post article
        </button>
      </section>
    ) : (
      <section className='content-well'>
        <Cards articles={articles} />
        <section className='pageNav'>
          <button
            className={
              currentPage === 1
                ? 'button button--pagination button--disabled'
                : 'button button--pagination'
            }
            onClick={this.handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            className={
              lastPage === true
                ? 'button button--pagination button--disabled'
                : 'button button--pagination'
            }
            onClick={this.handleNextPage}
            disabled={lastPage === true}
          >
            Next Page
          </button>
        </section>
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
          isLoading: false,
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

  handleNavToPost = () => {
    this.setState({ err: null }, () => {
      this.props.navigate('/post-article');
    });
  };
}

export default Articles;

import React, { Component } from 'react';
import './Article.css';
import moment from 'moment';
import * as api from '../api';

class Article extends Component {
  state = {
    articleData: {},
  };
  render() {
    const { articleData } = this.state;
    return (
      <section className='content-well'>
        <section className='content-well__singleArticle'>
          <h1>{articleData.title}</h1>
          <h3>
            {articleData.author} |{' '}
            {moment(articleData.created_at).format(
              'dddd, MMMM Do YYYY, h:mm a',
            )}
          </h3>
          <h4>Votes: {articleData.votes}</h4>
          <p>{articleData.body}</p>
        </section>
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticleData(this.props.article_id);
  }

  fetchArticleData = article_id => {
    api.getArticle(article_id).then(articleData => {
      this.setState({
        articleData,
      });
    });
  };
}

export default Article;

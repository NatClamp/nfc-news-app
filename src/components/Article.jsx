import React, { Component } from 'react';
import './Article.css';
import moment from 'moment';
import * as api from '../api';
import Voting from './Voting';
import Comments from './Comments';
import { navigate } from '@reach/router';
import Loading from './Loading';

class Article extends Component {
  state = {
    articleData: {},
    commentData: [],
    isLoading: true,
    lastCommentPage: false,
  };
  render() {
    const { articleData, commentData, isLoading, lastCommentPage } = this.state;
    const { user } = this.props;
    return isLoading ? (
      <section className='content-well'>
        <Loading />
      </section>
    ) : (
      <section className='content-well content-well--singleArticle'>
        <section className='content-well__singleArticle__header'>
          <section className='content-well__singleArticle__header__left'>
            <Voting
              votes={parseInt(articleData.votes)}
              id={articleData.article_id}
              type={'article'}
            />
          </section>
          <section className='content-well__singleArticle__header__right'>
            <h1 className='title'>{articleData.title}</h1>
            <section className='subTitle details'>
              {articleData.author} | {moment(articleData.created_at).fromNow()}{' '}
              | {articleData.topic} |
              {user.username === articleData.author && (
                <button
                  className='button button--delete'
                  onClick={() => this.handleDelete(this.props.article_id)}
                >
                  Delete
                </button>
              )}
            </section>
          </section>
        </section>
        <section className='bodyTextContainer'>
          <p className='bodyText'>{articleData.body}</p>
        </section>
        <Comments
          commentData={commentData}
          user_id={user.user_id}
          username={user.username}
          articleData={articleData}
          fetchComments={this.fetchCommentData}
          lastCommentPage={lastCommentPage}
        />
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticleData(this.props.article_id);
  }

  fetchArticleData = article_id => {
    api
      .getArticle(article_id)
      .then(articleData => {
        this.setState(
          {
            articleData,
            isLoading: false,
          },
          () => this.fetchCommentData(this.props.article_id),
        );
      })
      .catch(err => navigate('/404', { replace: true }));
  };

  fetchCommentData = (article_id, page) => {
    const { articleData } = this.state;
    const { comment_count } = articleData;
    api.getComments(article_id, page).then(commentData => {
      if (comment_count / 10 <= page) {
        this.setState({ commentData, lastCommentPage: true });
      } else {
        this.setState({ commentData, lastCommentPage: false });
      }
    });
  };

  handleDelete = article_id => {
    api
      .deleteArticle(article_id)
      .then(data => {
        navigate('/');
      })
      .catch(err => this.props.navigate('/404', { replace: true }));
  };
}

export default Article;

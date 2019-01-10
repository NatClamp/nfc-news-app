import React, { Component } from 'react';
import './Article.css';
import moment from 'moment';
import * as api from '../api';
import Voting from './Voting';
import Comments from './Comments';

class Article extends Component {
  state = {
    articleData: {},
    commentData: [],
  };
  render() {
    const { articleData, commentData } = this.state;
    const { user } = this.props;
    return (
      <section className='content-well'>
        <section className='content-well__singleArticle'>
          {/* article section */}
          <h1>{articleData.title}</h1>
          <h3>
            {articleData.author} |{' '}
            {moment(articleData.created_at).format(
              'dddd, MMMM Do YYYY, h:mm a',
            )}
          </h3>
          {/* voting */}
          <section className='articleElement'>
            <Voting articleData={articleData} />
          </section>
          {/* article body */}
          <p>{articleData.body}</p>
          {/* comments section */}
          <section className=''>
            <Comments
              commentData={commentData}
              user_id={user.user_id}
              articleData={articleData}
            />
          </section>
        </section>
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticleData(this.props.article_id);
    this.fetchCommentData(this.props.article_id);
  }

  fetchArticleData = article_id => {
    api.getArticle(article_id).then(articleData => {
      this.setState({
        articleData,
      });
    });
  };

  fetchCommentData = article_id => {
    api
      .getComments(article_id)
      .then(commentData => {
        this.setState({ commentData });
      })
      .catch(err => console.log(err));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.fetchCommentData(this.props.article_id);
    }
  }
}

export default Article;

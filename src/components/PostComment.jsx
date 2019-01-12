import React, { Component } from 'react';
import * as api from '../api';
import './PostComment.css';

class PostComment extends Component {
  state = {
    body: '',
  };
  render() {
    const { body } = this.state;
    return (
      <section className='postCommentContainer'>
        <form onSubmit={this.handleSubmit} className='postCommentForm'>
          {/* <label htmlFor='body'>Comment:</label> */}
          <textarea
            type='text'
            id='body'
            value={body}
            onChange={this.handleChange}
            placeholder='COMMENT'
            className='postCommentForm__textarea'
            required
          />
          <button type='submit' className='button button--submit'>
            post
          </button>
        </form>
      </section>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState(() => ({
      [id]: value,
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { body } = this.state;
    const { user_id, articleData, fetchComments } = this.props;
    const article_id = articleData.article_id;
    api.postComment(article_id, { user_id, body }).then(comment => {
      this.setState({ body: '' }, () => {
        fetchComments(article_id);
      });
    });
  };
}

export default PostComment;

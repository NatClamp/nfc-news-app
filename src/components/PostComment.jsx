import React, { Component } from 'react';
import * as api from '../api';
// import { navigate } from '@reach/router';

class PostComment extends Component {
  state = {
    commentBody: '',
  };
  render() {
    const { commentBody } = this.state;
    return (
      <section>
        <h1>Post a comment</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='body'>Comment:</label>
          <input
            type='text'
            id='body'
            value={commentBody}
            onChange={this.handleChange}
            required
          />
          <button type='submit'>Comment</button>
        </form>
      </section>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    // const body = event.target.body.value;
    const body = this.state.commentBody;
    const user_id = this.props.user_id;
    const article_id = this.props.articleData.article_id;
    api.postComment(article_id, { user_id, body }).then(comment => {
      //   navigate(`/articles/${article_id}`);
      this.setState(() => ({ commentBody: '' }));
    });
  };

  handleChange = event => {
    // console.log(event.target.value);
    const newVal = event.target.value;
    this.setState(() => ({ commentBody: newVal }));
  };
}

export default PostComment;

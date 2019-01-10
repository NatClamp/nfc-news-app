import React, { Component } from 'react';
import moment from 'moment';
import './Comments.css';
import PostComment from './PostComment';

class Comments extends Component {
  render() {
    const { commentData, user_id, articleData } = this.props;
    return (
      <>
        <h1>Comments</h1>
        <PostComment user_id={user_id} articleData={articleData} />
        {commentData.map(comment => (
          <article key={comment.comment_id} className='comment'>
            <section className='comment__header'>
              {comment.author} |{' '}
              {moment(comment.created_at).format('dddd, MMMM Do YYYY, h:mm a')}{' '}
              | votes: {comment.votes}
            </section>
            <br />
            <section className='comment__body'>{comment.body}</section>
          </article>
        ))}
      </>
    );
  }
}

export default Comments;

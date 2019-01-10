import React, { Component } from 'react';
import moment from 'moment';
import './Comments.css';
import PostComment from './PostComment';
import Voting from './Voting';

class Comments extends Component {
  render() {
    const { commentData, user_id, articleData, fetchComments } = this.props;
    return (
      <>
        <h1>Comments</h1>
        <PostComment
          user_id={user_id}
          articleData={articleData}
          fetchComments={fetchComments}
        />
        {commentData.map(comment => (
          <article key={comment.comment_id} className='comment'>
            <section className='comment__header'>
              {comment.author} |{' '}
              {moment(comment.created_at).format('dddd, MMMM Do YYYY, h:mm a')}{' '}
              | votes: {comment.votes}
            </section>
            <br />
            <section className='comment__body'>{comment.body}</section>
            <Voting
              votes={comment.votes}
              id={articleData.article_id}
              commentId={comment.comment_id}
              type={'comment'}
            />
          </article>
        ))}
      </>
    );
  }
}

export default Comments;

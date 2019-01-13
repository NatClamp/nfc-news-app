import React, { Component } from 'react';
import moment from 'moment';
import './Comments.css';
import PostComment from './PostComment';
import Voting from './Voting';
import * as api from '../api';

class Comments extends Component {
  render() {
    let {
      commentData,
      user_id,
      username,
      articleData,
      fetchComments,
    } = this.props;
    commentData = !Array.isArray(commentData) ? [commentData] : commentData;
    return (
      <>
        <h1 className='title title--comments'>Comments</h1>
        <PostComment
          user_id={user_id}
          articleData={articleData}
          fetchComments={fetchComments}
        />
        {commentData.length > 0 &&
          commentData.map(comment => (
            <article key={comment.comment_id} className='comment'>
              <section className='comment__header'>
                {comment.author} | {moment(comment.created_at).fromNow()} |
                {username === comment.author && (
                  <button
                    className='button button--delete'
                    onClick={() => this.handleDelete(comment.comment_id)}
                  >
                    Delete
                  </button>
                )}
                <Voting
                  votes={parseInt(comment.votes)}
                  id={articleData.article_id}
                  commentId={comment.comment_id}
                  type={'comment'}
                />
              </section>
              <section className='comment__body'>{comment.body}</section>
            </article>
          ))}
      </>
    );
  }

  handleDelete = comment_id => {
    const { articleData, fetchComments } = this.props;
    api.deleteComment(articleData.article_id, comment_id).then(() => {
      fetchComments(articleData.article_id);
    });
  };
}

export default Comments;

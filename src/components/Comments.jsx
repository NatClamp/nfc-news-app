import React, { Component } from 'react';
import moment from 'moment';
import './Comments.css';
import PostComment from './PostComment';
import Voting from './Voting';
import * as api from '../api';

class Comments extends Component {
  state = {
    currentPage: 1,
  };
  render() {
    const { currentPage } = this.state;
    let {
      commentData,
      user_id,
      username,
      articleData,
      fetchComments,
      lastCommentPage,
    } = this.props;
    const { comment_count } = articleData;
    commentData = !Array.isArray(commentData) ? [commentData] : commentData;
    return (
      <>
        <section className='commentsContainer'>
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

          {
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
                  lastCommentPage === true || parseInt(comment_count) <= 10
                    ? 'button button--pagination button--disabled'
                    : 'button button--pagination'
                }
                onClick={this.handleNextPage}
                disabled={
                  lastCommentPage === true || parseInt(comment_count) <= 10
                }
              >
                Next Page
              </button>
            </section>
          }
        </section>
      </>
    );
  }

  handleDelete = comment_id => {
    const { articleData, fetchComments } = this.props;
    api.deleteComment(articleData.article_id, comment_id).then(() => {
      fetchComments(articleData.article_id);
    });
  };

  handleNextPage = () => {
    const { articleData, fetchComments } = this.props;
    this.setState(
      prevState => {
        prevState.currentPage++;
      },
      () => {
        const { currentPage } = this.state;
        fetchComments(articleData.article_id, currentPage);
      },
    );
  };

  handlePrevPage = () => {
    const { articleData, fetchComments } = this.props;
    this.setState(
      prevState => {
        prevState.currentPage--;
      },
      () => {
        const { currentPage } = this.state;
        fetchComments(articleData.article_id, currentPage);
      },
    );
  };
}

export default Comments;

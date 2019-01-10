import React, { Component } from 'react';
import * as api from '../api';

class Voting extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    const { articleData, commentData } = this.props;
    const { voteChange } = this.state;
    return (
      <section className='articleElement'>
        <h1>Let's vote</h1>
        <button onClick={() => this.vote(1)} disabled={voteChange === 1}>
          Up
        </button>
        <p>Votes: {articleData.votes + voteChange}</p>
        <button onClick={() => this.vote(-1)} disabled={voteChange === -1}>
          Down
        </button>
      </section>
    );
  }

  vote = increment => {
    const { articleData, commentData } = this.props;
    const { voteChange } = this.state;
    commentData
      ? api
          .commentVote(
            articleData.article_id,
            commentData.comment_id,
            increment,
          )
          .catch(err =>
            this.setState(state => ({
              voteChange: voteChange - increment,
            })),
          )
          .then(
            this.setState(state => ({
              voteChange: voteChange + increment,
            })),
          )
      : api
          .vote(articleData.article_id, increment)
          .catch(err =>
            this.setState(state => ({
              voteChange: voteChange - increment,
            })),
          )
          .then(
            this.setState(state => ({
              voteChange: voteChange + increment,
            })),
          );
  };
}

export default Voting;

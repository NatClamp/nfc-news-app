import React, { Component } from 'react';
import * as api from '../api';

class Voting extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    const { id, votes, type } = this.props;
    const { voteChange } = this.state;
    return (
      <section className='articleElement'>
        <h1>Let's vote</h1>
        <button onClick={() => this.vote(1)} disabled={voteChange === 1}>
          Up
        </button>
        <p>Votes: {votes + voteChange}</p>
        <button onClick={() => this.vote(-1)} disabled={voteChange === -1}>
          Down
        </button>
      </section>
    );
  }

  vote = increment => {
    const { id, type, commentId } = this.props;
    const { voteChange } = this.state;
    const apiCall =
      type === 'comment'
        ? api.vote(id, increment, commentId)
        : api.vote(id, increment);
    apiCall
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

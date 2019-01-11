import React, { Component } from 'react';
import * as api from '../api';
import './Voting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Voting extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;
    return (
      <div className='votingContainer'>
        <button
          className='button--voting'
          onClick={() => this.vote(1)}
          disabled={voteChange === 1}
        >
          <FontAwesomeIcon icon='arrow-up' />
        </button>
        <p className='votes'>{votes + voteChange}</p>
        <button
          className='button--voting'
          onClick={() => this.vote(-1)}
          disabled={voteChange === -1}
        >
          <FontAwesomeIcon icon='arrow-down' />
        </button>
      </div>
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

import React, { Component } from 'react';
import * as api from '../api';
import './Voting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Voting extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    const { votes, type } = this.props;
    const { voteChange } = this.state;
    return (
      <div
        className={
          type === 'article' ? 'votingContainer' : 'votingContainer--comment'
        }
      >
        <button
          className={
            type === 'article'
              ? 'invisibleButton'
              : 'invisibleButton invisibleButton--comment'
          }
          onClick={() => this.vote(1)}
          disabled={voteChange === 1}
        >
          <FontAwesomeIcon
            icon='arrow-up'
            className={
              voteChange === 1
                ? 'button--voting button--voting--disabled'
                : 'button--voting'
            }
          />
        </button>
        <p className='votes'>{parseInt(votes) + voteChange}</p>
        <button
          className={
            type === 'article'
              ? 'invisibleButton'
              : 'invisibleButton invisibleButton--comment'
          }
          onClick={() => this.vote(-1)}
          disabled={voteChange === -1}
        >
          <FontAwesomeIcon
            icon='arrow-down'
            className={
              voteChange === -1
                ? 'button--voting button--voting--disabled'
                : 'button--voting'
            }
          />
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

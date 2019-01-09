import React, { Component } from 'react';
import * as api from '../api';

class Voting extends Component {
  state = {
    voteChange: 0,
  };
  render() {
    const { articleData } = this.props;
    const { voteChange } = this.state;
    return (
      <section>
        <h1>Let's vote</h1>
        <button onClick={() => this.vote(1)}>Up</button>
        <p>Votes: {articleData.votes + voteChange}</p>
        <button onClick={() => this.vote(-1)}>Down</button>
      </section>
    );
  }

  vote = increment => {
    const { articleData } = this.props;
    const { voteChange } = this.state;
    api.vote(articleData.article_id, increment).catch(err =>
      this.setState(state => ({
        voteChange: voteChange - increment,
      })),
    );
    this.setState(state => ({
      voteChange: voteChange + increment,
    }));
  };
}

export default Voting;

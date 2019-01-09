import React, { Component } from 'react';
import * as api from '../api';
// import { navigate } from '@reach/router';

class PostTopic extends Component {
  state = {
    topic: {},
    postComplete: false,
  };
  render() {
    const { topic, postComplete } = this.state;
    return !postComplete ? (
      <section className='content-well'>
        <h1>post a topic</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='slug'>Slug:</label>
          <input type='text' id='slug' required />
          <label htmlFor='description'>Description:</label>
          <input type='text' id='description' required />
          <button type='submit'>Post Topic</button>
        </form>
      </section>
    ) : (
      <>
        <div>
          <h1>Topic Posted</h1>
          <p>{topic.slug}</p>
          <p>{topic.description}</p>
        </div>
      </>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const slug = event.target.slug.value;
    const description = event.target.description.value;
    api.postTopic(slug, description).then(topic => {
      this.setState(() => ({ topic, postComplete: true }));
    });
  };
}

export default PostTopic;

import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

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
      <section className='content-well'>
        <article className='newTopic'>
          <p>{topic.slug}</p>
          <p>{topic.description}</p>
        </article>
        <h1>
          Why not post an article in your new{' '}
          <Link to='/post-article'>topic</Link>?
        </h1>
      </section>
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.postComplete !== this.state.postComplete) {
      this.props.fetchTopics();
    }
  }
}

export default PostTopic;

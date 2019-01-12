import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

class PostTopic extends Component {
  state = {
    topic: {},
    postComplete: false,
    slug: '',
    description: '',
  };
  render() {
    const { topic, postComplete, slug, description } = this.state;
    return !postComplete ? (
      <section className='content-well'>
        <h1>post a topic</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='slug'>Slug:</label>
          <input
            type='text'
            id='slug'
            value={slug}
            onChange={this.handleChange}
            required
          />
          <label htmlFor='description'>Description:</label>
          <textarea
            type='text'
            id='description'
            value={description}
            onChange={this.handleChange}
            required
          />
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

  handleChange = event => {
    const { id } = event.target;
    const value =
      id === 'slug' ? event.target.value.toLowerCase() : event.target.value;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { slug, description } = this.state;
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

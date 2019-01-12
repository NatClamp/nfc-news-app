import React, { Component } from 'react';
import * as api from '../api';
import './PostTopic.css';
import PostArticle from './PostArticle';

class PostTopic extends Component {
  state = {
    topic: {},
    postComplete: false,
    slug: '',
    description: '',
  };
  render() {
    const { topics, user } = this.props;
    const { postComplete, slug, description } = this.state;
    return !postComplete ? (
      <section className='content-well'>
        <h1 className='title title--post'>Create a Topic</h1>
        <form onSubmit={this.handleSubmit} className='postTopicForm'>
          <input
            type='text'
            id='slug'
            value={slug}
            onChange={this.handleChange}
            required
            placeholder='Topic name'
            className='postTopicForm__input'
          />
          <textarea
            type='text'
            id='description'
            value={description}
            onChange={this.handleChange}
            className='postTopicForm__textarea'
            placeholder='Topic description'
            required
          />
          <button type='submit' className='button button--submit'>
            post
          </button>
        </form>
      </section>
    ) : (
      <div>{postComplete && <PostArticle user={user} topics={topics} />}</div>
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

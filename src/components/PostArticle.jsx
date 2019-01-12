import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

class PostArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
  };
  render() {
    const { topics } = this.props;
    return (
      <section className='content-well'>
        <h1>Post an Article</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            value={this.state.title}
            id='title'
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor='body'>Body:</label>
          <textarea
            type='text'
            value={this.state.body}
            id='body'
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor='topic'>Topic:</label>
          <select
            id='topic'
            value={this.state.topic}
            onChange={this.handleChange}
          >
            <option defaultselected='true' hidden>
              Select a Topic
            </option>
            {topics.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
          <button type='submit'>Post Article</button>
        </form>
      </section>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const user_id = this.props.user.user_id;
    const { title, body, topic } = this.state;
    api.postArticle(topic, { title, body, user_id }).then(article => {
      navigate(`/articles/${article.article_id}`);
    });
  };
}

export default PostArticle;

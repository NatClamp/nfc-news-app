import React, { Component } from 'react';
import * as api from '../api';

class PostArticle extends Component {
  state = {
    articlePosted: false,
  };
  render() {
    const { topics } = this.props;
    const { articlePosted } = this.state;
    return (
      <section className='content-well'>
        <h1>Post an Article</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input type='text' id='title' required />
          <label htmlFor='body'>Body:</label>
          <input type='text' id='body' required />
          <label htmlFor='topic'>Topic:</label>
          <select id='topic'>
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
        {articlePosted && (
          <section>
            <h1>Successfully Posted!</h1>
          </section>
        )}
      </section>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    const user_id = this.props.user.user_id;
    const topic = event.target.topic.value;
    api.postArticle(topic, { title, body, user_id }).then(article => {
      this.setState(() => ({ articlePosted: true }));
    });
  };
}

export default PostArticle;

import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';
import './PostArticle.css';

class PostArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
  };
  render() {
    const { topics, path } = this.props;
    return (
      <section className='content-well content-well--shortcontent'>
        {path === '/post-article' ? (
          <h1 className='title title--post'>Post an Article</h1>
        ) : (
          <h1 className='title title--post'>
            Post an Article in your new topic
          </h1>
        )}
        <form onSubmit={this.handleSubmit} className='postArticleForm'>
          <input
            type='text'
            value={this.state.title}
            id='title'
            onChange={this.handleChange}
            required
            placeholder='TITLE'
            className='postArticleForm__input'
          />
          <textarea
            type='text'
            value={this.state.body}
            id='body'
            onChange={this.handleChange}
            required
            placeholder='BODY'
            className='postArticleForm__textarea'
          />
          <select
            id='topic'
            value={this.state.topic}
            onChange={this.handleChange}
            className='postArticleForm__select'
          >
            <option defaultselected='true' hidden>
              Select a Topic
            </option>
            {topics.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                </option>
              );
            })}
          </select>
          <button
            type='submit'
            className='button button--submit button--submit--postarticle'
          >
            Post
          </button>
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

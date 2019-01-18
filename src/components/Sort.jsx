import React, { Component } from 'react';
import './Sort.css';

class Sort extends Component {
  state = {
    sort_by: '',
  };
  render() {
    return (
      <section className='sortBar'>
        <div className='sortOption'>
          <input
            className='app-nav__input'
            name='sort_by'
            type='radio'
            value='New'
            id='New'
            onChange={this.handleChange}
            defaultChecked
          />
          <label className='sortLabel' htmlFor='New'>
            New
          </label>
        </div>
        <div className='sortOption'>
          <input
            className='app-nav__input'
            name='sort_by'
            type='radio'
            value='Popular'
            id='Popular'
            onChange={this.handleChange}
          />
          <label className='sortLabel' htmlFor='Popular'>
            Popular
          </label>
        </div>
        <div className='sortOption'>
          <input
            className='app-nav__input'
            name='sort_by'
            type='radio'
            value='Trending'
            id='Trending'
            onChange={this.handleChange}
          />
          <label className='sortLabel' htmlFor='Trending'>
            Trending
          </label>
        </div>
      </section>
    );
  }

  handleChange = event => {
    const { fetchArticles, topic } = this.props;
    const { name, value } = event.target;
    const lookup = {
      New: 'created_at',
      Popular: 'votes',
      Trending: 'comment_count&sort_ascending=true',
    };

    this.setState(
      {
        [name]: lookup[value].toLowerCase(),
      },
      () => fetchArticles(topic, this.state.sort_by),
    );
  };
}

export default Sort;

import React, { Component } from 'react';

class Sort extends Component {
  state = {
    sort_by: '',
  };
  render() {
    return (
      <section className='sortBar'>
        <form>
          <select
            id='sort_by'
            value={this.state.sort_by}
            onChange={this.handleChange}
          >
            <option defaultselected='true' hidden>
              Sort
            </option>
            <option value={this.state.created_at}>New</option>
            <option value={this.state.votes}>Popular</option>
            <option value={this.state.comment_count}>Trending</option>
          </select>
        </form>
      </section>
    );
  }

  handleChange = event => {
    const { fetchArticles, topic } = this.props;
    const { id, value } = event.target;
    const lookup = {
      New: 'created_at',
      Popular: 'votes',
      Trending: 'comment_count&sort_ascending=true',
    };

    this.setState(
      {
        [id]: lookup[value].toLowerCase(),
      },
      () => fetchArticles(topic, this.state.sort_by),
    );
  };
}

export default Sort;

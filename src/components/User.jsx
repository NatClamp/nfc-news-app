import React, { Component } from 'react';
import * as api from '../api';
import './User.css';
import Cards from './Cards';
import Loading from './Loading';

class User extends Component {
  state = {
    user: {},
    articles: [],
    isLoading: true,
  };
  render() {
    const { username, avatar_url, name } = this.state.user;
    const { articles, isLoading } = this.state;
    return isLoading ? (
      <main className='content-well'>
        <Loading />
      </main>
    ) : (
      <main className='content-well'>
        <article className='profile__userCard'>
          <section className='profile__userCard__avatarContainer'>
            <img
              src={avatar_url}
              alt='user_avatar'
              className='profile__user_avatar'
            />
          </section>
          <section className='profile__userCard__textContainer'>
            <h1 className='profile__userName'>{name}</h1>
            <h2 className='profile__userHandle'>@{username}</h2>
          </section>
        </article>

        {articles.length >= 0 && (
          <section className='userArticleCards'>
            <h2 className='title'>Articles by {username}</h2>
            <Cards articles={articles} />
          </section>
        )}
      </main>
    );
  }

  componentDidMount() {
    api
      .getAllUsers()
      .then(allUsers => {
        return allUsers.filter(user => user.username === this.props.username);
      })
      .then(user =>
        this.setState({ user: user[0] }, () => {
          this.fetchArticles();
        }),
      );
  }

  fetchArticles = () => {
    api
      .getArticles()
      .then(articles => {
        articles = articles.filter(
          article => article.author === this.props.username,
        );

        articles = !Array.isArray(articles) ? [articles] : articles;
        this.setState({
          articles,
          isLoading: false,
        });
      })
      .catch(err => this.setState({ err: err }));
  };
}

export default User;

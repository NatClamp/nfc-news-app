import React, { Component } from 'react';
import * as api from '../api';
import './User.css';

class User extends Component {
  state = {
    user: {},
  };
  render() {
    const { username, avatar_url, name } = this.state.user;
    return (
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
        this.setState({
          user: user[0],
        }),
      );
  }
}

export default User;

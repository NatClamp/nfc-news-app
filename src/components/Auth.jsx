import React, { Component } from 'react';
import * as api from '../api';
import './Auth.css';

class Auth extends Component {
  state = {
    username: 'jessjelly',
    failedAttempt: false,
  };
  render() {
    const { user, children } = this.props;
    const { username, failedAttempt } = this.state;
    return user.user_id ? (
      children
    ) : (
      <div className='authPageContainer'>
        <section className='authPage__main'>
          <section className='authPage__header'>
            <h1>NFC-news</h1>
            <h3>Login</h3>
          </section>
          <form onSubmit={this.handleSubmit}>
            <section className='authPage__form'>
              <label htmlFor='username' className='authPage__form__label'>
                Username:
              </label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={this.handleUsername}
                className='authPage__form__input'
              />
            </section>
            <section className='authPage__main__Element'>
              <button type='submit' className='button button--login'>
                Login
              </button>
            </section>
          </form>
          {this.state.failedAttempt && <p>Incorrect username</p>}
        </section>
      </div>
    );
  }

  handleUsername = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .getUser(this.state.username)
      .then(userDetails => {
        return this.props.login(userDetails);
      })
      .catch(err =>
        this.setState({
          failedAttempt: true,
        }),
      );
  };
}

export default Auth;

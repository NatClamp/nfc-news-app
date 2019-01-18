import React, { Component } from 'react';
import * as api from '../api';
import './Auth.css';
import Loading from './Loading';

class Auth extends Component {
  state = {
    username: 'jessjelly',
    failedAttempt: false,
    isLoading: false,
  };
  render() {
    const { user, children } = this.props;
    const { username, failedAttempt, isLoading } = this.state;
    return user.user_id ? (
      children
    ) : (
      <div className='authPageContainer'>
        <main className='loginContainer'>
          <h1 className='title title--auth'>NFC-News</h1>
          <section className='authPage__main'>
            <section className='authPage__header'>
              <h3 className='subTitle--auth'>Please login to your account</h3>
            </section>
            {isLoading ? (
              <div className='loader'>
                <Loading />
              </div>
            ) : (
              <>
                <form onSubmit={this.handleSubmit} className='authPage__form'>
                  <div className='authPage__form__username'>
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
                  </div>
                  <div className='authPage__form__submit'>
                    <button type='submit' className='button'>
                      Login
                    </button>
                  </div>
                </form>
              </>
            )}
            <div className='feedback'>
              {failedAttempt && <p>Incorrect username</p>}
            </div>
          </section>
        </main>
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
    this.setState({ isLoading: true });
    api
      .getUser(this.state.username)
      .then(userDetails => {
        this.setState({ isLoading: false });
        return this.props.login(userDetails);
      })
      .catch(err =>
        this.setState({
          isLoading: false,
          failedAttempt: true,
        }),
      );
  };
}

export default Auth;

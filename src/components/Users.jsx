import React, { Component } from 'react';
import './Users.css';
import * as api from '../api';

class Users extends Component {
  state = {
    users: [],
  };
  render() {
    const { users } = this.state;
    return (
      <section className='content-well'>
        {users.map(user => {
          return <p>{user.username}</p>;
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    api.getAllUsers().then(users => {
      this.setState({
        users,
      });
    });
  };
}

export default Users;

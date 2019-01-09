import React, { Component } from 'react';
import './Users.css';
import * as api from '../api';
import Cards from './Cards';

class Users extends Component {
  state = {
    users: [],
  };
  render() {
    const { users } = this.state;
    return (
      <section className='content-well'>
        <Cards users={users} />
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

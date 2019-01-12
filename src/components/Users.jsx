import React, { Component } from 'react';
import './Users.css';
import * as api from '../api';
import Cards from './Cards';

class Users extends Component {
  state = {
    loading: true,
    allUsers: [],
  };
  render() {
    const { allUsers } = this.state;
    return this.state.loading ? (
      <p>Loading</p>
    ) : (
      <section className='content-well'>
        <Cards users={allUsers} />
      </section>
    );
  }

  componentDidMount() {
    this.fetchAllUsers();
    this.setState({ loading: false });
  }

  fetchAllUsers = () => {
    api.getAllUsers().then(allUsers => {
      this.setState({
        allUsers,
      });
    });
  };
}

export default Users;

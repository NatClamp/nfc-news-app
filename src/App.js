import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Footer from './components/Footer';
import Article from './components/Article';
import Users from './components/Users';
import User from './components/User';
import Auth from './components/Auth';

class App extends Component {
  state = {
    navOpen: false,
    user: {},
  };
  render() {
    return (
      <div className='App'>
        <Auth login={this.login} user={this.state.user}>
          <Header toggleNav={this.toggleNav} />
          <Nav navOpen={this.state.navOpen} />
          <Router className='main'>
            <Articles path='/' />
            <Articles path='/:topic' />
            <Article path='/articles/:article_id' />
            <Users path='/users' />
            <User path='/user/:username' />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }

  componentDidMount() {
    if (localStorage.getItem('user') && !this.state.user.username) {
      this.setState({ user: JSON.parse(localStorage.getItem('user')) });
    }
  }

  login = user => {
    this.setState({
      user,
    });
    localStorage.setItem('user', JSON.stringify(user));
  };

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };
}

export default App;

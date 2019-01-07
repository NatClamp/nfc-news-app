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

class App extends Component {
  state = {
    navOpen: false,
  };
  render() {
    return (
      <div className='App'>
        <Header toggleNav={this.toggleNav} />
        <Nav navOpen={this.state.navOpen} />
        <Router className='main'>
          <Articles path='/' />
          <Articles path='/:topic' />
          <Article path='/articles/:article_id' />
          <Users path='/users' />
          <User path='/user/:user_id' />
        </Router>
        <Footer />
      </div>
    );
  }

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };
}

export default App;

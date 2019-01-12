import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import './App.css';
import * as api from './api';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Footer from './components/Footer';
import Article from './components/Article';
import Users from './components/Users';
import User from './components/User';
import Auth from './components/Auth';
import PostTopic from './components/PostTopic';
import PostArticle from './components/PostArticle';
import Errors from './components/Errors';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
library.add(faBars, faArrowUp, faArrowDown);

class App extends Component {
  state = {
    navOpen: false,
    user: {},
    topics: [],
  };
  render() {
    const { navOpen, user, topics } = this.state;
    return (
      <div className='App'>
        <Auth login={this.login} user={user}>
          <Header toggleNav={this.toggleNav} goHome={this.goHome} />
          <Nav
            navOpen={navOpen}
            logout={this.logout}
            topics={topics}
            user={user}
          />
          <Router className='main'>
            <Articles path='/' />
            <Articles path='/:topic' />
            <Article path='/articles/:article_id' user={user} />
            <PostTopic path='/post-topic' fetchTopics={this.fetchTopics} />
            <PostArticle
              path='/post-article'
              user={user}
              topics={this.state.topics}
            />
            <Users path='/users' />
            <User path='/user/:username' />
            <Errors path='/404' goHome={this.goHome} />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }

  componentDidMount() {
    const { user } = this.state;
    this.fetchTopics();
    if (localStorage.getItem('user') && !user.username) {
      this.setState({ user: JSON.parse(localStorage.getItem('user')) });
    }
  }

  login = user => {
    this.setState({
      user,
    });
    localStorage.setItem('user', JSON.stringify(user));
  };

  logout = () => {
    this.setState({ user: {} });
    localStorage.clear();
  };

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics =>
        this.setState({
          topics,
        }),
      )
      .catch(err => this.props.navigate('/404', { replace: true }));
  };

  toggleNav = () => {
    const { navOpen } = this.state;
    this.setState({
      navOpen: !navOpen,
    });
  };

  goHome = () => {
    navigate('/');
  };
}

export default App;

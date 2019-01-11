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
import Error from './components/Errors';

class App extends Component {
  state = {
    navOpen: false,
    user: {},
    topics: [],
  };
  render() {
    return (
      <div className='App'>
        <Auth login={this.login} user={this.state.user}>
          <Header toggleNav={this.toggleNav} goHome={this.goHome} />
          <Nav
            navOpen={this.state.navOpen}
            logout={this.logout}
            topics={this.state.topics}
          />
          <Router className='main'>
            <Articles path='/' />
            <Articles path='/:topic' />
            <Article path='/articles/:article_id' user={this.state.user} />
            <PostTopic path='/post-topic' fetchTopics={this.fetchTopics} />
            <PostArticle
              path='/post-article'
              user={this.state.user}
              topics={this.state.topics}
            />
            <Users path='/users' />
            <User path='/user/:username' />
            <Error path='/404' />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
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
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };

  goHome = () => {
    navigate('/');
  };
}

export default App;

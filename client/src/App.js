import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authToken } from './actions/authActions';

import Navigation from './components/Navigation';
import TodayWords from './components/TodayWords';
import WordsList from './components/WordsList';
import Register from './components/Register';
import Login from './components/Login';
import { Container } from 'reactstrap';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/today-word" component={TodayWords} />
        <Route path="/dashboard">
          <h1>Dashboard</h1>
        </Route>
        <Route path="/words" component={WordsList} />
        <Route path="/" component={TodayWords} />
      </Switch>
    );

    if (!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/home">
            <h1 className='mt-5'>Home page</h1>
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/">
            <h1 className='mt-5'>Home page</h1>
          </Route>
        </Switch>
      );
    }

    return (
      <Container>
        <Navigation />
        {routes}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(App);

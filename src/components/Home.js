import React, { Component } from 'react';

import { createSession } from '../actions';

export class Home extends Component {
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    return store.dispatch(createSession({ id: 1, name: 'Cullen Jett' }));
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
      </div>
    );
  }
}

export default Home;

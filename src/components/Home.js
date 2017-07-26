import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class Home extends Component {
  static fetchData(store, match) {
    // Here we're mimicing an async actionCreator
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({
          type: 'CREATE_SESSION',
          session: {
            user: { id: 1, name: 'Cullen Jett' }
          }
        });

        resolve();
      }, 500);
    });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default withRouter(connect()(Home));

import React from 'react';
import {
  Switch,
  Route,
  NavLink
} from 'react-router-dom';

import asAsyncComponent from './utils/asAsyncComponent';

const AsyncHome = asAsyncComponent(() => import(/* webpackChunkName: 'home' */ './components/Home'));
const AsyncAbout = asAsyncComponent(() => import(/* webpackChunkName: 'about' */ './components/About'));

const App = () => (
  <div className="app">
    <nav>
      <NavLink exact to="/" activeClassName="active">Home</NavLink>
      <span>&nbsp;</span>
      <NavLink exact to="/about" activeClassName="active">About</NavLink>
    </nav>

    <div className="main">
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route path="/about" component={AsyncAbout} />
      </Switch>
    </div>

    <footer />
  </div>
);

export default App;

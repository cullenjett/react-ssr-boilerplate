import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './components/Home'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './components/About'),
  loading() {
    return <div>Loading...</div>;
  }
});

const App = () => (
  <div className="app">
    <nav>
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <span>&nbsp;</span>
      <NavLink exact to="/about" activeClassName="active">
        About
      </NavLink>
    </nav>

    <div className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/about" component={LoadableAbout} />
      </Switch>
    </div>

    <footer />
  </div>
);

export default App;

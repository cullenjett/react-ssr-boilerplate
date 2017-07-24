import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import { Home, About } from '../routes';

const Layout = () => (
  <div className="layout">
    <nav>
      <NavLink exact to="/" activeClassName="active">Home</NavLink>
      <span>&nbsp;</span>
      <NavLink exact to="/about" activeClassName="active">About</NavLink>
    </nav>

    <div className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>

    <footer></footer>
  </div>
);

export default Layout;

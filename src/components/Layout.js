import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// import Home from './Home';
// import About from './About';
import { Home, About } from '../routes';

const Layout = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <span>&nbsp;</span>
      <Link to="/about">About</Link>
    </nav>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  </div>
);

export default Layout;

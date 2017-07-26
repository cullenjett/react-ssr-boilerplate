import url from 'url';
import React from 'react';
import { render } from 'rapscallion';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';

import IndexHtml from '../src/IndexHtml';
import App from '../src/App';
import configureStore from '../src/configureStore';
import routeConfig from '../src/routes/routeConfig';

const renderServerSideApp = (req, res) => {
  const store = configureStore();

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Transfer-Encoding': 'chunked'
  });

  res.write('<!doctype html>');

  fetchDataForRender(req, store).then(() => {
    render(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <IndexHtml initialState={store.getState()}>
            <App />
          </IndexHtml>
        </StaticRouter>
      </Provider>
    ).toStream().pipe(res);
  });
};

module.exports = renderServerSideApp;

function fetchDataForRender(req, store) {
  const promises = [];

  // use `Array.some` to imitate `<Switch>` behavior of selecting only the first to match
  routeConfig.some(route => {
    const match = matchPath(url.parse(req.url).pathname, route);
    if (match) {
      const promise = (route.component &&
        route.component.fetchData &&
        route.component.fetchData(store, match));
      promises.push(promise);
    }
    return match;
  });

  return Promise.all(promises);
}

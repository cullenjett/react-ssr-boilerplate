import React from 'react';
import { render } from 'rapscallion';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import IndexHtml from '../src/IndexHtml';
import App from '../src/App';
import configureStore from '../src/utils/configureStore';
import fetchDataForRender from './fetchDataForRender';

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

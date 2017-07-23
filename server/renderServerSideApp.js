import React from 'react';
import { render } from 'rapscallion';
import { StaticRouter } from 'react-router-dom';

import IndexHtml from '../src/IndexHtml';
import Layout from '../src/components/Layout';

const renderServerSideApp = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Transfer-Encoding': 'chunked'
  });

  res.write('<!doctype html>');

  render(
    <StaticRouter location={req.url} context={{}}>
      <IndexHtml>
        <Layout />
      </IndexHtml>
    </StaticRouter>
  ).toStream().pipe(res);
};

module.exports = renderServerSideApp;

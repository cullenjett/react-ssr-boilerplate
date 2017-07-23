import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import IndexHtml from '../src/IndexHtml';
import Layout from '../src/components/Layout';

const renderServerSideApp = (req, res) => {
  const markup = renderToStaticMarkup(
    <StaticRouter location={req.url} context={{}}>
      <IndexHtml>
        <Layout />
      </IndexHtml>
    </StaticRouter>
  );

  return res.send('<!doctype html>' + markup);
};

module.exports = renderServerSideApp;

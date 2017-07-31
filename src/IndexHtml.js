import React from 'react';

let assetManifest;
if (process.env.NODE_ENV === 'production') {
  assetManifest = require('../build/asset-manifest.json');
} else {
  assetManifest = {
    'node-modules.js': 'node-modules.bundle.js',
    'main.js': 'main.bundle.js'
  };
}

const preloadScripts = () => {
  const paths = [
    assetManifest['node-modules.js'],
    assetManifest['main.js']
  ];

  return paths.map((path, i) => (
    <link rel="preload" as="script" href={path} key={i} />
  ));
};

const jsScripts = () => {
  const paths = [
    assetManifest['node-modules.js'],
    assetManifest['main.js']
  ];

  return paths.map((path, i) => (
    <script type="text/javascript" src={path} key={i}></script>
  ));
};

const cssLinks = () => {
  const paths = [
    assetManifest['main.css']
  ];

  return paths.map((path, i) => (
    <link rel="stylesheet" href={path} key={i}/>
  ));
};

const IndexHtml = ({ initialState, children }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      {cssLinks()}
      {preloadScripts()}
      <title>React SSR Boilerplate</title>
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}` }}></script>
    </head>
    <body>
      <div id="root">{children}</div>
      {jsScripts()}
    </body>
  </html>
);

export default IndexHtml;

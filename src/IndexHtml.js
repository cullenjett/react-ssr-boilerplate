import React from 'react';

import assetManifest from '../build/asset-manifest.json';

const jsScripts = () => {
  return [
    assetManifest['node-modules.js'],
    assetManifest['main.js']
  ].map(path => (
    <script type="text/javascript" src={path}></script>
  ));
};

const cssLinks = () => {
  return [
    assetManifest['main.css']
  ].map(path => (
    <link rel="stylesheet" href={path} />
  ));
};

const IndexHtml = ({ children }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      {cssLinks()}
      <title>React App</title>
    </head>
    <body>
      <div id="root">{children}</div>
      {/* <script type="text/javascript" src={getBundleJs()}></script> */}
      {jsScripts()}
    </body>
  </html>
);

export default IndexHtml;

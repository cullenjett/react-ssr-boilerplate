import React from 'react';

import assetManifest from '../build/asset-manifest.json';

const getBundleJs = () => {
  return assetManifest['main.js'];
}

const getBundleCss = () => {
  return assetManifest['main.css'];
}

const IndexHtml = ({ children }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="stylesheet" href={getBundleCss()}/>
      <title>React App</title>
    </head>
    <body>
      <div id="root">{children}</div>
      <script type="text/javascript" src={getBundleJs()}></script>
    </body>
  </html>
);

export default IndexHtml;

const PUBLIC_URL = process.env.PUBLIC_URL || '';
const isProduction = process.env.NODE_ENV === 'production';
let assetManifest = {
  'node-modules.js': 'node-modules.bundle.js',
  'main.js': 'main.bundle.js'
};

if (isProduction) {
  assetManifest = require('../build/asset-manifest.json');
}

const preloadScripts = () => {
  const paths = [
    assetManifest['node-modules.js'],
    assetManifest['main.js']
  ];

  return paths.reduce((string, path) => {
    string += `<link rel="preload" as="script" href=${PUBLIC_URL}/${path} />`;
    return string;
  }, '');
};

const cssLinks = () => {
  const paths = [
    assetManifest['main.css']
  ];

  if (isProduction) {
    return paths.reduce((string, path) => {
      string += `<link rel="stylesheet" href=${PUBLIC_URL}/${path} />`;
      return string;
    }, '');
  } else {
    return '';
  }
};

const jsScripts = () => {
  const paths = [
    assetManifest['node-modules.js'],
    assetManifest['main.js']
  ];

  return paths.reduce((string, path) => {
    string += `<script type="text/javascript" src=${PUBLIC_URL}/${path}></script>`;
    return string;
  }, '');
};

const indexHtml = ({ initialState, helmet, markup }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${preloadScripts()}
        ${helmet.link.toString()}
        ${cssLinks()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
        ${helmet.noscript.toString()}
      </head>
      <body ${bodyAttrs}>
        <div id="root">${markup}</div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>

        ${jsScripts()}
      </body>
    </html>
  `;
};

export default indexHtml;

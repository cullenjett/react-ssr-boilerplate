import getClientEnvironment from '../config/env';

const env = getClientEnvironment();
const PUBLIC_URL = env.raw.PUBLIC_URL;
let assetManifest;

if (env.raw.NODE_ENV === 'production') {
  assetManifest = require('../build/asset-manifest.json');
} else {
  assetManifest = {
    'node-modules.js': 'node-modules.bundle.js',
    'main.js': 'main.bundle.js'
  };
}

const preloadScripts = () => {
  const paths = [assetManifest['node-modules.js'], assetManifest['main.js']];

  return paths.reduce((string, path) => {
    string += `<link rel="preload" as="script" href=${PUBLIC_URL}/${path} />`;
    return string;
  }, '');
};

const cssLinks = () => {
  const paths = [assetManifest['main.css']];

  if (env.raw.NODE_ENV === 'production') {
    return paths.reduce((string, path) => {
      string += `<link rel="stylesheet" href=${PUBLIC_URL}/${path} />`;
      return string;
    }, '');
  } else {
    return '';
  }
};

const jsScripts = bundles => {
  const paths = [
    assetManifest['node-modules.js'],
    assetManifest['main.js'],
    ...bundles.filter(b => b.file.endsWith('.js')).map(b => b.file)
  ];

  return paths.reduce((string, path) => {
    string += `<script type="text/javascript" src=${PUBLIC_URL}/${path}></script>`;
    return string;
  }, '');
};

const indexHtml = ({ helmet, initialState, markup, bundles }) => {
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
          window.process = ${env.forIndexHtml};
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>

        ${jsScripts(bundles)}

        <script>window.render();</script>
      </body>
    </html>
  `;
};

export default indexHtml;

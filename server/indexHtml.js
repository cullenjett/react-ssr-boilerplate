import getClientEnvironment from '../config/env';

const env = getClientEnvironment();
const PUBLIC_URL = env.raw.PUBLIC_URL;
let assetManifest;

if (env.raw.NODE_ENV === 'production') {
  assetManifest = require('../build/asset-manifest.json');
} else {
  assetManifest = {
    'main.js': '/main.bundle.js'
  };
}

const preloadScripts = bundles => {
  const paths = [
    assetManifest['main.js'],
    ...bundles
      .filter(b => b.file.endsWith('.js'))
      .map(b => `${PUBLIC_URL}/${b.file}`)
  ];

  return paths.reduce((string, path) => {
    string += `<link rel="preload" as="script" href=${PUBLIC_URL}${path} />`;
    return string;
  }, '');
};

const cssLinks = () => {
  const paths = [assetManifest['main.css']];

  if (env.raw.NODE_ENV === 'production') {
    return paths.reduce((string, path) => {
      string += `<link rel="stylesheet" href=${PUBLIC_URL}${path} />`;
      return string;
    }, '');
  } else {
    return '';
  }
};

const jsScripts = bundles => {
  const paths = [
    assetManifest['main.js'],
    ...bundles
      .filter(b => b.file.endsWith('.js'))
      .map(b => `${PUBLIC_URL}/${b.file}`)
  ];

  return paths.reduce((string, path) => {
    string += `<script type="text/javascript" src=${PUBLIC_URL}${path}></script>`;
    return string;
  }, '');
};

const IndexHtml = ({ helmet, initialState, markup, bundles }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${preloadScripts(bundles)}
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

export default IndexHtml;

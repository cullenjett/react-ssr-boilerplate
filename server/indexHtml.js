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
  const jsFilePaths = Object.keys(assetManifest)
    .filter(file => file.match(/\.js$/))
    .map(jsFile => assetManifest[jsFile]);

  const bundleFilePaths = [...bundles]
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...jsFilePaths, ...bundleFilePaths]
    .map(
      jsFilePath =>
        `<link rel="preload" as="script" href="${jsFilePath}"></script>`
    )
    .join('');
};

const cssLinks = () => {
  if (env.raw.NODE_ENV !== 'production') {
    return '';
  }

  return Object.keys(assetManifest)
    .filter(file => file.match(/\.css$/))
    .map(cssFile => assetManifest[cssFile])
    .map(cssFilePath => `<link rel="stylesheet" href="${cssFilePath}">`)
    .join('');
};

const jsScripts = bundles => {
  const jsFilePaths = Object.keys(assetManifest)
    .filter(file => file.match(/\.js$/))
    .map(jsFile => assetManifest[jsFile]);

  const bundleFilePaths = [...bundles]
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...jsFilePaths, ...bundleFilePaths]
    .map(
      jsFilePath =>
        `<script type="text/javascript" src="${jsFilePath}"></script>`
    )
    .join('');
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

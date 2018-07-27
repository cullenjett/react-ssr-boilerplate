/* eslint-disable no-console */
require('babel-core/register')({
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: '[hash:base64]'
      }
    ],
    'syntax-dynamic-import',
    'dynamic-import-node'
  ]
});

process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

require('../config/env');

const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const {
  choosePort,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const Loadable = require('react-loadable');

const app = require('../server/app').default;

const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (!port) {
      return;
    }

    const urls = prepareUrls('http', HOST, port);

    Loadable.preloadAll().then(() => {
      app.listen(port, HOST, err => {
        if (err) {
          return console.log(err);
        }

        if (isInteractive) {
          clearConsole();
        }

        console.log(
          chalk.cyan(
            `Running on local network at ${urls.lanUrlForConfig}:${port}`
          )
        );
        console.log(chalk.cyan('Starting the development server...\n'));

        openBrowser(urls.localUrlForBrowser);
      });
    });
  })
  .catch(err => {
    console.log(err);
  });

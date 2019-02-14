/* eslint-disable no-console */
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

require('@babel/register')({
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: '[hash:base64]'
      }
    ],
    'dynamic-import-node'
  ]
});

const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');

const { app } = require('../server/app');

process.on('unhandledRejection', err => {
  throw err;
});

const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

choosePort(HOST, DEFAULT_PORT).then(port => {
  if (!port) {
    return;
  }

  const urls = prepareUrls('http', HOST, port);

  app.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }

    if (isInteractive) {
      clearConsole();
    }

    console.log(chalk.white('\n\tStarting dev server...'));

    openBrowser(urls.localUrlForBrowser);

    console.log(
      chalk.blue(`
        Running locally at ${urls.localUrlForBrowser}
        Running on your network at ${urls.lanUrlForConfig}:${port}
      `)
    );
  });
});

require('babel-core/register')({
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node'
  ]
});

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const app = require('../server/app').default;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls(protocol, HOST, port);
    
    // Launch server.
    app.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

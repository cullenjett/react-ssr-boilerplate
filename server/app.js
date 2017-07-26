require('babel-core/register')({
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node'
  ]
});

const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const renderServerSideApp = require('./renderServerSideApp');

const app = express();

app.use(compression());
app.use(helmet());

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', renderServerSideApp);

module.exports = app;

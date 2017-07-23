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
const port = process.env.PORT || 3000;

app.use(compression());
app.use(helmet());

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', renderServerSideApp);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server running on http://localhost:${port}`);
});

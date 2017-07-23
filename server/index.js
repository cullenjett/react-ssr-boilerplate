require('babel-core/register')({
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node'
  ]
});

const cluster = require('cluster');
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


// Use the native Node.js cluster module to create a worker processes for each CPU
// -------------------------------------------------------------------------------
if (cluster.isMaster) {
  console.log(`Master pid: ${process.pid}`);

  const cpuCount = require('os').cpus().length;

  for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  app.listen(port, err => {
    if (err) {
      return console.error(err);
    }

    console.info(`Server running on port ${port} -- Worker pid: ${cluster.worker.process.pid}`);
  });
}

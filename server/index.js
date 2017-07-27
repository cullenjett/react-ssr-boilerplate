require('babel-core/register')({
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node'
  ]
});

const cluster = require('cluster');
const app = require('./app').default;

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, (err) => {
    if (err) {
      console.error(err);
    }

    console.log('-----------------------------------------------------------');
    console.log(`⚡️ ⚡️ ⚡️  Dev server running on http://localhost:${port}/  ⚡️ ⚡️ ⚡️`);
    console.log('-----------------------------------------------------------');
  });

  return;
}

// Prod mode: use the native Node.js cluster module to create a worker processes for each CPU
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

/* eslint-disable no-console */
// require('@babel/register')({
//   plugins: [
//     [
//       'css-modules-transform',
//       {
//         camelCase: true,
//         extensions: ['.css', '.scss'],
//         generateScopedName: '[hash:base64]',
//         ignore: '../src/styles'
//       }
//     ],
//     '@babel/plugin-syntax-dynamic-import',
//     'dynamic-import-node'
//   ]
// });

// process.env.NODE_ENV = 'production';
// process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

const cluster = require('cluster');
const Loadable = require('react-loadable');

const { app } = require('./app');

const PORT = process.env.PORT || 3000;

// Use the native Node.js cluster module to create a worker processes for each CPU
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
  Loadable.preloadAll().then(() => {
    app.listen(PORT, err => {
      if (err) {
        return console.error(err);
      }

      console.info(
        `Server running on port ${PORT} -- Worker pid: ${
          cluster.worker.process.pid
        }`
      );
    });
  });
}

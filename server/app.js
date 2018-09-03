import os from 'os';
import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import morgan from 'morgan';
import Loadable from 'react-loadable';
import chalk from 'chalk';

import config from '../config/webpack.config.dev';
import { purgeCacheOnChange } from './purgeCacheOnChange';

const app = express();

if (process.env.PUBLIC_URL === undefined) {
  throw new Error(
    chalk.red(
      `process.env.PUBLIC_URL must be defined. Did you copy .env_SAMPLE to .env?`
    )
  );
}

app.use(compression());
app.use(helmet());

function toMb(bytes) {
  return Math.floor(bytes / 1024 / 1024);
}

app.get('/system', (req, res) => {
  const processMem = process.memoryUsage();
  const stats = {
    memory: {
      system: {
        free: toMb(os.freemem()),
        total: toMb(os.totalmem())
      },
      process: {
        rss: toMb(processMem.rss),
        heapTotal: toMb(processMem.heapTotal),
        heapUsed: toMb(processMem.heapUsed)
      }
    },
    loadavg: os.loadavg(),
    cpuCount: os.cpus().length,
    uptime: {
      system: Math.floor(os.uptime()),
      process: Math.floor(process.uptime())
    }
  };

  res.json(stats);
});

app.use(
  process.env.PUBLIC_URL,
  express.static(path.join(__dirname, '../build'), {
    maxage: '30 days'
  })
);

app.use(
  process.env.PUBLIC_URL,
  express.static(path.join(__dirname, '../public'), {
    maxage: '30 days'
  })
);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      publicPath: config.output.publicPath,
      progress: true,
      stats: {
        colors: true,
        assets: true,
        chunks: false,
        modules: false,
        hash: false
      }
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 4000
    })
  );

  purgeCacheOnChange(path.join(__dirname, '../'));
}

app.use(morgan('tiny'));

app.get('*', (req, res) => {
  const renderServerSideApp = require('./renderServerSideApp').default;

  Loadable.preloadAll().then(() => {
    renderServerSideApp(req, res);
  });
});

export default app;

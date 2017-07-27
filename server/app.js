import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../config/webpack.config.dev';
import renderServerSideApp from './renderServerSideApp';

const app = express();

app.use(compression());
app.use(helmet());

app.use(express.static(path.join(__dirname, '../build')));

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    progress: true,
    stats: {
      colors: true,
      assets: true,
      chunks: false
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    // Node 8.1.0 has a 5 sec keepAlive timeout, so HMR breaks without this
    heartbeat: 4000
  }));
}

app.get('*', renderServerSideApp);

export default app;

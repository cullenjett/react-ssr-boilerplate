import path from 'path';
import express from 'express';
import shrinkRay from 'shrink-ray';
import helmet from 'helmet';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import morgan from 'morgan';

import config from '../config/webpack.config.dev';
import renderServerSideApp from './renderServerSideApp';

const app = express();

app.use(shrinkRay());
app.use(helmet());

app.use(express.static(path.join(__dirname, '../build')));

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);

  app.use(express.static(path.join(__dirname, '../public')));

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      publicPath: config.output.publicPath,
      progress: true,
      stats: {
        colors: true,
        assets: true,
        modules: false,
        chunks: false
      }
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 4000
    })
  );
}

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

app.get('*', renderServerSideApp);

export default app;

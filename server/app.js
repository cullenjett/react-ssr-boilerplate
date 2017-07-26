import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

import renderServerSideApp from './renderServerSideApp';

const app = express();

app.use(compression());
app.use(helmet());

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', renderServerSideApp);

export default app;

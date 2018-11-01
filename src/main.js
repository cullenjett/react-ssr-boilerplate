import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './App';
import configureStore from './utils/configureStore';

import './styles/index.scss';

const store = configureStore(window.__INITIAL_STATE__);

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
});

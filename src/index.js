import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import configureStore from './utils/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// import registerServiceWorker from './utils/registerServiceWorker';
// registerServiceWorker();

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

const configureStore = (initialState, options = { logger: true }) => {
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production' && options.logger) {
    const { createLogger } = require('redux-logger');
    const logger = createLogger({ collapsed: true });
    middleware.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
};

export default configureStore;

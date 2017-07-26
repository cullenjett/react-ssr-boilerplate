import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
  return store;
};

export default configureStore;

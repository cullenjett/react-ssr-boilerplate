import { combineReducers } from 'redux';

const accessToken = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        ...action.session.access_token
      };
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        ...action.session.user
      };
    default:
      return state;
  }
};

const session = combineReducers({
  accessToken,
  user
});

export default session;

// SELECTORS
// ================================================
export const selectCurrentUser = state => {
  return state.user;
};

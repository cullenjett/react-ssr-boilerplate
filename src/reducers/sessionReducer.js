import { combineReducers } from 'redux';

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
  user
});

export default session;

// SELECTORS
// ================================================
export const selectCurrentUser = state => {
  return state.session.user;
};

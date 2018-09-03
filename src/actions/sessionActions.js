// Here we're mimicing an async action creator
export const createSession = user => dispatch => {
  return new Promise(resolve => {
    setTimeout(() => {
      dispatch({
        type: 'CREATE_SESSION',
        session: {
          user
        }
      });

      resolve();
    }, 500);
  });
};

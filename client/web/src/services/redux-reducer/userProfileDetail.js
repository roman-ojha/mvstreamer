const initialState = {};

const setUserProfileDetail = (state = initialState, action) => {
  if (action.type === "userProfileDetail") {
    return action.payload;
  } else {
    return state;
  }
};

export default setUserProfileDetail;

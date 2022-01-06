const initialState = {};

const userProfileDetail = (state = initialState, action) => {
  if (action.type === "userProfileDetail") {
    return action.payload;
  } else {
    return state;
  }
};

export default userProfileDetail;

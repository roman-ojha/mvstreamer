const initialState = document.createElement("video");

const currentVideoReducer = (state = initialState, action) => {
  if (action.type === "currentVideo") {
    state.src = action.payload;
    // return action.payload
  }
  return state;
};

export default currentVideoReducer;

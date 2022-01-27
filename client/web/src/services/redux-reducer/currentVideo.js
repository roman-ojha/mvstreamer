const initialState = document.createElement("video");
initialState.id = "VideoPlayerPage_VideoPlayer";
initialState.className = "VideoPlayer_Field";

const currentVideoReducer = (state = initialState, action) => {
  if (action.type === "currentVideo") {
    state.src = action.payload;
    // return action.payload
  }
  return state;
};

export default currentVideoReducer;

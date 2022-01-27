const initialState = document.createElement("video");
initialState.id = "VideoPlayerPage_VideoPlayer";
initialState.className = "VideoPlayer_Field";

const currentVideoReducer = (state = initialState, action) => {
  // console.log(store.getState());
  if (action.type === "currentVideo") {
    state.src = action.payload;
    // payload would have the source attribute of video element
  }
  return state;
};

export default currentVideoReducer;

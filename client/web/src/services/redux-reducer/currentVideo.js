const initialState = document.createElement("video");
initialState.id = "VideoPlayerPage_VideoPlayer";
initialState.className = "VideoPlayer_Field";
// initialState.setAttribute("onClick", () => {
//   console.log("hello");
// });

const currentVideoReducer = (state = initialState, action) => {
  // console.log(store.getState());
  if (action.type === "currentVideo") {
    state.pause();
    state.src = action.payload;
    state.play();
    // payload would have the source attribute of video element
  }
  return state;
};

export default currentVideoReducer;

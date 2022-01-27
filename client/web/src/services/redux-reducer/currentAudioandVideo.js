const audioInitState = new Audio();

export const currentAudioReducer = (state = audioInitState, action) => {
  if (action.type === "currentAudio") {
    state.pause();
    // pause previoulsy playing audio then play the new one
    action.payload.play();
    // playing the audio while state change
    return action.payload;
  }
  return state;
};

const videoInitState = document.createElement("video");
videoInitState.id = "VideoPlayerPage_VideoPlayer";
videoInitState.className = "VideoPlayer_Field";

export const currentVideoReducer = (state = videoInitState, action) => {
  if (action.type === "currentVideo") {
    audioInitState.pause();
    state.src = action.payload;
    // payload would have the source attribute of video element
  }
  return state;
};

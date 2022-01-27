const audioInitState = new Audio();

const currentAudioReducer = (state = audioInitState, action) => {
  if (action.type === "currentAudio") {
    state.pause();
    // pause previoulsy playing audio then play the new one
    action.payload.play();
    // playing the audio while state change
    return action.payload;
  }

  return state;
};

export default currentAudioReducer;

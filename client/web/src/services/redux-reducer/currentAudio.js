const initialstate = new Audio();

const currentAudioReducer = (state = initialstate, action) => {
  if (action.type === "currentAudio") {
    action.payload.play();
    // playing the audio while state change
    return action.payload;
  }
  return state;
};

export default currentAudioReducer;

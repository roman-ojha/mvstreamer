const initialstate = new Audio();

const currentAudioReducer = (state = initialstate, action) => {
  if (action.type === "currentAudio") {
    return action.payload;
  }
  return state;
};

export default currentAudioReducer;

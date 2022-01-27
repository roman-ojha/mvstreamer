import store from "../redux-store/store";
export const setUserProfileDetail = (value) => {
  return {
    type: "userProfileDetail",
    payload: value,
  };
};

export const setHomePageSongsDetail = (value) => {
  return {
    type: "homePageSongsDetail",
    payload: value,
  };
};

export const currentAudioAction = (value) => {
  const videoInstance = store.getState().currentVideoReducer;
  videoInstance.pause();
  return {
    type: "currentAudio",
    payload: value,
  };
};

export const currentVideoAction = (value) => {
  const audioInstance = store.getState().currentAudioReducer;
  audioInstance.pause();
  return {
    type: "currentVideo",
    payload: value,
  };
};

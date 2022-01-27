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
  return {
    type: "currentAudio",
    payload: value,
  };
};

export const currentVideoAction = (value) => {
  return {
    type: "currentVideo",
    payload: value,
  };
};

import { combineReducers } from "redux";
import userProfileDetail from "./userProfileDetail";
import homePageSongsDetail from "./homePageSongsDetail";
import currentAudioReducer from "./currentAudio";
import currentVideoReducer from "./currentVideo";

const rootReducer = combineReducers({
  userProfileDetail,
  homePageSongsDetail,
  currentAudioReducer,
  currentVideoReducer,
});

export default rootReducer;

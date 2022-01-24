import { combineReducers } from "redux";
import userProfileDetail from "./userProfileDetail";
import homePageSongsDetail from "./homePageSongsDetail";
import currentAudioReducer from "./currentAudio";

const rootReducer = combineReducers({
  userProfileDetail,
  homePageSongsDetail,
  currentAudioReducer,
});

export default rootReducer;

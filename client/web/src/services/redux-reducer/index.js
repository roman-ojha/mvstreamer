import { combineReducers } from "redux";
import userProfileDetail from "./userProfileDetail";
import homePageSongsDetail from "./homePageSongsDetail";
import {
  currentAudioReducer,
  currentVideoReducer,
} from "./currentAudioandVideo";
// import currentVideoReducer from "./currentVideo";

const rootReducer = combineReducers({
  userProfileDetail,
  homePageSongsDetail,
  currentAudioReducer,
  currentVideoReducer,
});

export default rootReducer;

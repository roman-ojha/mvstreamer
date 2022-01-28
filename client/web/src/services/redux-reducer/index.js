import { combineReducers } from "redux";
import userProfileDetail from "./userProfileDetail";
import homePageSongsDetail from "./homePageSongsDetail";
import currentAudioReducer from "./currentAudio";
import currentVideoReducer from "./currentVideo";
import filePageFolderTreeReducer from "./filePageFolderTree";

const rootReducer = combineReducers({
  userProfileDetail,
  homePageSongsDetail,
  currentAudioReducer,
  currentVideoReducer,
  filePageFolderTreeReducer,
});

export default rootReducer;

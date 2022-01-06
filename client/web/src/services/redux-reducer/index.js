import { combineReducers } from "redux";
import userProfileDetail from "./userProfileDetail";
import homePageSongDetail from "./homePageSongsDetail";

const rootReducer = combineReducers({
  userProfileDetail,
  homePageSongDetail,
});

export default rootReducer;

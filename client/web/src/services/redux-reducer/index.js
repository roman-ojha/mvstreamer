import { combineReducers } from "redux";
import userProfileDetail from "./userProfileDetail";
import homePageSongsDetail from "./homePageSongsDetail";

const rootReducer = combineReducers({
  userProfileDetail,
  homePageSongsDetail,
});

export default rootReducer;

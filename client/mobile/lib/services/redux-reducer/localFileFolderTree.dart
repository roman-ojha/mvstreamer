import '../redux-actions/actions.dart';

List localFileFolderTreeReducer(List state, dynamic action) {
  if (action is LocalFileFolderTreeAction) {
    return action.payload[0].subFolder[0].subFolder[0].subFolder;
    // here we are returning 0/ directory from the android
  }
  return state;
}

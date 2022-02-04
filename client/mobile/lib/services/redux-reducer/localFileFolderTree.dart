import '../redux-actions/actions.dart';

Object localFileFolderTreeReducer(Object state, dynamic action) {
  if (action is LocalFileFolderTreeAction) {
    return action.payload;
  }
  return state;
}

import '../redux-actions/actions.dart';

List localFileFolderTreeReducer(List state, dynamic action) {
  if (action is LocalFileFolderTreeAction) {
    print(action.payload);
    return action.payload;
  }
  return state;
}

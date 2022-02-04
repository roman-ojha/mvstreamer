// ignore_for_file: file_names
import '../redux-actions/actions.dart';

int navigationBarIndexReducer(int state, dynamic action) {
  if (action is CurrentNavBarIndexAction) {
    return action.index;
  }
  return state;
}

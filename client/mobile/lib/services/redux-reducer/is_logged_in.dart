import '../redux-actions/actions.dart';

bool isLoggedInReducer(bool state, dynamic action) {
  if (action is IsLoggedInAction) {
    return action.payload;
  }
  return state;
}

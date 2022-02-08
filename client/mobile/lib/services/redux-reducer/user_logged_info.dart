import '../redux-actions/actions.dart';

Map userLoggedInfoReducer(Map state, dynamic action) {
  if (action is UserLoggedInfoAction) {
    return action.payload;
  }
  return state;
}

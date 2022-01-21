// ignore_for_file: file_names

import 'package:android_ios/services/app_state.dart';
import '../redux-actions/actions.dart';

AppState navigationBarIndexReducer(AppState state, dynamic action) {
  if (action is CurrentNavBarIndexAction) {
    return AppState(currentNavigationBarIndex: action.index);
  }
  return state;
}

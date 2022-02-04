import 'package:android_ios/services/redux-actions/actions.dart';

class AppState {
  // This store the app State
  int currentNavigationBarIndex;
  List localFileFolderTree;
  AppState(
      {this.currentNavigationBarIndex = 4, required this.localFileFolderTree});
  AppState.initialState()
      : currentNavigationBarIndex = 4,
        localFileFolderTree = [];
}

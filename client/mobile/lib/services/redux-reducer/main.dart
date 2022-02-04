import 'package:android_ios/services/app_state.dart';
import 'localFileFolderTree.dart';
import 'navigationBarIndexReducer.dart';
import '../app_state.dart';

AppState appStateReducer(AppState state, dynamic action) {
  return AppState(
      currentNavigationBarIndex:
          navigationBarIndexReducer(state.currentNavigationBarIndex, action),
      localFileFolderTree:
          localFileFolderTreeReducer(state.localFileFolderTree, action));
}

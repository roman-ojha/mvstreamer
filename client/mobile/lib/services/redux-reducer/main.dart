import 'package:android_ios/services/app_state.dart';
import '../app_state.dart';
import 'local_file_folder_tree.dart';
import 'navigationBarIndexReducer.dart';
import 'is_logged_in.dart';

AppState appStateReducer(AppState state, dynamic action) {
  return AppState(
    currentNavigationBarIndex:
        navigationBarIndexReducer(state.currentNavigationBarIndex, action),
    localFileFolderTree:
        localFileFolderTreeReducer(state.localFileFolderTree, action),
    isLoggedIn: isLoggedInReducer(state.isLoggedIn, action),
  );
}

class AppState {
  // This store the app State
  int currentNavigationBarIndex;
  List localFileFolderTree;
  AppState(
      {this.currentNavigationBarIndex = 0, required this.localFileFolderTree});
  AppState.initialState()
      : currentNavigationBarIndex = 0,
        localFileFolderTree = [];
}

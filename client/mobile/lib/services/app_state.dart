class AppState {
  // This store the app State
  int currentNavigationBarIndex;
  Object localFileFolderTree;
  AppState(
      {this.currentNavigationBarIndex = 4, required this.localFileFolderTree});
  AppState.initialState()
      : currentNavigationBarIndex = 4,
        localFileFolderTree = [];
}

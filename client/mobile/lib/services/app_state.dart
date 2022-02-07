class AppState {
  // This store the app State
  int currentNavigationBarIndex;
  List localFileFolderTree;
  bool isLoggedIn;
  AppState({
    this.currentNavigationBarIndex = 0,
    required this.localFileFolderTree,
    this.isLoggedIn = false,
  });
  AppState.initialState()
      : currentNavigationBarIndex = 0,
        localFileFolderTree = [],
        isLoggedIn = false;
}

class AppState {
  // This store the app State
  int currentNavigationBarIndex;
  List localFileFolderTree;
  Map userLoggedInfo;
  AppState({
    this.currentNavigationBarIndex = 0,
    required this.localFileFolderTree,
    required this.userLoggedInfo,
  });
  AppState.initialState()
      : currentNavigationBarIndex = 0,
        localFileFolderTree = [],
        userLoggedInfo = {"isLoggedIn": true, "from": "", "withOutAuth": false};
}

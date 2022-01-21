class AppState {
  // This store the app State
  int currentNavigationBarIndex;
  AppState({this.currentNavigationBarIndex = 0});
  AppState.initialState() : currentNavigationBarIndex = 0;
}

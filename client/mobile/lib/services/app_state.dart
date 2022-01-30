class AppState {
  // This store the app State
  int currentNavigationBarIndex;
  AppState({this.currentNavigationBarIndex = 4});
  AppState.initialState() : currentNavigationBarIndex = 4;
}

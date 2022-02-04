import 'package:redux/redux.dart';
import '../app_state.dart';
import '../redux-reducer/main.dart';

class ReduxStore {
  final Store<AppState> store = Store<AppState>(
    appStateReducer,
    initialState: AppState.initialState(),
  );
}

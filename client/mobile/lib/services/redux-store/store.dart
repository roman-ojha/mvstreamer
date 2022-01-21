import '../redux-reducer/navigationBarIndexReducer.dart';
import 'package:redux/redux.dart';
import '../app_state.dart';

class ReduxStore {
  final Store<AppState> store = Store<AppState>(
    navigationBarIndexReducer,
    initialState: AppState.initialState(),
  );
}

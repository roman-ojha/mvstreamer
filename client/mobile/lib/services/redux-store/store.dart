import '../redux-reducer/reducers.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import '../app_state.dart';

class ReduxStoresss {
  final Store<AppState> store = Store<AppState>(
    navigationBarIndexReducer,
    initialState: AppState.initialState(),
  );
}

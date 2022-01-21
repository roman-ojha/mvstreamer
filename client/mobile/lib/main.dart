import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'screens/main_page.dart';
import "package:flutter/services.dart";
import 'services/redux-store/store.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  // SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
  //   // statusBarColor: Colors.transparent,
  //   systemNavigationBarColor: Colors.transparent,
  // ));
  await dotenv.load(fileName: ".env");
  runApp(const MVstreamer());
}

class MVstreamer extends StatelessWidget {
  const MVstreamer({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final _store = ReduxStore();
    return MaterialApp(
      theme: ThemeData(
        appBarTheme: const AppBarTheme(
          systemOverlayStyle: SystemUiOverlayStyle(
            // Styling status bar
            statusBarColor: Color.fromRGBO(0, 0, 0, 0.8),
            statusBarIconBrightness: Brightness.light,
          ),
          // systemOverlayStyle: SystemUiOverlayStyle.dark,
        ),
      ),
      title: 'MVstreamer',
      home: StoreProvider(
        store: _store.store,
        child: const MainPage(),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}

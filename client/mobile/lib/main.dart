import 'package:flutter/material.dart';
import 'screens/login.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'screens/mainPage.dart';
import 'screens/MusicPlayer.dart';
import "package:flutter/services.dart";

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
      // home: const LoginPage(),
      home: MainPage(),
      // home: MusicPlayer(),
      debugShowCheckedModeBanner: false,
    );
  }
}

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
  await dotenv.load(fileName: ".env");
  runApp(const MVstreamer());
}

class MVstreamer extends StatelessWidget {
  const MVstreamer({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'MVstreamer',
      // home: LoginPage(),
      // home: MainPage(),
      home: MusicPlayer(),
      debugShowCheckedModeBanner: false,
    );
  }
}

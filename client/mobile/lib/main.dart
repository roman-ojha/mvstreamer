import 'package:flutter/material.dart';
import 'screens/login.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'screens/main_page.dart';
import 'screens/music_player.dart';
import "package:flutter/services.dart";
import 'screens/video_player_screen.dart';

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
      // home: MainPage(),
      // home: MusicPlayer(),
      home: const VideoPlayerScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

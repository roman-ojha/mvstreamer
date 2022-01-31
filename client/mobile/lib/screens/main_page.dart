// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../widgets/buttom_nav_player.dart';
import "package:flutter/services.dart";
import "package:dio/dio.dart";
import "../models/environment.dart";
import '../services/app_state.dart';
import 'home_screen.dart';
import 'music_screen.dart';
import 'video_screen.dart';
import 'setting_screen.dart';
import 'file_screen.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  Dio dio = Dio();
  final apiBaseUrl = Environment.apiBaseUrl;
  void initState() {
    super.initState();
    setPotraitMode();
    // SystemChrome.setEnabledSystemUIMode(
    //   SystemUiMode.manual,
    //   overlays: [SystemUiOverlay.top],
    // );
    // getSongsData();
  }

  Future getSongsData() async {
    final resData = await dio.get(apiBaseUrl);
    final data = await resData.data;
    final songs = data["songs"];
  }

  Future setPotraitMode() async {
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitDown,
      DeviceOrientation.portraitUp,
    ]);
  }

  Widget navigatingBody() {
    return StoreConnector<AppState, int>(
      // accessing redux store
      converter: (store) => store.state.currentNavigationBarIndex,
      builder: (context, int currentNavigationBarIndex) {
        // building widget according to navigationbar index update
        switch (currentNavigationBarIndex) {
          case 0:
            // Home
            return const HomeScreen();
          case 1:
            // Music Screen
            return const MusicScreen();
          case 2:
            return const SettingScreen();
          case 3:
            return const VideoScreen();
          case 4:
            return const FileScreen();
          default:
            return Container();
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 0,
      ),
      body: Stack(
        children: [
          navigatingBody(),
          Transform.translate(
            offset: Offset(
              0,
              MediaQuery.of(context).size.height - 149,
            ),
            child: const ButtomNavPlayer(),
          ),
        ],
      ),
    );
  }
}

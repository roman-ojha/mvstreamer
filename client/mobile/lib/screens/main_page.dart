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
import '../services/cache_services.dart';
import 'login.dart';
import '../services/redux-actions/actions.dart';

class MainPage extends StatefulWidget {
  MainPage({Key? key}) : super(key: key);

  // Future<bool> _isLoggedIn = CacheServices().isLoggedIn();
  // Future<bool> _isLoggedIn() async {
  //   return
  // }
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  Dio dio = Dio();
  final apiBaseUrl = Environment.apiBaseUrl;

  @override
  void initState() {
    super.initState();
    setPotraitMode();
    // SystemChrome.setEnabledSystemUIMode(
    //   SystemUiMode.manual,
    //   overlays: [SystemUiOverlay.top],
    // );
    // getSongsData();
  }

  updateLogin() async {
    StoreProvider.of<AppState>(context).dispatch(
      IsLoggedInAction(await CacheServices().isLoggedIn()),
    );
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

  Widget mainPage() {
    return Stack(
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
    );
  }

  @override
  Widget build(BuildContext context) {
    updateLogin();
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 0,
      ),
      // body: FutureBuilder<bool>(
      //   future: widget._isLoggedIn,
      //   builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
      //     if (snapshot.hasData) {
      //       final bool isLoggedIn = snapshot.data!;
      //       if (isLoggedIn) {
      //         // if user is logged in showing main page
      //         return mainPage();
      //       } else {
      //         // else showing loginPage;
      //         return const LoginPage();
      //       }
      //     } else {
      //       return Scaffold(
      //         body: Container(),
      //       );
      //       // showing container until
      //     }
      //   },
      // ),
      body: StoreConnector<AppState, bool>(
        converter: (store) => store.state.isLoggedIn,
        builder: (context, bool isLoggedIn) {
          if (isLoggedIn) {
            return mainPage();
          } else {
            return const LoginPage();
          }
        },
      ),
    );
  }
}

// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../widgets/app_bar.dart';
import '../widgets/buttom_nav_player.dart';
import '../widgets/carousel_slider.dart';
import '../widgets/min_player.dart';
import '../widgets/scroll_songs.dart';
import "package:flutter/services.dart";
import "package:dio/dio.dart";
import "../models/environment.dart";
import '../services/app_state.dart';

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

  Widget NavigatingBody() {
    return StoreConnector<AppState, int>(
        converter: (store) => store.state.currentNavigationBarIndex,
        builder: (context, int currentNavigationBarIndex) {
          switch (currentNavigationBarIndex) {
            case 0:
              return ListView(
                children: const [
                  Carousel(),
                  ScrollSongs(),
                  ScrollSongs(),
                  SizedBox(
                    height: 120,
                  )
                ],
              );
            // const MVAppBar(),
            case 1:
              return Container();
            case 2:
              return Container();
            case 3:
              return Container();
            case 4:
              return Container();
            default:
              return Container();
          }
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 0,
      ),
      body: Stack(
        children: [
          NavigatingBody(),
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

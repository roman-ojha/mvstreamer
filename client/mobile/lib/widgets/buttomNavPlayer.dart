import 'package:flutter/material.dart';
import 'buttomNavigationBar.dart';
import 'miniPlayer.dart';
import 'minPlayer.dart';

class ButtomNavPlayer extends StatefulWidget {
  const ButtomNavPlayer({Key? key}) : super(key: key);

  @override
  _ButtomNavPlayerState createState() => _ButtomNavPlayerState();
}

class _ButtomNavPlayerState extends State<ButtomNavPlayer> {
  @override
  Widget build(BuildContext context) {
    return Container(
      // height: 200,
      color: Colors.transparent,
      child: Stack(
        // fit: StackFit.loose,
        // clipBehavior: Clip.none,
        alignment: AlignmentDirectional.bottomCenter,
        // clipBehavior: Clip.antiAlias,
        // mainAxisAlignment: MainAxisAlignment.end,
        children: const [
          Padding(
            padding: EdgeInsets.only(bottom: 45),
            child: MinPlayer(),
          ),
          // MiniPlayer(),
          ButtomNavigationBarWidget(),
        ],
      ),
    );
    // return Positioned(
    //   bottom: 0,
    //   child: Container(
    //     width: 100,
    //     height: 100,
    //     decoration: BoxDecoration(
    //       color: Colors.white,
    //       borderRadius: BorderRadius.circular(100),
    //       border: Border.all(width: 100, color: Colors.transparent),
    //     ),
    //   ),
    // );
  }
}

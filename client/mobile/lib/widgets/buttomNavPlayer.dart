import 'package:flutter/material.dart';
import 'buttomNavigationBar.dart';
import 'miniPlayer.dart';

class ButtomNavPlayer extends StatefulWidget {
  const ButtomNavPlayer({Key? key}) : super(key: key);

  @override
  _ButtomNavPlayerState createState() => _ButtomNavPlayerState();
}

class _ButtomNavPlayerState extends State<ButtomNavPlayer> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      // fit: StackFit.loose,
      clipBehavior: Clip.none,
      alignment: AlignmentDirectional.center,
      children: const [
        Positioned(
          height: 450,
          width: 450,
          bottom: -310,
          child: MiniPlayer(),
        ),
        ButtomNavigationBarWidget(),
      ],
    );
  }
}

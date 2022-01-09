import 'package:flutter/material.dart';
import 'buttomNavigationBar.dart';
import 'miniPlayer.dart';
import 'appBar02.dart';

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
            child: Test(),
          ),
          ButtomNavigationBarWidget(),
        ],
      ),
    );
  }
}

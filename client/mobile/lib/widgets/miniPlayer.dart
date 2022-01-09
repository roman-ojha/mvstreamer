import 'package:flutter/material.dart';
import '../assets/icons/mini_player_icons.dart';

class MiniPlayer extends StatefulWidget {
  const MiniPlayer({Key? key}) : super(key: key);

  @override
  _MiniPlayerState createState() => _MiniPlayerState();
}

class _MiniPlayerState extends State<MiniPlayer> {
  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 0.8,
      heightFactor: 0.4,
      child: Container(
        // padding: const EdgeInsets.only(
        //   top: 17,
        // ),
        alignment: Alignment.topCenter,
        decoration: BoxDecoration(
          borderRadius: const BorderRadius.all(
            Radius.circular(250),
          ),
          // color: Colors.red,
          border: Border.all(
            width: 5.5,
            color: const Color(0xffB92E22),
          ),
        ),
        child: Row(
          children: const [
            SizedBox(
              width: 125,
            ),
            Icon(
              MiniPlayerIcon.previous,
              size: 45,
              color: Color(0xff236FD1),
            ),
            SizedBox(
              width: 20,
            ),
            Image(
              image: AssetImage(
                'assets/icons/playIcon.png',
              ),
              width: 55,
            ),
            SizedBox(
              width: 20,
            ),
            Icon(
              MiniPlayerIcon.next,
              size: 45,
              color: Color(0xffB92E22),
            ),
          ],
        ),
      ),
    );
  }
}

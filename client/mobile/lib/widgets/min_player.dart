import 'package:flutter/material.dart';
import '../assets/icons/mini_player_icons.dart';

class MinPlayer extends StatefulWidget {
  const MinPlayer({Key? key}) : super(key: key);

  @override
  _MinPlayerState createState() => _MinPlayerState();
}

class _MinPlayerState extends State<MinPlayer> {
  @override
  Widget build(BuildContext context) {
    return ClipPath(
      child: FractionallySizedBox(
        widthFactor: 0.9,
        child: Container(
          height: 80,
          color: Colors.white,
          // child: const Text("Hello"),
          // color: Colors.black12,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(
                MiniPlayerIcon.previous,
                size: 40,
                color: Color(0xff236FD1),
              ),
              SizedBox(
                width: 10,
              ),
              Image(
                image: AssetImage(
                  'assets/icons/playIcon.png',
                ),
                width: 50,
              ),
              SizedBox(
                width: 10,
              ),
              Icon(
                MiniPlayerIcon.next,
                size: 40,
                color: Color(0xffB92E22),
              ),
            ],
          ),
        ),
      ),
      clipper: MiniPlayerClipper(),
    );
  }
}

class MiniPlayerClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0, size.height);
    path.lineTo(0, size.height);
    path.quadraticBezierTo(size.width / 4, 0, size.width / 2, 0);
    path.quadraticBezierTo(
        size.width - size.width / 4, 0, size.width, size.height);
    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) {
    return true;
  }
}

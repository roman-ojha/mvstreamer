import 'dart:ui';
import 'package:flutter/material.dart';
import "../assets/icons/music_player_icons.dart";

class MusicPlayer extends StatefulWidget {
  const MusicPlayer({Key? key}) : super(key: key);

  @override
  _MusicPlayerState createState() => _MusicPlayerState();
}

class _MusicPlayerState extends State<MusicPlayer> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/images/Music_Player_Background.png"),
              fit: BoxFit.fitHeight,
              alignment: Alignment.centerRight,
            ),
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 9, sigmaY: 9),
            child: SizedBox(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Padding(
                        child: Icon(
                          MusicPlayerIcon.back,
                          color: Colors.black54,
                        ),
                        padding: EdgeInsets.only(
                          left: 15,
                          top: 5,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(
                          right: 15,
                          top: 5,
                        ),
                        child: CircleAvatar(
                          backgroundImage: AssetImage("assets/images/user.jpg"),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      CircleAvatar(
                        backgroundImage:
                            AssetImage("assets/images/carousel_Image_01.jpg"),
                        radius: 100,
                      )
                    ],
                  ),
                  SizedBox(
                    width: double.infinity,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Text(
                          "Aa Jaane Ki Zid Na Karo",
                          style: TextStyle(
                            fontSize: 19,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "Ariji sing",
                          style: TextStyle(
                            fontSize: 15,
                          ),
                        )
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text(
                          "0:31",
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          "6:31",
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(
                      bottom: 15,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: const [
                        Flexible(
                          flex: 1,
                          fit: FlexFit.loose,
                          child: Icon(
                            MusicPlayerIcon.loop,
                            size: 25,
                            color: Color.fromRGBO(125, 148, 173, 0.70),
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.loose,
                          child: Icon(
                            MusicPlayerIcon.playlist,
                            size: 28,
                            color: Color.fromRGBO(125, 148, 173, 0.70),
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.loose,
                          child: Icon(
                            MusicPlayerIcon.previous,
                            size: 30,
                            color: Color.fromRGBO(25, 117, 210, 0.8),
                          ),
                        ),
                        Flexible(
                          flex: 2,
                          fit: FlexFit.loose,
                          child: Image(
                            image: AssetImage(
                              "assets/images/PlayButton.png",
                            ),
                            width: 75,
                            height: 75,
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.loose,
                          child: Icon(
                            MusicPlayerIcon.next,
                            size: 30,
                            color: Color.fromRGBO(219, 56, 44, 0.8),
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.loose,
                          child: Icon(
                            Icons.favorite,
                            size: 28,
                            color: Color.fromRGBO(188, 126, 121, 0.7),
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.loose,
                          child: Icon(
                            MusicPlayerIcon.random,
                            size: 25,
                            color: Color.fromRGBO(188, 126, 121, 0.7),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

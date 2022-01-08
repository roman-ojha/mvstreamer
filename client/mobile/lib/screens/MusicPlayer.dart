import 'dart:io';
import 'dart:ui';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
// import 'package:http/http.dart';
// import 'package:path_provider/path_provider.dart';
import "../assets/icons/music_player_icons.dart";
import "package:google_fonts/google_fonts.dart";
import "package:audioplayers/audioplayers.dart";

class MusicPlayer extends StatefulWidget {
  const MusicPlayer({Key? key}) : super(key: key);

  @override
  _MusicPlayerState createState() => _MusicPlayerState();
}

class _MusicPlayerState extends State<MusicPlayer> {
  AudioPlayer audioPlayer = AudioPlayer();
  late AudioCache audioCache;
  String audioPath = "music/Music01.mp3";
  bool audioPlaying = false;
  String currentAudioTime = "0:0";
  String audioDuration = "0:0";

  @override
  void initState() {
    super.initState();

    if (kIsWeb) {
      return;
    }
    if (Platform.isIOS) {
      audioCache.fixedPlayer?.notificationService.startHeadlessService();
    }

    audioCache = AudioCache(fixedPlayer: audioPlayer);
    audioPlayer.onPlayerStateChanged.listen((event) {
      // print("hello");
    });

    audioPlayer.onAudioPositionChanged.listen((duration) {
      setState(() {
        int sec = (duration.inSeconds) % 60;
        int min = (duration.inSeconds) ~/ 60;
        currentAudioTime = "$min:$sec";
      });
    });

    audioPlayer.onDurationChanged.listen((duration) {
      setState(() {
        int sec = (duration.inSeconds) % 60;
        int min = (duration.inSeconds) ~/ 60;
        audioDuration = "$min:$sec";
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
    audioPlayer.release();
    audioPlayer.dispose();
    audioCache.clearAll();
  }

  playAudio() async {
    // await audioCache.play(audioPath);
    await audioPlayer.play(
        "https://firebasestorage.googleapis.com/v0/b/mvstreamer.appspot.com/o/Audio%2F8578a84b7e52b66e7bdf9ef0c46628da.mp3?alt=media&token=1106944d-0601-4dd2-9c29-1e784ec3b16b");

    // print(audioPlayer.getDuration());
  }

  pauseAudio() async {
    await audioPlayer.pause();
  }

  // Future _loadFile() async {
  //   final bytes = await readBytes(Uri.parse(
  //       "https://firebasestorage.googleapis.com/v0/b/mvstreamer.appspot.com/o/Audio%2F8578a84b7e52b66e7bdf9ef0c46628da.mp3?alt=media&token=1106944d-0601-4dd2-9c29-1e784ec3b16b"));
  //   final dir = await getApplicationDocumentsDirectory();
  //   final file = File('${dir.path}/audio.mp3');

  //   await file.writeAsBytes(bytes);
  //   if (file.existsSync()) {
  //     setState(() => audioPath = file.path);
  //   }
  // }

  // Future<int> _getDuration() async {
  //   final uri = await audioCache.load(
  //       "https://firebasestorage.googleapis.com/v0/b/mvstreamer.appspot.com/o/Audio%2F8578a84b7e52b66e7bdf9ef0c46628da.mp3?alt=media&token=1106944d-0601-4dd2-9c29-1e784ec3b16b");
  //   await audioPlayer.setUrl(uri.toString());
  //   final audioDuration = audioPlayer.getDuration();
  //   return audioDuration;
  // }

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
                  SizedBox(
                    width: double.infinity,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Aaj Jaane Ki Zid Na Karo",
                          style: GoogleFonts.libreFranklin(
                            fontSize: 20,
                            fontWeight: FontWeight.w600,
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                        Text(
                          "Ariji sing",
                          style: GoogleFonts.libreFranklin(
                            fontSize: 15,
                          ),
                        )
                      ],
                    ),
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
                  Padding(
                    padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          (currentAudioTime),
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        // FutureBuilder(
                        //   // For audio total duration
                        //   future: _getDuration(),
                        //   builder: (BuildContext context,
                        //       AsyncSnapshot<int> snapshot) {
                        //     switch (snapshot.connectionState) {
                        //       case ConnectionState.none:
                        //         return const Text("0:0");
                        //       case ConnectionState.active:
                        //         return const Text("0:0");
                        //       case ConnectionState.waiting:
                        //         return const Text("0:0");
                        //       case ConnectionState.done:
                        //         if (snapshot.hasData) {
                        //           int duration = snapshot.data!;
                        //           int audioDurationMin = duration ~/ 1000 ~/ 60;
                        //           int audioDurationSec = duration ~/ 1000 % 60;
                        //           // getting audio duration in min and second
                        //           return Text(
                        //             "$audioDurationMin:$audioDurationSec",
                        //           );
                        //         } else {
                        //           return const Text("0:0");
                        //         }
                        //     }
                        //   },
                        // ),
                        Text(
                          (audioDuration),
                          style: const TextStyle(
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
                      children: [
                        const Icon(
                          MusicPlayerIcon.loop,
                          size: 25,
                          color: Color.fromRGBO(125, 148, 173, 0.70),
                        ),
                        const Icon(
                          MusicPlayerIcon.previous,
                          size: 30,
                          color: Color.fromRGBO(25, 117, 210, 0.8),
                        ),
                        audioPlaying
                            ? IconButton(
                                icon: const Image(
                                  image: AssetImage(
                                      "assets/images/PauseButton.png"),
                                ),
                                iconSize: 70,
                                onPressed: () {
                                  pauseAudio();
                                  setState(() {
                                    audioPlaying = false;
                                  });
                                },
                              )
                            : IconButton(
                                icon: const Image(
                                  image: AssetImage(
                                      "assets/images/PlayButton.png"),
                                ),
                                onPressed: () {
                                  playAudio();
                                  setState(() {
                                    audioPlaying = true;
                                  });
                                },
                                iconSize: 70,
                              ),
                        const Icon(
                          MusicPlayerIcon.next,
                          size: 30,
                          color: Color.fromRGBO(219, 56, 44, 0.8),
                        ),
                        const Icon(
                          Icons.favorite,
                          size: 28,
                          color: Color.fromRGBO(188, 126, 121, 0.7),
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

import 'dart:io';
import 'dart:ui';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
// import 'package:http/http.dart';
// import 'package:path_provider/path_provider.dart';
import "../assets/icons/music_player_icons.dart";
import "package:google_fonts/google_fonts.dart";
import "package:audioplayers/audioplayers.dart";

final _fullProgressBar = GlobalKey();

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
  int? audioDurationInSec;
  double? progressPercentage = 0.0;
  double? _currentTapPosition;
  double? _totalProgressBarLenght;
  double? _tapPositionPercentage;

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
        progressPercentage =
            ((duration.inSeconds / audioDurationInSec!) * 100) / 100;
      });
    });
    audioPlayer.onDurationChanged.listen((duration) {
      setState(() {
        audioDurationInSec = duration.inSeconds;
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
    await audioPlayer.play(
        "https://firebasestorage.googleapis.com/v0/b/mvstreamer.appspot.com/o/Audio%2F8578a84b7e52b66e7bdf9ef0c46628da.mp3?alt=media&token=1106944d-0601-4dd2-9c29-1e784ec3b16b");
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
                    // Upper App Bar ====================================================
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Padding(
                        child: Icon(
                          MusicPlayerIcon.back,
                          color: Colors.black54,
                        ),
                        padding: EdgeInsets.only(
                          left: 15,
                          top: 15,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(
                          right: 15,
                          top: 15,
                        ),
                        child: CircleAvatar(
                          backgroundImage: AssetImage("assets/images/user.jpg"),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    // Title and Artist Name =================================================
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
                  Flexible(
                    // Middle Circle Avatar & Volume Controller =======================================================
                    child: FractionallySizedBox(
                      heightFactor: 0.6,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Column(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const CircleAvatar(
                                backgroundImage: AssetImage(
                                    "assets/images/carousel_Image_01.jpg"),
                                radius: 110,
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: const [
                                  Icon(
                                    MusicPlayerIcon.playlist,
                                    size: 28,
                                    color: Color.fromRGBO(125, 148, 173, 0.70),
                                  ),
                                  SizedBox(
                                    width: 30.0,
                                  ),
                                  Icon(
                                    Icons.favorite_rounded,
                                    size: 28,
                                    color: Color.fromRGBO(188, 126, 121, 0.7),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          width: 30.0,
                          alignment: Alignment.centerRight,
                          child: Text(
                            (currentAudioTime),
                            style: const TextStyle(
                              fontWeight: FontWeight.w600,
                            ),
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

                        Flexible(
                          // Progress bar =====================================================================
                          child: Stack(
                            alignment: AlignmentDirectional.centerStart,
                            children: [
                              FractionallySizedBox(
                                widthFactor: 0.9,
                                child: Container(
                                  height: 4.0,
                                  decoration: const BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment.centerLeft,
                                      end: Alignment.centerRight,
                                      stops: [0.0, 1.0],
                                      colors: [
                                        Color.fromRGBO(35, 110, 209, 0.30),
                                        Color.fromRGBO(255, 60, 0, 0.30)
                                      ],
                                    ),
                                    borderRadius: BorderRadius.all(
                                      Radius.circular(2.0),
                                    ),
                                  ),
                                ),
                              ),
                              Stack(
                                alignment: AlignmentDirectional.centerEnd,
                                children: [
                                  FractionallySizedBox(
                                    widthFactor: progressPercentage,
                                    child: AnimatedContainer(
                                      duration:
                                          const Duration(microseconds: 200),
                                      height: 8.0,
                                      decoration: const BoxDecoration(
                                        gradient: LinearGradient(
                                          begin: Alignment.centerLeft,
                                          end: Alignment.centerRight,
                                          stops: [0.0, 1.0],
                                          colors: [
                                            Color.fromRGBO(35, 111, 209, 1),
                                            Color.fromRGBO(255, 61, 0, 1)
                                          ],
                                        ),
                                        borderRadius: BorderRadius.all(
                                          Radius.circular(4.0),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Container(
                                    height: 18.0,
                                    width: 18.0,
                                    decoration: BoxDecoration(
                                      color:
                                          const Color.fromRGBO(180, 49, 8, 1),
                                      border: Border.all(
                                          width: 2,
                                          color: const Color.fromRGBO(
                                              233, 233, 233, 0.986)),
                                      borderRadius: const BorderRadius.all(
                                        Radius.circular(9.0),
                                      ),
                                    ),
                                  )
                                ],
                              ),
                              GestureDetector(
                                // detecting on tap event on progress bar
                                // to detect use tap event we need the size of progress bar bigger and trasparent so that real progress bar can be visible and gesturedetector will also work
                                key: _fullProgressBar,
                                child: FractionallySizedBox(
                                  widthFactor: 0.9,
                                  child: Container(
                                    height: 20.0,
                                    color: Colors.transparent,
                                  ),
                                ),
                                onPanUpdate: (position) {
                                  _currentTapPosition =
                                      position.localPosition.dx;
                                  _totalProgressBarLenght = _fullProgressBar
                                      .currentContext!.size!.width;
                                  _tapPositionPercentage =
                                      _currentTapPosition! /
                                          _totalProgressBarLenght!;
                                  if (_tapPositionPercentage! >= 1.0) {
                                    _tapPositionPercentage = 1.0;
                                  }
                                  audioPlayer.seek(
                                    Duration(
                                        seconds: (audioDurationInSec! *
                                                _tapPositionPercentage!)
                                            .toInt()),
                                  );
                                },
                              )
                            ],
                          ),
                        ),
                        Container(
                          width: 30.0,
                          alignment: Alignment.centerLeft,
                          child: Text(
                            (audioDuration),
                            style: const TextStyle(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    // Bottoms Bar Buttons =========================================================
                    padding: const EdgeInsets.only(
                      bottom: 30,
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
                          MusicPlayerIcon.random,
                          size: 23,
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

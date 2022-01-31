// https://docs.flutter.dev/cookbook/plugins/play-video
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:video_player/video_player.dart';
import '../assets/icons/music_player_icons.dart';
import 'package:google_fonts/google_fonts.dart';

final _fullProgressBar = GlobalKey();

class VideoPlayerScreen extends StatefulWidget {
  const VideoPlayerScreen({Key? key}) : super(key: key);

  @override
  _VideoPlayerScreenState createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late VideoPlayerController _controller;
  // late Future<void> _initializeVideoPlayerFuture;

  String currentVideoTime = "0:0";
  String videoDuration = "0:0";
  int? videoDurationInSec;
  double? progressPercentage = 0.0;
  double? _currentTapPosition;
  double? _totalProgressBarLenght;
  double? _tapPositionPercentage;

  // Controller bool value
  bool _videoPlaying = true;
  bool _videoLoop = false;
  bool _videoRandom = false;
  bool _videoFaviorate = false;
  bool _videoPlaylist = false;

  bool _showControllers = true;

  final _totalPercentageWidthOfProgressBar = 0.9;
  // final _totalPercentageHeightOfVolumeController = 0.5;

  final _buttonRedColor = const Color.fromRGBO(219, 56, 44, 0.8);
  final _buttonBlueColor = const Color.fromRGBO(25, 117, 210, 0.8);

  String deviceOrientations = "landscape";

  @override
  void initState() {
    _controller = VideoPlayerController.network(
        "https://firebasestorage.googleapis.com/v0/b/mvstreamer.appspot.com/o/Lakshya_-_Title_Track___Hrithik_Roshan.mp4?alt=media&token=d2d93db3-6893-46cf-8911-232ce081b01b")
      ..addListener(() => setState(() {}))
      ..setLooping(true)
      ..initialize().then((value) => _controller.play());
    // _initializeVideoPlayerFuture = _controller.initialize();

    super.initState();
    setLandScapMode();

    _controller.addListener(() {
      setState(() {
        // Setting current time and progressbar of the video
        int csec = (_controller.value.position.inSeconds) % 60;
        int cmin = (_controller.value.position.inSeconds) ~/ 60;
        currentVideoTime = "$cmin:$csec";
        videoDurationInSec = _controller.value.duration.inSeconds;
        int dsec = (_controller.value.duration.inSeconds) % 60;
        int dmin = (_controller.value.duration.inSeconds) ~/ 60;
        videoDuration = "$dmin:$dsec";
        progressPercentage =
            (_controller.value.position.inSeconds / videoDurationInSec!);
        if (progressPercentage! <= 0) {
          progressPercentage = 0;
        } else if (progressPercentage! >= _totalPercentageWidthOfProgressBar) {
          progressPercentage = _totalPercentageWidthOfProgressBar;
        }
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
    if (!_showControllers) {
      SystemChrome.setEnabledSystemUIMode(
        SystemUiMode.manual,
        overlays: SystemUiOverlay.values,
      );
    }
  }

  Future setLandScapMode() async {
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeRight,
      DeviceOrientation.landscapeLeft,
    ]);
  }

  Future setPotraitMode() async {
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitDown,
      DeviceOrientation.portraitUp,
    ]);
  }

  void hideStatusBar() {
    SystemChrome.setEnabledSystemUIMode(
      SystemUiMode.manual,
      overlays: [SystemUiOverlay.bottom],
    );
  }

  playVideo() {
    _controller.play();
  }

  pauseVideo() {
    _controller.pause();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          color: Colors.black,
          alignment: Alignment.center,
          child: _controller != null && _controller.value.isInitialized
              // playing video after it get initialized
              ? buildVideoPlayer()
              : const SizedBox(
                  height: 200,
                  child: Center(
                    child: CircularProgressIndicator(),
                  ),
                ),
        ),
      ),
    );
  }

  Widget buildVideoPlayer() {
    return SizedBox(
      height: double.infinity,
      width: double.infinity,
      child: Stack(
        alignment: Alignment.center,
        children: [
          AspectRatio(
            aspectRatio: _controller.value.aspectRatio,
            child: GestureDetector(
              child: VideoPlayer(_controller),
              onTap: () {
                setState(() {
                  _showControllers = !_showControllers;
                });
                if (!_showControllers) {
                  hideStatusBar();
                }
              },
            ),
          ),
          if (_showControllers)
            // Showing the controller and hiding according to video tap
            Positioned(
              top: deviceOrientations == "landscape" ? 5 : 25,
              child: videoInfoContainer(),
            ),
          if (_showControllers)
            Positioned(
              // Position of video controller
              bottom: deviceOrientations == "landscape" ? 10 : 50,
              child: videoController(),
            ),
        ],
      ),
    );
  }

  Widget videoInfoContainer() {
    return Container(
      width: deviceOrientations == "potrait"
          ? MediaQuery.of(context).size.width - 50
          : MediaQuery.of(context).size.width - 250,
      height: 55.0,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.85),
        borderRadius: BorderRadius.circular(15),
      ),
      alignment: Alignment.center,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          GestureDetector(
            child: const Icon(
              MusicPlayerIcon.back,
              size: 20,
              color: Colors.black54,
            ),
            onTap: () {
              Navigator.of(context).pop();
            },
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text("Kavhi Khusi Kavhi Gam",
                  style: GoogleFonts.libreFranklin(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                  )),
              Text("Sonu Nigam",
                  style: GoogleFonts.libreFranklin(
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                  ))
            ],
          ),
          GestureDetector(
            child: const Icon(Icons.screen_rotation_rounded),
            onTap: () {
              if (deviceOrientations == "potrait") {
                setLandScapMode();
                deviceOrientations = "landscape";
              } else {
                setPotraitMode();
                deviceOrientations = "potrait";
              }
            },
          ),
          const CircleAvatar(
            backgroundImage: AssetImage("assets/images/user.jpg"),
          )
        ],
      ),
    );
  }

  Widget videoController() {
    return Container(
      height: 95,
      width: MediaQuery.of(context).size.width - 80,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.85),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          const SizedBox(
            height: 5,
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
                    currentVideoTime,
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Flexible(
                  // Progress bar =====================================================================
                  child: Stack(
                    alignment: AlignmentDirectional.centerStart,
                    children: [
                      FractionallySizedBox(
                        widthFactor: _totalPercentageWidthOfProgressBar,
                        child: Container(
                          height: 3.0,
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
                              duration: const Duration(microseconds: 200),
                              height: 6.0,
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
                            height: 14.0,
                            width: 14.0,
                            decoration: BoxDecoration(
                              color: const Color.fromRGBO(180, 49, 8, 1),
                              border: Border.all(
                                width: 2,
                                color:
                                    const Color.fromRGBO(233, 233, 233, 0.986),
                              ),
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
                          widthFactor: 0.8,
                          child: Container(
                            height: 20.0,
                            color: Colors.transparent,
                          ),
                        ),
                        onPanUpdate: (position) {
                          // Calculating the position of use gesture and setting audio time according to that
                          try {
                            _currentTapPosition = position.localPosition.dx;
                            _totalProgressBarLenght =
                                _fullProgressBar.currentContext!.size!.width;
                            _tapPositionPercentage = (_currentTapPosition! /
                                    _totalProgressBarLenght!) *
                                0.9;
                            // NOTE: because total width factor of progress bar is 0.9 so we have to get the value from 0.0 to 0.9 as the total percentage of the tappositionpercentage
                            if (_tapPositionPercentage! >=
                                _totalPercentageWidthOfProgressBar) {
                              _tapPositionPercentage =
                                  _totalPercentageWidthOfProgressBar;
                            }
                            _controller.seekTo(
                              Duration(
                                  seconds: (videoDurationInSec! *
                                          (_tapPositionPercentage! * 1.1))
                                      .toInt()),
                            );
                          } catch (err) {
                            //
                          }
                        },
                      )
                    ],
                  ),
                ),
                Container(
                  width: 30.0,
                  alignment: Alignment.centerLeft,
                  child: Text(
                    videoDuration,
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 5.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                GestureDetector(
                  child: Icon(
                    MusicPlayerIcon.loop,
                    size: 22,
                    color: _videoLoop
                        ? _buttonBlueColor
                        : const Color.fromRGBO(125, 148, 173, 0.70),
                  ),
                  onTap: () {
                    setState(() {
                      _videoLoop = !_videoLoop;
                      if (_videoRandom) {
                        _videoRandom = false;
                      }
                    });
                  },
                ),
                if (deviceOrientations == "landscape")
                  GestureDetector(
                    // Showing this widget if screen is in landscape mode
                    child: Icon(
                      MusicPlayerIcon.playlist,
                      size: 25.0,
                      color: _videoPlaylist
                          ? _buttonBlueColor
                          : const Color.fromRGBO(125, 148, 173, 0.70),
                    ),
                    onTap: () {
                      setState(() {
                        _videoPlaylist = !_videoPlaylist;
                      });
                    },
                  ),
                Icon(MusicPlayerIcon.previous,
                    size: 25, color: _buttonBlueColor),
                _videoPlaying
                    ? GestureDetector(
                        child: const Image(
                          image: AssetImage(
                            "assets/images/PauseButton.png",
                          ),
                          width: 55,
                          height: 55,
                        ),
                        onTap: () {
                          pauseVideo();
                          setState(() {
                            _videoPlaying = false;
                          });
                        },
                      )
                    : GestureDetector(
                        child: const Image(
                          image: AssetImage("assets/images/PlayButton.png"),
                          width: 55,
                          height: 55,
                        ),
                        onTap: () {
                          playVideo();
                          setState(() {
                            _videoPlaying = true;
                          });
                        },
                      ),
                Icon(MusicPlayerIcon.next, size: 25, color: _buttonRedColor),
                if (deviceOrientations == "landscape")
                  GestureDetector(
                    // Showing this widget if screen is in landscape mode
                    child: Icon(
                      Icons.favorite_rounded,
                      size: 30.0,
                      color: _videoFaviorate
                          ? _buttonRedColor
                          : const Color.fromRGBO(188, 126, 121, 0.7),
                    ),
                    onTap: () {
                      setState(() {
                        _videoFaviorate = !_videoFaviorate;
                      });
                    },
                  ),
                GestureDetector(
                  child: Icon(
                    MusicPlayerIcon.random,
                    size: 22,
                    color: _videoRandom
                        ? _buttonRedColor
                        : const Color.fromRGBO(188, 126, 121, 0.7),
                  ),
                  onTap: () {
                    setState(() {
                      _videoRandom = !_videoRandom;
                      if (_videoLoop) {
                        _videoLoop = false;
                      }
                    });
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

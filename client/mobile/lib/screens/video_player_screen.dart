// https://docs.flutter.dev/cookbook/plugins/play-video

import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class VideoPlayerScreen extends StatefulWidget {
  const VideoPlayerScreen({Key? key}) : super(key: key);

  @override
  _VideoPlayerScreenState createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late VideoPlayerController _controller;
  // late Future<void> _initializeVideoPlayerFuture;

  @override
  void initState() {
    _controller = VideoPlayerController.network(
        "https://firebasestorage.googleapis.com/v0/b/mvstreamer.appspot.com/o/Lakshya_-_Title_Track___Hrithik_Roshan.mp4?alt=media&token=d2d93db3-6893-46cf-8911-232ce081b01b")
      ..addListener(() => setState(() {}))
      ..setLooping(true)
      ..initialize().then((value) => _controller.play());
    // _initializeVideoPlayerFuture = _controller.initialize();

    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
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
              // : const SizedBox(
              //     height: 200,
              //     child: Center(
              //       child: CircularProgressIndicator(),
              //     ),
              //   ),
              : buildVideoPlayer(),
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
            child: VideoPlayer(_controller),
          ),
          Positioned(
            bottom: 30,
            child: videoController(),
          ),
        ],
      ),
    );
  }

  Widget videoController() {
    return Container(
      height: 80,
      width: MediaQuery.of(context).size.width - 80,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          SizedBox(
            height: 7,
          ),
          Padding(
            padding: const EdgeInsets.only(left: 8.0, right: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: 30.0,
                  alignment: Alignment.centerRight,
                  child: const Text(
                    "0:0",
                    style: TextStyle(
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
                            widthFactor: 0.5,
                            child: AnimatedContainer(
                              duration: const Duration(microseconds: 200),
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
                              color: const Color.fromRGBO(180, 49, 8, 1),
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
                        child: FractionallySizedBox(
                          widthFactor: 0.8,
                          child: Container(
                            height: 20.0,
                            color: Colors.transparent,
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                Container(
                  width: 30.0,
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    "0:0",
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

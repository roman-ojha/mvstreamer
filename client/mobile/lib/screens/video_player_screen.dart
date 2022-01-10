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
      body: Container(
        width: double.infinity,
        height: double.infinity,
        // color: Colors.black,
        alignment: Alignment.center,
        child: _controller != null && _controller.value.isInitialized
            // playing video after it get initialized
            ? AspectRatio(
                aspectRatio: _controller.value.aspectRatio,
                child: buildVideoPlayer(),
              )
            : const SizedBox(
                height: 200,
                child: Center(
                  child: CircularProgressIndicator(),
                ),
              ),
      ),
    );
  }

  Widget buildVideoPlayer() {
    return VideoPlayer(_controller);
  }
}

import 'package:flutter/material.dart';
import '../widgets/app_bar.dart';
import '../widgets/carousel_slider.dart';
import '../widgets/scroll_songs.dart';

class MusicScreen extends StatefulWidget {
  const MusicScreen({Key? key}) : super(key: key);

  @override
  _MusicScreenState createState() => _MusicScreenState();
}

class _MusicScreenState extends State<MusicScreen> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ListView(
          children: const [
            Carousel(),
            ScrollSongs(),
            ScrollSongs(),
            SizedBox(
              height: 120,
            )
          ],
        ),
        const MVAppBar(),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import '../widgets/app_bar.dart';
import '../widgets/carousel_slider.dart';
import '../widgets/scroll_songs.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

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

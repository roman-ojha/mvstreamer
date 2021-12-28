// ignore_for_file: file_names

import 'package:flutter/material.dart';
import '../widgets/appBar.dart';
import '../widgets/buttomNavPlayer.dart';
import '../widgets/carouselSlider.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: const [
          MVAppBar(),
          Carousel(),
        ],
      ),
      bottomNavigationBar: const ButtomNavPlayer(),
    );
  }
}

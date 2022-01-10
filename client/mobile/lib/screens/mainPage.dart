// ignore_for_file: file_names

import 'dart:ffi';

import 'package:flutter/material.dart';
import '../widgets/appBar.dart';
import '../widgets/buttomNavPlayer.dart';
import '../widgets/carouselSlider.dart';
import '../widgets/minPlayer.dart';
import "../widgets/scrollSongs.dart";

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 0,
      ),
      body: Stack(
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
          Transform.translate(
            offset: Offset(
              0,
              MediaQuery.of(context).size.height - 149,
            ),
            child: const ButtomNavPlayer(),
          ),
        ],
      ),
    );
  }
}

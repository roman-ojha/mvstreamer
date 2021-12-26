// ignore_for_file: file_names

import 'package:flutter/material.dart';
import '../widgets/appBar.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: MVAppBar(),
    );
  }
}

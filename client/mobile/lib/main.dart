import 'package:flutter/material.dart';
import 'screens/login.dart';

void main() {
  runApp(const MVstreamer());
}

class MVstreamer extends StatelessWidget {
  const MVstreamer({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'MVstreamer',
      home: LoginPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

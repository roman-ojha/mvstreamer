import 'package:flutter/material.dart';
import 'screens/login.dart';
import 'screens/app_login/google_login_page.dart';

void main() {
  runApp(const MVstreamer());
}

class MVstreamer extends StatelessWidget {
  const MVstreamer({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MVstreamer',
      // home: LoginPage(),
      home: GoogleLoginPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

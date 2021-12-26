import 'package:flutter/material.dart';
import '../assets/icons/login_button_icon_icons.dart';
import '../controller/google_login_controller.dart';
import 'package:get/get.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  Color facebookColor = const Color.fromRGBO(19, 93, 189, 100);
  Color googleColor = const Color.fromRGBO(239, 96, 84, 100);

  ButtonStyle buttonStyle = ButtonStyle(
    backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
    ),
  );

  final controller = Get.put(GoogleLoginController());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            stops: [
              0,
              1,
            ],
            colors: [
              Color(0xff5c59ce),
              Color(0xe3f45e6f),
            ],
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Image(
              image: AssetImage('assets/images/App_Icon.png'),
              height: 140,
            ),
            const SizedBox(
              height: 20.0,
            ),
            const Text(
              "Sign In",
              style: TextStyle(
                fontSize: 30,
              ),
            ),
            const SizedBox(
              height: 20.0,
            ),
            SizedBox(
              width: 220.0,
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(
                  LoginButtonIcon.github_icon,
                  color: Colors.black,
                ),
                label: const Padding(
                  padding: EdgeInsets.fromLTRB(15.0, 0, 50.0, 0),
                  child: Text(
                    "GitHub",
                    style: TextStyle(color: Colors.black, fontSize: 20.0),
                  ),
                ),
                style: buttonStyle,
              ),
            ),
            const SizedBox(
              height: 5.0,
            ),
            SizedBox(
              width: 220.0,
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: Icon(
                  LoginButtonIcon.facebook_icon,
                  color: facebookColor,
                ),
                // #1877f2
                label: Padding(
                  padding: const EdgeInsets.fromLTRB(15.0, 0, 25.0, 0),
                  child: Text(
                    "Facebook",
                    style: TextStyle(color: facebookColor, fontSize: 20.0),
                  ),
                ),
                style: buttonStyle,
              ),
            ),
            const SizedBox(
              height: 5.0,
            ),
            SizedBox(
              width: 220.0,
              child: ElevatedButton.icon(
                onPressed: () {
                  controller.login();
                },
                icon: Image.asset(
                  'assets/icons/google_icon.png',
                  width: 20.0,
                ),
                label: Padding(
                  padding: const EdgeInsets.fromLTRB(15.0, 0, 50.0, 0),
                  child: Text(
                    "Google",
                    style: TextStyle(color: googleColor, fontSize: 20.0),
                  ),
                ),
                style: buttonStyle,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

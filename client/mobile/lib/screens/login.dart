import 'dart:async';
import 'package:flutter/material.dart';
import '../assets/icons/login_button_icon_icons.dart';
import '../api/google_signin_api.dart';
import 'package:fluttertoast/fluttertoast.dart';
import '../services/cache_services.dart';
import '../services/auth_services.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../services/redux-actions/actions.dart';
import '../services/app_state.dart';
import '../constant/constant.dart';
import '../api/facebook_signin_api.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late FToast fToast;

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

  @override
  void initState() {
    super.initState();
    fToast = FToast();
    fToast.init(context);
  }

  Future _googleSignin() async {
    final user = await GoogleSignApi().login();
    // sending user data into backend
    if (user != null) {
      final res = await AuthService().saveGoogleUser(
        id: user.id,
        name: user.displayName,
        email: user.email,
        picture: user.photoUrl,
      );
      // saving token to the cache memory
      CacheServices().saveToken(token: res.data["accessToken"]);
      CacheServices().loggedIn(loggedIn: true);
      StoreProvider.of<AppState>(context).dispatch(
        IsLoggedInAction(true),
      );
    }
  }

  Future _withoutSignin() async {
    CacheServices().saveToken(token: "");
    CacheServices().loggedIn(loggedIn: true);
    StoreProvider.of<AppState>(context).dispatch(
      IsLoggedInAction(true),
    );
  }

  Future _githubSignin() async {
    // right now this service is not avilable
    Fluttertoast.showToast(
      msg: "Sorry!!, right now this service is not avilable...",
      gravity: ToastGravity.TOP,
      timeInSecForIosWeb: 3,
      backgroundColor: Constant().toastBackgroundColor,
      textColor: Colors.black87,
      fontSize: 15.0,
    );
  }

  Future _facebookSignin() async {
    final user = await FacebookSigninApi().login();
    if (user != null) {
      // backend work
    }
  }

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
              image: AssetImage('assets/icons/App_Icon.png'),
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
                onPressed: _githubSignin,
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
                onPressed: _facebookSignin,
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
                onPressed: _googleSignin,
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
            TextButton(
              onPressed: _withoutSignin,
              child: const Text(
                "Enter witout Signin",
                style: TextStyle(
                  color: Color(0xff5c59ce),
                  fontSize: 15.0,
                  fontWeight: FontWeight.w400,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

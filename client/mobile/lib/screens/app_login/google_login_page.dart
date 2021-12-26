import 'package:android_ios/screens/app_login/google_login_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../login.dart';
import '../mainPage.dart';

class GoogleLoginPage extends StatelessWidget {
  final controller = Get.put(GoogleLoginController());

  GoogleLoginPage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (controller.googleAccount.value == null) {
        return const LoginPage();
      } else {
        return const MainPage();
      }
    });
  }
}

import 'package:dio/dio.dart';
import '../models/environment.dart';
import 'package:fluttertoast/fluttertoast.dart';
import '../constant/constant.dart';
import 'package:flutter/material.dart';

// this content the application login or authetication services
class AuthService {
  Dio dio = Dio();
  final apiBaseUrl = Environment.apiBaseUrl;
  errorToast() {
    Fluttertoast.showToast(
      msg: "SomeThing went Wrong!!!, Please Try again letter",
      gravity: ToastGravity.TOP,
      timeInSecForIosWeb: 2,
      backgroundColor: Constant().toastBackgroundColor,
      textColor: Colors.black87,
      fontSize: 15.0,
    );
  }

  saveGoogleUser({name, gmail, picture, id}) async {
    var data = {"name": name, "gmail": gmail, "picture": picture, "id": id};
    try {
      return await dio.post(
        "$apiBaseUrl/m/google/signIn",
        data: data,
        options: Options(
          contentType: Headers.formUrlEncodedContentType,
        ),
      );
      // ignore: unused_catch_clause
    } on DioError catch (e) {
      errorToast();
    }
  }

  saveFacebookUser({name, id, picture}) async {
    var data = {"name": name, "id": id, "picture": picture};
    try {
      return await dio.post(
        "$apiBaseUrl/m/facebook/SignIn",
        data: data,
        options: Options(
          contentType: Headers.formUrlEncodedContentType,
        ),
      );
      // ignore: unused_catch_clause
    } on DioError catch (e) {
      errorToast();
    }
  }
}

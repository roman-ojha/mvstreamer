import 'package:dio/dio.dart';
import '../models/environment.dart';
import 'package:fluttertoast/fluttertoast.dart';
import '../constant/constant.dart';
import 'package:flutter/material.dart';

// this content the application login or authetication services
class AuthService {
  Dio dio = Dio();
  final apiBaseUrl = Environment.apiBaseUrl;
  saveGoogleUser({name, email, picture, id}) async {
    var data = {"name": name, "email": email, "picture": picture, "id": id};
    try {
      return await dio.post(
        "$apiBaseUrl/signIn",
        data: data,
        options: Options(
          contentType: Headers.formUrlEncodedContentType,
        ),
      );
      // ignore: unused_catch_clause
    } on DioError catch (e) {
      Fluttertoast.showToast(
        msg: "SomeThing went Wrong!!!, Please Try again letter",
        gravity: ToastGravity.TOP,
        timeInSecForIosWeb: 2,
        backgroundColor: Constant().toastBackgroundColor,
        textColor: Colors.black87,
        fontSize: 15.0,
      );
    }
  }
}

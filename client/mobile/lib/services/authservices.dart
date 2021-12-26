import 'package:dio/dio.dart';

// this content the application login or authetication services
class AuthService {
  Dio dio = Dio();

  auth({name, email, picture, id}) async {
    var data = {"name": name, "email": email, "picture": picture, "id": id};
    try {
      return await dio.post(
        "http://10.0.2.2:8080/auth",
        data: data,
        options: Options(
          contentType: Headers.formUrlEncodedContentType,
        ),
      );
    } on DioError catch (e) {
      print(e);
    }
  }
}

import 'package:dio/dio.dart';
import '../models/environment.dart';

// this content the application login or authetication services
class AuthService {
  Dio dio = Dio();
  final apiBaseUrl = Environment.apiBaseUrl;
  auth({name, email, picture, id}) async {
    var data = {"name": name, "email": email, "picture": picture, "id": id};
    try {
      return await dio.post(
        "$apiBaseUrl/signIn",
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

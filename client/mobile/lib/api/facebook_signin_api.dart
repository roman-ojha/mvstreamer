import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';

class FacebookSigninApi {
  Future login() async {
    await FacebookAuth.instance.login(permissions: ["public_profile", "email"]);
    final userData = await FacebookAuth.instance.getUserData();
    return userData;
  }

  Future<void> logout() async {
    await FacebookAuth.instance.logOut();
  }
}

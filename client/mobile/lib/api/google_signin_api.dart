import 'package:google_sign_in/google_sign_in.dart';

class GoogleSignApi {
  final _googleSignin = GoogleSignIn();
  Future<GoogleSignInAccount?> login() => _googleSignin.signIn();
  // here this function return "GoogleSignInAccount" which content information of user
  Future<GoogleSignInAccount?> logout() => _googleSignin.signOut();
}

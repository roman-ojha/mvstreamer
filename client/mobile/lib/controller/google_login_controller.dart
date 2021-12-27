import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../services/authservices.dart';
import '../services/cacheServices.dart';

class GoogleLoginController extends GetxController {
  final _googleSignin = GoogleSignIn();
  var googleAccount = Rx<GoogleSignInAccount?>(null);
  login() async {
    googleAccount.value = await _googleSignin.signIn();
    // print(googleAccount.value);
    // sending user data into backend
    final res = await AuthService().signIn(
      id: googleAccount.value?.id,
      name: googleAccount.value?.displayName,
      email: googleAccount.value?.email,
      picture: googleAccount.value?.photoUrl,
    );
    // saving token to the cache memory
    CacheServices().saveToken(token: res.data["accessToken"]);

    return res.data["success"];
    // here we are returning the loggin success just to check for the navigation
  }
}

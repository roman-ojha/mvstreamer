import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../services/authservices.dart';

class GoogleLoginController extends GetxController {
  final _googleSignin = GoogleSignIn();
  var googleAccount = Rx<GoogleSignInAccount?>(null);
  login() async {
    googleAccount.value = await _googleSignin.signIn();
    // print(googleAccount.value);
    // sending user data into backend
    AuthService()
        .auth(
          id: googleAccount.value?.id,
          name: googleAccount.value?.displayName,
          email: googleAccount.value?.email,
          picture: googleAccount.value?.photoUrl,
        )
        .then(
          (data) => {print(data)},
        );
  }
}

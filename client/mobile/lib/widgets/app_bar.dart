import 'package:flutter/material.dart';
import '../assets/icons/search_icon.dart';
import '../api/google_signin_api.dart';
import '../services/cache_services.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../services/redux-actions/actions.dart';
import '../services/app_state.dart';
import '../api/facebook_signin_api.dart';

class MVAppBar extends StatefulWidget {
  const MVAppBar({Key? key}) : super(key: key);

  @override
  _MVAppBarState createState() => _MVAppBarState();
}

class _MVAppBarState extends State<MVAppBar> {
  Future _userLogout() async {
    // Writing logic for logout in here for right now
    final userLoginInfo = await CacheServices().getUserLoginInfo();
    if (userLoginInfo["from"] == "google") {
      // google user logout
      await GoogleSignApi().logout();
    } else if (userLoginInfo["from"] == "facebook") {
      // facebook user logout
      await FacebookSigninApi().logout();
    }
    CacheServices().saveToken(token: "");
    CacheServices()
        .setUserLoginInfo(isLoggedIn: false, from: "", withOutAuth: false);
    StoreProvider.of<AppState>(context).dispatch(UserLoggedInfoAction(
        {"isLoggedIn": false, "from": "", "withOutAuth": false}));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
        top: 7,
        bottom: 7,
      ),
      width: double.infinity,
      decoration: const BoxDecoration(
          // color: ,
          gradient: LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          Color.fromRGBO(0, 0, 0, 0.1),
          Color.fromRGBO(0, 0, 0, 0),
        ],
        stops: [0.0, 1.0],
      )),
      child: Row(
        children: [
          const SizedBox(
            width: 10,
          ),
          const Image(
            image: AssetImage("assets/icons/App_Icon.png"),
            width: 45,
          ),
          const SizedBox(
            width: 10,
          ),
          const Text(
            "MV",
            style: TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const Text(
            "Streamer",
            style: TextStyle(
              color: Colors.white,
              fontSize: 11,
            ),
          ),
          const SizedBox(
            width: 20,
          ),
          Flexible(
            // Search Bar ==========================================
            child: Container(
              height: 45.0,
              decoration: const BoxDecoration(
                color: Colors.transparent,
              ),
              child: TextFormField(
                keyboardType: TextInputType.name,
                style: const TextStyle(
                  fontSize: 17.0,
                  color: Colors.white,
                  fontWeight: FontWeight.w500,
                ),
                cursorColor: Colors.white,
                cursorHeight: 20,
                textAlign: TextAlign.start,
                decoration: InputDecoration(
                  filled: true,
                  fillColor: const Color.fromRGBO(212, 212, 212, 0.4),
                  contentPadding: const EdgeInsets.only(
                    top: 0.0,
                    bottom: 0.0,
                    right: 20.0,
                  ),
                  alignLabelWithHint: true,
                  hintText: "Search..",
                  hintStyle: const TextStyle(
                    color: Colors.white,
                    fontSize: 17.0,
                    fontWeight: FontWeight.w700,
                  ),
                  prefixIcon: const Padding(
                    padding: EdgeInsets.only(left: 9.0),
                    child: Icon(
                      SearchIcon.search_icon,
                      color: Colors.white,
                      size: 25,
                    ),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(
                      width: 0.0,
                      color: Colors.transparent,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(
                      color: Colors.transparent,
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(
            width: 10.0,
          ),
          GestureDetector(
            child: const CircleAvatar(
              backgroundImage: AssetImage('assets/images/user.jpg'),
              maxRadius: 21,
            ),
            onTap: _userLogout,
          ),
          const SizedBox(
            width: 10.0,
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import '../assets/icons/search_icon.dart';

class MVAppBar extends StatefulWidget {
  const MVAppBar({Key? key}) : super(key: key);

  @override
  _MVAppBarState createState() => _MVAppBarState();
}

class _MVAppBarState extends State<MVAppBar> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        color: Color.fromRGBO(0, 0, 0, 100),
      ),
      child: Padding(
        padding: const EdgeInsets.only(top: 30, bottom: 10),
        child: Row(
          children: [
            const SizedBox(
              width: 10,
            ),
            const Image(
              image: AssetImage("assets/icons/App_Icon.png"),
              width: 50,
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
              child: Container(
                height: 50.0,
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
                    fillColor: const Color.fromRGBO(212, 212, 212, 0.3),
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
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(25),
                      borderSide: const BorderSide(
                        color: Colors.transparent,
                      ),
                      gapPadding: 10.0,
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(25),
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
            const CircleAvatar(
              backgroundImage: AssetImage('assets/images/user.jpg'),
              maxRadius: 25,
            ),
            const SizedBox(
              width: 10.0,
            ),
          ],
        ),
      ),
    );
  }
}

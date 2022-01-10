import 'package:flutter/material.dart';
import 'songCard.dart';
import "package:google_fonts/google_fonts.dart";

class ScrollSongs extends StatefulWidget {
  const ScrollSongs({Key? key}) : super(key: key);

  @override
  _ScrollSongsState createState() => _ScrollSongsState();
}

class _ScrollSongsState extends State<ScrollSongs> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: 10,
        bottom: 10,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(
              left: 20,
            ),
            child: Text(
              "Music :",
              style: GoogleFonts.libreFranklin(
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: const <Widget>[
                SongCard(),
                SongCard(),
                SongCard(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../screens/music_player.dart';

class SongCard extends StatefulWidget {
  const SongCard({Key? key}) : super(key: key);

  @override
  _SongCardState createState() => _SongCardState();
}

class _SongCardState extends State<SongCard> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => const MusicPlayer(),
        ));
      },
      child: Container(
        margin: const EdgeInsets.only(
          left: 10,
          right: 10,
        ),
        decoration: BoxDecoration(
          // color: Colors.red,
          borderRadius: BorderRadius.circular(25),
        ),
        width: 150,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              alignment: Alignment.center,
              children: [
                Container(
                  margin: const EdgeInsets.only(
                    bottom: 5,
                    top: 10,
                  ),
                  width: 150,
                  height: 160,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(25),
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(25),
                    child: const Image(
                      fit: BoxFit.cover,
                      image: NetworkImage(
                        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    bottom: 5,
                    top: 10,
                  ),
                  width: 150,
                  height: 160,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(25),
                    gradient: const RadialGradient(
                      stops: [
                        0.5,
                        1,
                      ],
                      colors: [
                        Colors.transparent,
                        Color(0x59000000),
                      ],
                    ),
                  ),
                ),
                const Icon(
                  Icons.play_circle_fill_rounded,
                  color: Colors.white,
                  size: 35,
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(left: 10.0),
              child: Text(
                "Kavhi Khusi Kavi Gam",
                style: GoogleFonts.libreFranklin(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                ),
                softWrap: false,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            const SizedBox(
              height: 5.0,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 10.0),
              child: Text(
                "Sonu Nigam",
                style: GoogleFonts.libreFranklin(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(
              height: 8.0,
            ),
          ],
        ),
      ),
    );
  }
}

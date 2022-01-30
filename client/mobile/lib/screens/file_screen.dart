import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import '../assets/icons/search_icon.dart';
import '../assets/icons/music_player_icons.dart';

class FileScreen extends StatefulWidget {
  const FileScreen({Key? key}) : super(key: key);

  @override
  _FileScreenState createState() => _FileScreenState();
}

class _FileScreenState extends State<FileScreen> {
  var _gridView = true;
  Color textColor = const Color.fromRGBO(110, 110, 110, 1);
  @override
  Widget build(BuildContext context) {
    // return SizedBox(
    //   width: double.infinity,
    //   child: Column(
    //     children: [
    //       // Navbar ====================================
    //       FractionallySizedBox(
    //         widthFactor: 0.8,
    //         child: Container(
    //           height: 50.0,
    //           margin: const EdgeInsets.only(top: 10.0),
    //           decoration: const BoxDecoration(
    //               gradient: LinearGradient(
    //                 colors: [
    //                   Color.fromRGBO(154, 179, 211, 1),
    //                   Color.fromRGBO(217, 233, 255, 1),
    //                 ],
    //                 stops: [
    //                   0,
    //                   1,
    //                 ],
    //                 begin: Alignment.topCenter,
    //                 end: Alignment.bottomCenter,
    //               ),
    //               borderRadius: BorderRadius.all(Radius.circular(15))),
    //           child: Row(
    //             mainAxisAlignment: MainAxisAlignment.spaceAround,
    //             children: [
    //               const SizedBox(
    //                 width: 10,
    //               ),
    //               Icon(
    //                 MusicPlayerIcon.back,
    //                 size: 20.0,
    //                 color: textColor,
    //               ),
    //               const SizedBox(
    //                 width: 40,
    //               ),
    //               _gridView
    //                   ? GestureDetector(
    //                       child: Icon(
    //                         Icons.grid_view_rounded,
    //                         color: textColor,
    //                         size: 28.0,
    //                       ),
    //                       onTap: () {
    //                         setState(() {
    //                           _gridView = !_gridView;
    //                         });
    //                       },
    //                     )
    //                   : GestureDetector(
    //                       child: Icon(
    //                         Icons.list_rounded,
    //                         color: textColor,
    //                         size: 28.0,
    //                       ),
    //                       onTap: () {
    //                         setState(() {
    //                           _gridView = !_gridView;
    //                         });
    //                       },
    //                     ),
    //               const SizedBox(
    //                 width: 10,
    //               ),
    //               Flexible(
    //                 child: SizedBox(
    //                   height: 35.0,
    //                   child: TextFormField(
    //                     keyboardType: TextInputType.name,
    //                     style: TextStyle(
    //                       fontSize: 14.0,
    //                       color: textColor,
    //                       fontWeight: FontWeight.w500,
    //                     ),
    //                     cursorColor: textColor,
    //                     cursorHeight: 17,
    //                     textAlign: TextAlign.start,
    //                     decoration: InputDecoration(
    //                       filled: true,
    //                       fillColor: const Color.fromRGBO(255, 255, 255, 0.623),
    //                       contentPadding: const EdgeInsets.only(
    //                         left: 0.0,
    //                         top: 0.0,
    //                         bottom: 0.0,
    //                         right: 5.0,
    //                       ),
    //                       alignLabelWithHint: true,
    //                       hintText: "Search..",
    //                       hintStyle: TextStyle(
    //                         color: textColor,
    //                         fontSize: 14.0,
    //                         fontWeight: FontWeight.w700,
    //                       ),
    //                       prefixIcon: Icon(
    //                         SearchIcon.search_icon,
    //                         color: textColor,
    //                         size: 23,
    //                       ),
    //                       enabledBorder: OutlineInputBorder(
    //                         borderRadius: BorderRadius.circular(10),
    //                         borderSide: const BorderSide(
    //                           width: 0.0,
    //                           color: Colors.transparent,
    //                         ),
    //                       ),
    //                       focusedBorder: OutlineInputBorder(
    //                         borderRadius: BorderRadius.circular(10),
    //                         borderSide: const BorderSide(
    //                           color: Colors.transparent,
    //                         ),
    //                       ),
    //                     ),
    //                   ),
    //                 ),
    //               ),
    //               const SizedBox(
    //                 width: 10,
    //               ),
    //               const CircleAvatar(
    //                 backgroundImage: AssetImage(
    //                   "assets/images/user.jpg",
    //                 ),
    //                 maxRadius: 18,
    //               ),
    //               const SizedBox(
    //                 width: 10,
    //               ),
    //             ],
    //           ),
    //         ),
    //       ),
    //       // Folder File View==================================================================

    //     ],
    //   ),
    // );
    return ListView(
      shrinkWrap: true,
      physics: const AlwaysScrollableScrollPhysics(),
      addAutomaticKeepAlives: false,
      children: [
        GridView.builder(
          gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 200,
              childAspectRatio: 3 / 2,
              crossAxisSpacing: 20,
              mainAxisSpacing: 20),
          itemCount: 50,
          shrinkWrap: true,
          itemBuilder: (BuildContext ctx, index) {
            return Container(
              alignment: Alignment.center,
              child: Text("hello"),
              decoration: BoxDecoration(
                  color: Colors.amber, borderRadius: BorderRadius.circular(15)),
            );
          },
        ),
      ],
    );
  }
}

import 'dart:io';
import 'package:flutter/material.dart';
import '../assets/icons/search_icon.dart';
import '../assets/icons/music_player_icons.dart';
import 'package:file_finder/file_finder.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:path/path.dart' as p;

class FileScreen extends StatefulWidget {
  const FileScreen({Key? key}) : super(key: key);

  @override
  _FileScreenState createState() => _FileScreenState();
}

class FileNode {
  final String name;
  final Directory fileDirectory;
  final String type;
  final String extention;
  const FileNode(
      {required this.name,
      required this.fileDirectory,
      required this.type,
      required this.extention});
}

class FolderNode {
  final String name;
  final String type;
  final List? subFolder;
  // ignore: prefer_typing_uninitialized_variables
  var file;
  FolderNode(
      {required this.name,
      required this.type,
      required this.subFolder,
      this.file});
}

class _FileScreenState extends State<FileScreen> {
  var _gridView = true;
  Color textColor = const Color.fromRGBO(110, 110, 110, 1);
  var fileFinder = FileFinder();

  @override
  initState() {
    super.initState();
    _getFileFolder();
  }

  _getFileFolder() async {
    if (Platform.isAndroid) {
      if (await _requestPermission(Permission.storage)) {
        List _audio = fileFinder.findAll("mp3", sort: false);
        List _video = fileFinder.findAll("mp4", sort: false);
        List _files = List.from(_audio)..addAll(_video);
        var head = FolderNode(name: "head", type: "root", subFolder: []);
        for (int fileCount = 0; fileCount < _files.length; fileCount++) {
          File file = _files[fileCount];
          String filePath = file.path;
          var ptr = head;
          List fileDirectory = filePath.split("/");
          final fileExtention = p.extension(filePath);
          for (int fileDirectoryCount = 1;
              fileDirectoryCount < fileDirectory.length;
              fileDirectoryCount++) {
            bool include = false;
            bool isFile = false;
            ptr.subFolder?.map(
              (folder) {
                if (folder.name == fileDirectory[fileDirectoryCount]) {
                  include = true;
                }
              },
            );
            if (fileDirectory[fileDirectoryCount].contains(".")) {
              isFile = true;
            }
            if (!include && !isFile) {
              var node = FolderNode(
                  name: fileDirectory[fileDirectoryCount],
                  type: "folder",
                  subFolder: []);
              ptr.subFolder?.add(node);
            } else if (!include && isFile) {
              var node = FileNode(
                  name: fileDirectory[fileDirectoryCount],
                  fileDirectory: Directory(filePath),
                  type: "file",
                  extention: fileExtention);
              // ptr.subFolder?.add(node);
              ptr.file = node;
            }
            // ignore: prefer_is_empty
            if (ptr.subFolder?.length != 0) {
              var length = ptr.subFolder?.length;
              ptr = ptr.subFolder?[length! - 1];
            }
          }
        }
      }
    } else {
      // This is ios
    }
  }

  Future<bool> _requestPermission(Permission permission) async {
    if (await permission.isGranted) {
      return true;
    } else {
      var result = await permission.request();
      if (result == PermissionStatus.granted) {
        return true;
      } else {
        return false;
      }
    }
  }

  Widget _folder() {
    return InkWell(
      onTap: () {},
      customBorder: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Container(
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(10.0)),
        ),
        child: GestureDetector(
          child: Column(
            children: const [
              Icon(
                Icons.folder,
                size: 70,
                color: Color.fromRGBO(94, 138, 189, 1),
              ),
              Text(
                "Folder Name",
                overflow: TextOverflow.ellipsis,
                style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.w600),
              )
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.topCenter,
      children: [
        // Folder File View==================================================================
        Container(
          padding: const EdgeInsets.only(top: 70.0, left: 10.0, right: 10.0),
          child: GridView.builder(
            scrollDirection: Axis.vertical,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              // maxCrossAxisExtent: 100,
              // childAspectRatio: 1,
              // crossAxisSpacing: 20,
              // mainAxisSpacing: 20,
              crossAxisCount: 3,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
            ),
            itemCount: 50,
            shrinkWrap: true,
            itemBuilder: (BuildContext ctx, index) {
              return _folder();
            },
          ),
        ),

        // Navbar ====================================
        Container(
          width: double.infinity,
          height: 70.0,
          alignment: Alignment.center,
          child: FractionallySizedBox(
            widthFactor: 0.8,
            heightFactor: 0.75,
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Color.fromRGBO(154, 179, 211, 1),
                    Color.fromRGBO(217, 233, 255, 1),
                  ],
                  stops: [
                    0,
                    1,
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
                borderRadius: BorderRadius.all(
                  Radius.circular(15),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  const SizedBox(
                    width: 10,
                  ),
                  Icon(
                    MusicPlayerIcon.back,
                    size: 20.0,
                    color: textColor,
                  ),
                  const SizedBox(
                    width: 40,
                  ),
                  _gridView
                      ? GestureDetector(
                          child: Icon(
                            Icons.grid_view_rounded,
                            color: textColor,
                            size: 28.0,
                          ),
                          onTap: () {
                            setState(() {
                              _gridView = !_gridView;
                            });
                          },
                        )
                      : GestureDetector(
                          child: Icon(
                            Icons.list_rounded,
                            color: textColor,
                            size: 28.0,
                          ),
                          onTap: () {
                            setState(() {
                              _gridView = !_gridView;
                            });
                          },
                        ),
                  const SizedBox(
                    width: 10,
                  ),
                  Flexible(
                    child: SizedBox(
                      height: 35.0,
                      child: TextFormField(
                        keyboardType: TextInputType.name,
                        style: TextStyle(
                          fontSize: 14.0,
                          color: textColor,
                          fontWeight: FontWeight.w500,
                        ),
                        cursorColor: textColor,
                        cursorHeight: 17,
                        textAlign: TextAlign.start,
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: const Color.fromRGBO(255, 255, 255, 0.623),
                          contentPadding: const EdgeInsets.only(
                            left: 0.0,
                            top: 0.0,
                            bottom: 0.0,
                            right: 5.0,
                          ),
                          alignLabelWithHint: true,
                          hintText: "Search..",
                          hintStyle: TextStyle(
                            color: textColor,
                            fontSize: 14.0,
                            fontWeight: FontWeight.w700,
                          ),
                          prefixIcon: Icon(
                            SearchIcon.search_icon,
                            color: textColor,
                            size: 23,
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
                    width: 10,
                  ),
                  const CircleAvatar(
                    backgroundImage: AssetImage(
                      "assets/images/user.jpg",
                    ),
                    maxRadius: 18,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

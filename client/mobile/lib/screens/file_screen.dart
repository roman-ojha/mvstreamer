import 'package:flutter/material.dart';

class FileScreen extends StatefulWidget {
  const FileScreen({Key? key}) : super(key: key);

  @override
  _FileScreenState createState() => _FileScreenState();
}

class _FileScreenState extends State<FileScreen> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      color: Colors.red,
      alignment: Alignment.center,
      child: const Text(
        "File",
        style: TextStyle(fontSize: 50),
      ),
    );
  }
}

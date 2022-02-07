import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:path_provider/path_provider.dart';

class CacheServices {
  late Box box;
  Future saveToken({token}) async {
    // opening box;
    var dir = await getApplicationDocumentsDirectory();
    Hive.init(dir.path);
    box = await Hive.openBox('_tk');

    // putting data;
    await box.clear();
    box.add(token);
    box.close();
  }

  Future loggedIn({loggedIn}) async {
    var dir = await getApplicationDocumentsDirectory();
    Hive.init(dir.path);
    box = await Hive.openBox("loggedIn");
    await box.clear();
    box.add(loggedIn);
    box.close();
  }

  Future<bool> isLoggedIn() async {
    var dir = await getApplicationDocumentsDirectory();
    Hive.init(dir.path);
    box = await Hive.openBox("loggedIn");
    if (box.values.isEmpty) {
      // openning app for the first time
      return false;
    } else {
      return box.values.first;
    }
  }
}

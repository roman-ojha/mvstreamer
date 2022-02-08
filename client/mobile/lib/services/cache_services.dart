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

  Future setUserLoginInfo(
      {required bool isLoggedIn,
      required String from,
      required bool withOutAuth}) async {
    var dir = await getApplicationDocumentsDirectory();
    Hive.init(dir.path);
    // box = await Hive.openBox("loggedIn");
    box = await Hive.openBox("userLoginInfo");
    await box.clear();
    box.add(
        {"isLoggedIn": isLoggedIn, "from": from, "withOutAuth": withOutAuth});
    box.close();
  }

  Future<Map> getUserLoginInfo() async {
    var dir = await getApplicationDocumentsDirectory();
    Hive.init(dir.path);
    box = await Hive.openBox("userLoginInfo");
    if (box.values.isEmpty) {
      // openning app for the first time
      return {"isLoggedIn": false, "from": "", "withOutAuth": false};
    } else {
      return box.values.first;
    }
  }
}

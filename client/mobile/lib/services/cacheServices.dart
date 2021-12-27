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
}

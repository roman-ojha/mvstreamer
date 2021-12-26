import 'package:flutter_dotenv/flutter_dotenv.dart';

class Environment {
  static String get apiBaseUrl {
    return dotenv.env['API_BASE_URL'] ?? "API_BASE_URL not flund";
  }
}

import 'package:shared_preferences/shared_preferences.dart';

class SharedPrefsStorage {
  final prefs = createSharedPrefsStorage();

  SharedPrefsStorage._internal();

  static final _singleton = SharedPrefsStorage._internal();

  factory SharedPrefsStorage() => _singleton;

  static Future<SharedPreferences> createSharedPrefsStorage() async {
    final sharedPrefs = await SharedPreferences.getInstance();
    return sharedPrefs;
  }
}

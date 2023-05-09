import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  final storage = createStorage();

  SecureStorage._internal();

  static final _singleton = SecureStorage._internal();

  factory SecureStorage() => _singleton;

  static FlutterSecureStorage createStorage() {
    const androidOptions = AndroidOptions(
      encryptedSharedPreferences: true,
    );
    const iosOptions = IOSOptions(
      accessibility: KeychainAccessibility.first_unlock,
    );
    const storage = FlutterSecureStorage(
      aOptions: androidOptions,
      iOptions: iosOptions,
    );
    return storage;
  }
}

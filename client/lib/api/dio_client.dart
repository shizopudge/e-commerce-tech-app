import 'package:dio/dio.dart';
import '../constants/global.dart';
import '../constants/repositories.dart';
import 'interceptors.dart';

class DioClient {
  final dio = createDio();

  DioClient._internal();

  static final _singleton = DioClient._internal();

  factory DioClient() => _singleton;

  static Dio createDio() {
    var dio = Dio(BaseOptions(
      baseUrl: Globals.baseUrl,
      receiveTimeout: const Duration(milliseconds: 15000),
      connectTimeout: const Duration(milliseconds: 15000),
      sendTimeout: const Duration(milliseconds: 15000),
    ));

    dio.interceptors.addAll({
      AppInterceptors(
        dio,
        authRepositoryImpl: AppRepositories.authRepositoryImpl,
      ),
    });
    return dio;
  }
}

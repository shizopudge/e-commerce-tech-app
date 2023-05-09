import 'package:dio/dio.dart';

import '../features/auth/data/auth_repository_impl.dart';

class AppInterceptors extends Interceptor {
  final Dio dio;
  final AuthRepositoryImpl _authRepositoryImpl;

  AppInterceptors(this.dio, {required AuthRepositoryImpl authRepositoryImpl})
      : _authRepositoryImpl = authRepositoryImpl;

  @override
  void onRequest(
      RequestOptions options, RequestInterceptorHandler handler) async {
    final res = await _authRepositoryImpl.refreshToken();
    res.fold(
      (l) {},
      (token) => options.headers['authorization'] = token,
    );
    return handler.next(options);
  }
}

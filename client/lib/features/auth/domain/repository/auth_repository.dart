import 'dart:io';

import 'package:dio/dio.dart';

import '../../../../service/typedef.dart';
import '../models/user_model.dart';

abstract class AuthRepository {
  FutureEither<UserModel> signIn(String email, String password);

  FutureEither<Response> signUp(
      String email, String password, String username, File? image);

  FutureEither<UserModel> getUser(String uid);

  FutureEither<String> getRefreshedToken();

  FutureEither<String> refreshToken();

  FutureEither<String> signOut();
}

import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:fpdart/fpdart.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

import '../../../api/dio_client.dart';
import '../../../constants/constants.dart';
import '../../../service/typedef.dart';
import '../../../storage/secure_storage.dart';
import '../domain/models/user_model.dart';
import '../domain/repository/auth_repository.dart';

class AuthRepositoryImpl extends AuthRepository {
  AuthRepositoryImpl._internal();

  static final _singleton = AuthRepositoryImpl._internal();

  factory AuthRepositoryImpl() => _singleton;

  static const Duration tokenMinRefreshRemainingTime =
      Duration(milliseconds: 60000);

  @override
  FutureEither<UserModel> signIn(String email, String password) async {
    try {
      final credential =
          await FirebaseConstants.auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      final user = credential.user;
      if (user != null) {
        final uid = user.uid;
        final idToken = await user.getIdToken(true);
        await SecureStorage().storage.write(
              key: Globals.idTokenSecureStoragePath,
              value: idToken,
            );
        final response =
            await DioClient().dio.get('${ApiRoutes.usersRoute}/$uid');
        final userModel = UserModel.fromJson(response.data['data']);
        return right(userModel);
      } else {
        return left('User is null');
      }
    } on Exception catch (e) {
      return left(e.toString());
    }
  }

  @override
  FutureEither<Response> signUp(
      String email, String password, String username, File? image) async {
    try {
      final response = await DioClient().dio.post(
            '${ApiRoutes.authRoute}/signUp',
            data: jsonEncode(
              {
                'email': email,
                'username': username,
                'password': password,
              },
            ),
          );
      return right(response);
    } on Exception catch (e) {
      return left(e.toString());
    }
  }

  @override
  FutureEither<UserModel> getUser(String uid) async {
    try {
      final response =
          await DioClient().dio.get('${ApiRoutes.usersRoute}/$uid');
      final userModel = UserModel.fromJson(response.data['data']);
      return right(userModel);
    } on Exception catch (e) {
      return left(e.toString());
    }
  }

  @override
  FutureEither<String> getRefreshedToken() async {
    try {
      final user = FirebaseConstants.auth.currentUser;
      if (user != null) {
        final idToken = await user.getIdToken(true);
        await SecureStorage().storage.write(
              key: Globals.idTokenSecureStoragePath,
              value: idToken,
            );
        return right(idToken);
      } else {
        return left('user is null');
      }
    } on Exception catch (e) {
      return left(e.toString());
    }
  }

  @override
  FutureEither<String> refreshToken() async {
    String? refreshedToken;
    try {
      final String? token = await SecureStorage()
          .storage
          .read(key: Globals.idTokenSecureStoragePath);
      if (token != null) {
        final isTokenValid = JwtDecoder.isExpired(token);
        if (!isTokenValid) {
          final res = await getRefreshedToken();
          res.fold((l) {}, (r) {
            refreshedToken = r;
          });
        } else {
          final tokenRemainingTime = JwtDecoder.getRemainingTime(token);
          if (tokenRemainingTime < tokenMinRefreshRemainingTime) {
            final res = await getRefreshedToken();
            res.fold((l) {}, (r) {
              refreshedToken = r;
            });
          } else {
            refreshedToken = token;
          }
        }
      } else {
        final res = await getRefreshedToken();
        res.fold((l) {}, (r) {
          refreshedToken = r;
        });
      }
      if (refreshedToken != null) {
        return right(refreshedToken!);
      } else {
        return left('Error occured while refreshing token');
      }
    } on Exception catch (e) {
      return left(e.toString());
    }
  }

  @override
  FutureEither<String> signOut() async {
    try {
      await FirebaseConstants.auth.signOut();
      return right('Successfully sign out');
    } on Exception catch (e) {
      return left(e.toString());
    }
  }
}

part of 'auth_bloc.dart';

@immutable
abstract class AuthEvent {}

class AuthInititalEvent extends AuthEvent {}

class AuthSignInEvent extends AuthEvent {
  final String email;
  final String password;

  AuthSignInEvent({required this.email, required this.password});
}

class AuthSignUpEvent extends AuthEvent {
  final String email;
  final String username;
  final String password;
  final File? image;

  AuthSignUpEvent({
    required this.email,
    required this.username,
    required this.password,
    required this.image,
  });
}

class AuthRegisterButtonTapEvent extends AuthEvent {}

class AuthSignInButtonClickEvent extends AuthEvent {}

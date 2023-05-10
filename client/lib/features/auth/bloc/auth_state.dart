part of 'auth_bloc.dart';

@immutable
abstract class AuthState {}

@immutable
abstract class AuthActionState extends AuthState {}

class AuthWelcomeState extends AuthState {}

class AuthSignInState extends AuthState {}

class AuthRegisterState extends AuthState {}

class AuthLoadingState extends AuthActionState {}

class AuthExceptionState extends AuthActionState {
  final String error;

  AuthExceptionState({required this.error});
}

class AuthSuccessfullyAuthorizedState extends AuthActionState {}

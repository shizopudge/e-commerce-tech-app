import 'dart:async';
import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

import '../../../storage/shared_prefs.dart';
import '../data/auth_repository_impl.dart';
import '../domain/models/user_model.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepositoryImpl _authRepositoryImpl;
  AuthBloc({required AuthRepositoryImpl authRepositoryImpl})
      : _authRepositoryImpl = authRepositoryImpl,
        super(AuthInitialState()) {
    on<AuthSignInEvent>(_authSignInEvent);
    on<AuthSignUpEvent>(_authSignUpEvent);
    on<AuthRegisterButtonTapEvent>(_authRegisterButtonTapEvent);
    on<AuthSignInButtonClickEvent>(_authSignInButtonClickEvent);
    on<AuthInititalEvent>(_authInititalEvent);
  }

  FutureOr<void> _authSignInEvent(
      AuthSignInEvent event, Emitter<AuthState> emit) async {
    emit(AuthLoadingState());
    final res = await _authRepositoryImpl.signIn(event.email, event.password);
    res.fold(
      (error) {
        emit(AuthSignInState());
        emit(AuthExceptionState(error: error));
      },
      (userModel) {
        emit(
          AuthSuccessfullyAuthorizedState(userModel: userModel),
        );
      },
    );
  }

  FutureOr<void> _authRegisterButtonTapEvent(
      AuthRegisterButtonTapEvent event, Emitter<AuthState> emit) {
    emit(AuthRegisterState());
  }

  FutureOr<void> _authSignInButtonClickEvent(
      AuthSignInButtonClickEvent event, Emitter<AuthState> emit) {
    emit(AuthSignInState());
  }

  FutureOr<void> _authSignUpEvent(
      AuthSignUpEvent event, Emitter<AuthState> emit) async {
    emit(AuthLoadingState());
    final signUpRes = await _authRepositoryImpl.signUp(
      event.email,
      event.password,
      event.username,
      event.image,
    );
    await signUpRes.fold(
      (error) {
        emit(AuthRegisterState());
        emit(AuthExceptionState(error: error));
      },
      (r) async {
        final signInRes =
            await _authRepositoryImpl.signIn(event.email, event.password);
        signInRes.fold(
          (error) {
            emit(AuthRegisterState());
            emit(AuthExceptionState(error: error));
          },
          (userModel) => emit(
            AuthSuccessfullyAuthorizedState(userModel: userModel),
          ),
        );
      },
    );
  }

  FutureOr<void> _authInititalEvent(
      AuthInititalEvent event, Emitter<AuthState> emit) async {
    final prefs = await SharedPrefsStorage().prefs;
    final bool isFirstLaunch = prefs.getBool('isFirstLaunch') ?? true;
    if (!isFirstLaunch) {
      emit(AuthSignInState());
    }
  }
}

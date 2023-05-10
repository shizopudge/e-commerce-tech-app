import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../service/utils.dart';
import '../../../../storage/shared_prefs.dart';
import '../../bloc/auth_bloc.dart';
import '../widgets/auth_register_form.dart';
import '../widgets/auth_sign_in_form.dart';
import '../widgets/auth_welcome.dart';

class AuthPage extends StatefulWidget {
  const AuthPage({
    super.key,
  });

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _isPasswordShownNotifier = ValueNotifier<bool>(false);
  final _isLoadingValueNotifier = ValueNotifier<bool>(false);

  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _isPasswordShownNotifier.dispose();
    _isLoadingValueNotifier.dispose();
    super.dispose();
  }

  void _changeIsFirstLaunch() async {
    final prefs = await SharedPrefsStorage().prefs;
    prefs.setBool('isFirstLaunch', false);
  }

  void _onWelcomeRegisterTap() {
    _changeIsFirstLaunch();
    context.read<AuthBloc>().add(AuthRegisterButtonTapEvent());
  }

  void _onWelcomeSignInTap() async {
    _changeIsFirstLaunch();
    context.read<AuthBloc>().add(AuthSignInButtonClickEvent());
  }

  void _onAuthSignInFormRegisterTap() {
    _formKey.currentState?.reset();
    context.read<AuthBloc>().add(AuthRegisterButtonTapEvent());
  }

  void _onAuthSignInFormSignInTap() => context.read<AuthBloc>().add(
        AuthSignInEvent(
          email: _emailController.text.trim(),
          password: _passwordController.text.trim(),
        ),
      );

  void _onAuthRegisterFormSignInTap() {
    _formKey.currentState?.reset();
    context.read<AuthBloc>().add((AuthSignInButtonClickEvent()));
  }

  void _onAuthRegisterFormRegisterTap() => context.read<AuthBloc>().add(
        AuthSignUpEvent(
          email: _emailController.text.trim(),
          username: _usernameController.text.trim(),
          password: _passwordController.text.trim(),
          image: null,
        ),
      );

  @override
  Widget build(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;
    return BlocConsumer<AuthBloc, AuthState>(
      listenWhen: (previous, current) => current is AuthActionState,
      buildWhen: (previous, current) => current is! AuthActionState,
      listener: (context, state) {
        if (state is AuthExceptionState) {
          Utils.showSnackbBar(context, state.error);
        }
        if (state is AuthSuccessfullyAuthorizedState) {
          Utils.showSnackbBar(context,
              'You successfully authorized as ${state.userModel.username}');
        }
        if (state is AuthLoadingState) {
          _isLoadingValueNotifier.value = true;
        } else {
          _isLoadingValueNotifier.value = false;
        }
      },
      builder: (context, state) {
        _isLoadingValueNotifier.value = false;
        switch (state.runtimeType) {
          case AuthInitialState:
            return Welcome(
              screenHeight: screenHeight,
              onRegisterTap: _onWelcomeRegisterTap,
              onSignInTap: _onWelcomeSignInTap,
            );
          case AuthSignInState:
            return AuthSignInForm(
              formKey: _formKey,
              emailController: _emailController,
              passwordController: _passwordController,
              isPasswordShownNotifier: _isPasswordShownNotifier,
              isLoadingNotifier: _isLoadingValueNotifier,
              screenHeight: screenHeight,
              onRegisterTap: _onAuthSignInFormRegisterTap,
              signIn: _onAuthSignInFormSignInTap,
            );
          case AuthRegisterState:
            return AuthRegisterForm(
              formKey: _formKey,
              emailController: _emailController,
              usernameController: _usernameController,
              passwordController: _passwordController,
              isPasswordShownNotifier: _isPasswordShownNotifier,
              isLoadingNotifier: _isLoadingValueNotifier,
              screenHeight: screenHeight,
              title: 'Registration',
              onSignInTap: _onAuthRegisterFormSignInTap,
              register: _onAuthRegisterFormRegisterTap,
            );
          default:
            return const SizedBox();
        }
      },
    );
  }
}

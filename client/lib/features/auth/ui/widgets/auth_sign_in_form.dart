import 'package:client/service/validators.dart';
import 'package:flutter/material.dart';

import '../../../../common/app_logo.dart';
import '../../../../common/default_button.dart';
import '../../../../common/default_text_button.dart';
import '../../../../common/overlapping_loader.dart';
import 'auth_app_bar.dart';
import 'auth_textfield.dart';

class AuthSignInForm extends StatelessWidget {
  final GlobalKey<FormState> _formKey;
  final TextEditingController _emailController;
  final TextEditingController _passwordController;
  final ValueNotifier<bool> _isPasswordShownNotifier;
  final ValueNotifier<bool> _isLoadingNotifier;
  final double screenHeight;
  final VoidCallback onRegisterTap;
  final VoidCallback signIn;
  const AuthSignInForm({
    super.key,
    required GlobalKey<FormState> formKey,
    required TextEditingController emailController,
    required TextEditingController passwordController,
    required ValueNotifier<bool> isPasswordShownNotifier,
    required ValueNotifier<bool> isLoadingNotifier,
    required this.screenHeight,
    required this.onRegisterTap,
    required this.signIn,
  })  : _formKey = formKey,
        _emailController = emailController,
        _passwordController = passwordController,
        _isPasswordShownNotifier = isPasswordShownNotifier,
        _isLoadingNotifier = isLoadingNotifier;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: authAppBar(title: 'Sign in'),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ValueListenableBuilder(
            valueListenable: _isLoadingNotifier,
            builder: (context, isLoading, _) {
              return Stack(
                alignment: Alignment.center,
                children: [
                  Align(
                    alignment: Alignment.topCenter,
                    child: SingleChildScrollView(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          AppLogo(
                            screenHeight: screenHeight,
                          ),
                          AuthTextField(
                            controller: _emailController,
                            hint: 'Email',
                            validator: (text) {
                              if (text == null || text.isEmpty) {
                                return 'Enter email.';
                              } else {
                                return text.isValidEmail()
                                    ? null
                                    : 'Incorrect email.';
                              }
                            },
                          ),
                          AuthTextField(
                            controller: _passwordController,
                            hint: 'Password',
                            isPasswordShownNotifier: _isPasswordShownNotifier,
                            validator: (text) {
                              if (text == null || text.isEmpty) {
                                return 'Enter password.';
                              } else {
                                if (text.isValidPassword()) {
                                  return null;
                                } else {
                                  return 'Incorrect password. Password should contain at least one upper case, one lower case, one digit, one special character and must be at least 8 characters in legth.';
                                }
                              }
                            },
                          ),
                          DefaultButton(
                            onTap: () {
                              if (_formKey.currentState != null) {
                                if (_formKey.currentState!.validate()) {
                                  signIn();
                                }
                              }
                            },
                            text: 'Sign in',
                            withShadow: true,
                          ),
                          DefaultTextButton(
                              onTap: onRegisterTap,
                              text: 'Dont have an account yet? Register!')
                        ],
                      ),
                    ),
                  ),
                  if (isLoading)
                    const OverlappingLoader(
                      text: 'Signing in',
                    ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}

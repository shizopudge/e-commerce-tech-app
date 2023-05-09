import 'package:client/service/validators.dart';
import 'package:flutter/material.dart';

import '../../../../common/app_logo.dart';
import '../../../../common/default_button.dart';
import '../../../../common/default_text_button.dart';
import '../../../../common/overlapping_loader.dart';
import 'auth_app_bar.dart';
import 'auth_textfield.dart';

class AuthRegisterForm extends StatelessWidget {
  final GlobalKey<FormState> _formKey;
  final TextEditingController _emailController;
  final TextEditingController _usernameController;
  final TextEditingController _passwordController;
  final ValueNotifier<bool> _isPasswordShownNotifier;
  final ValueNotifier<bool> _isLoadingNotifier;
  final double screenHeight;
  final String title;
  final VoidCallback onSignInTap;
  final VoidCallback register;
  const AuthRegisterForm({
    super.key,
    required GlobalKey<FormState> formKey,
    required TextEditingController emailController,
    required TextEditingController usernameController,
    required TextEditingController passwordController,
    required ValueNotifier<bool> isPasswordShownNotifier,
    required ValueNotifier<bool> isLoadingNotifier,
    required this.screenHeight,
    required this.title,
    required this.onSignInTap,
    required this.register,
  })  : _formKey = formKey,
        _emailController = emailController,
        _usernameController = usernameController,
        _passwordController = passwordController,
        _isPasswordShownNotifier = isPasswordShownNotifier,
        _isLoadingNotifier = isLoadingNotifier;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: authAppBar(title: 'Registration'),
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
                            controller: _usernameController,
                            hint: 'Username',
                            validator: (text) {
                              if (text == null || text.isEmpty) {
                                return 'Enter username.';
                              } else {
                                if (text.length < 8) {
                                  return 'Username must contain at least 6 characters';
                                }
                              }
                              return null;
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
                                  register();
                                }
                              }
                            },
                            text: 'Register',
                            withShadow: true,
                          ),
                          DefaultTextButton(
                              onTap: onSignInTap,
                              text: 'Already have an account? Sign in!')
                        ],
                      ),
                    ),
                  ),
                  if (isLoading)
                    const OverlappingLoader(
                      text: 'Registering an account',
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

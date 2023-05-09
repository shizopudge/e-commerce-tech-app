import 'package:flutter/material.dart';

import '../../../../common/app_logo.dart';
import '../../../../common/default_button.dart';
import '../../../../constants/constants.dart';

class Welcome extends StatelessWidget {
  final VoidCallback onRegisterTap;
  final VoidCallback onSignInTap;
  final double screenHeight;
  const Welcome({
    super.key,
    required this.screenHeight,
    required this.onRegisterTap,
    required this.onSignInTap,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AppLogo(
              screenHeight: screenHeight,
            ),
            const Padding(
              padding: EdgeInsets.all(15.0),
              child: Text(
                'Welcome!',
                style: FontStyles.title,
                textAlign: TextAlign.center,
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'Hope you will find what you are looking for in our store. Have a good shopping!',
                style: FontStyles.label,
                textAlign: TextAlign.center,
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(15.0),
              child: Text(
                'If you dont have an account yet',
                style: FontStyles.label,
                textAlign: TextAlign.center,
              ),
            ),
            DefaultButton(
              onTap: onRegisterTap,
              text: 'Register',
              withShadow: true,
            ),
            const Padding(
              padding: EdgeInsets.all(15.0),
              child: Text(
                'or if you already have an account',
                style: FontStyles.label,
                textAlign: TextAlign.center,
              ),
            ),
            DefaultButton(
              onTap: onSignInTap,
              text: 'Sign in',
              withShadow: true,
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../constants/firebase.dart';
import '../../../../constants/pages.dart';
import '../../bloc/auth_bloc.dart';

class AuthSplashPage extends StatefulWidget {
  const AuthSplashPage({super.key});

  @override
  State<AuthSplashPage> createState() => _AuthSplashPageState();
}

class _AuthSplashPageState extends State<AuthSplashPage> {
  void _navigateToHomePage() => Future.delayed(
        const Duration(milliseconds: 1000),
        () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => Pages.homePage,
          ),
        ),
      );

  void _navigateToAuthPage() => Future.delayed(
        const Duration(milliseconds: 1000),
        () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => Pages.authPage,
          ),
        ),
      );

  @override
  void initState() {
    FirebaseConstants.auth.authStateChanges().listen((user) {
      context.read<AuthBloc>().add(AuthInititalEvent(user: user));
      if (user != null) {
        _navigateToHomePage();
      } else {
        _navigateToAuthPage();
      }
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(21),
          color: Colors.deepOrange.shade900,
        ),
      ),
    );
  }
}

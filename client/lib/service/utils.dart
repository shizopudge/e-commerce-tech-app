import 'package:flutter/material.dart';

class Utils {
  static void showSnackbBar(
    BuildContext context,
    String text, {
    Duration duration = const Duration(
      milliseconds: 5000,
    ),
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          text,
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../constants/constants.dart';

class DefaultTextButton extends StatelessWidget {
  final VoidCallback onTap;
  final String text;
  const DefaultTextButton({
    super.key,
    required this.onTap,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onTap,
      child: Text(
        text,
        style: FontStyles.press,
      ),
    );
  }
}

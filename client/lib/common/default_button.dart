import 'package:flutter/material.dart';

import '../constants/constants.dart';

class DefaultButton extends StatelessWidget {
  final Color buttonColor;
  final LinearGradient? gradient;
  final String text;
  final bool withShadow;
  final VoidCallback onTap;
  const DefaultButton({
    super.key,
    this.buttonColor = Pallete.actionRareColor,
    this.gradient,
    required this.text,
    this.withShadow = false,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(
          12,
        ),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(
              12,
            ),
            color: gradient == null ? buttonColor : null,
            boxShadow: withShadow
                ? [
                    BoxShadow(
                      color: buttonColor,
                      spreadRadius: 1,
                      blurRadius: 5,
                      offset: const Offset(0, 3),
                      blurStyle: BlurStyle.normal,
                    ),
                  ]
                : null,
            gradient: gradient,
          ),
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 15.0),
          child: Text(
            text,
            style: FontStyles.boldLabel,
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../constants/constants.dart';

class AppLogo extends StatelessWidget {
  const AppLogo({
    super.key,
    required this.screenHeight,
  });

  final double screenHeight;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Image.asset(
        Assets.logo,
        color: Pallete.actionRareColor,
        colorBlendMode: BlendMode.srcIn,
        height: screenHeight / 4,
        width: double.maxFinite,
      ),
    );
  }
}

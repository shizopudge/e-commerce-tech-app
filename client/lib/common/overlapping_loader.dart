import 'dart:ui';

import 'package:flutter/material.dart';

import '../constants/constants.dart';

class OverlappingLoader extends StatelessWidget {
  final String text;
  const OverlappingLoader({
    super.key,
    this.text = 'Loading',
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        ClipRect(
          child: BackdropFilter(
            filter: ImageFilter.blur(
              sigmaX: 3.5,
              sigmaY: 3.5,
            ),
            child: const SizedBox.expand(),
          ),
        ),
        Container(
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(
              32,
            ),
            color: Pallete.actionCommonColor.withOpacity(.18),
          ),
          height: 155,
          width: 155,
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircularProgressIndicator(
                strokeWidth: 1.5,
              ),
              const SizedBox(
                height: 15,
              ),
              Text(
                '$text...',
                textAlign: TextAlign.center,
                style: FontStyles.label.copyWith(fontSize: 18),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

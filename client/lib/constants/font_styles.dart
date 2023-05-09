import 'package:flutter/material.dart';

import 'pallete.dart';

class FontStyles {
  static const TextStyle header = TextStyle(
    fontSize: 60,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle title = TextStyle(
    fontSize: 36,
    fontWeight: FontWeight.w700,
  );

  static const TextStyle label = TextStyle(
    fontSize: 21,
    fontWeight: FontWeight.w300,
  );

  static const TextStyle boldLabel = TextStyle(
    fontSize: 21,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle press = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w500,
    color: Pallete.actionCommonColor,
    decoration: TextDecoration.underline,
    decorationThickness: .5,
  );
}

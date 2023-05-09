import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';

import '../storage/shared_prefs.dart';
import 'pallete.dart';

class AppTheme {
  static final darkTheme = ThemeData(
    scaffoldBackgroundColor: Pallete.darkSixtyPercentColor,
  );

  static final lightTheme = ThemeData.light().copyWith();
}

class ThemeCubit extends Cubit<bool> {
  ThemeCubit() : super(true);

  Future<void> switchTheme() async {
    final prefs = await SharedPrefsStorage().prefs;
    final isDark = prefs.getBool('isDark') ?? true;
    if (isDark) {
      prefs.setBool('isDark', false);
      emit(false);
    } else {
      prefs.setBool('isDark', true);
      emit(true);
    }
  }

  Future<void> getTheme() async {
    final prefs = await SharedPrefsStorage().prefs;
    final isDark = prefs.getBool('isDark') ?? true;
    if (isDark) {
      emit(true);
    } else {
      emit(false);
    }
  }
}

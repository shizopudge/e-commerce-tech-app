import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'constants/constants.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    final themeCubit = ThemeCubit();
    return BlocBuilder<ThemeCubit, bool>(
      bloc: themeCubit..getTheme(),
      builder: (context, state) {
        final bool isDark = state;
        return MaterialApp(
          theme: isDark
              ? AppTheme.darkTheme.copyWith(
                  textTheme: Theme.of(context).textTheme.apply(
                        fontFamily: 'Raleway',
                        bodyColor: Pallete.darkThirtyPercentColor,
                        displayColor: Pallete.darkThirtyPercentColor,
                      ),
                )
              : AppTheme.lightTheme.copyWith(
                  textTheme: Theme.of(context).textTheme.apply(
                        fontFamily: 'Raleway',
                        bodyColor: Pallete.lightThirtyPercentColor,
                        displayColor: Pallete.lightThirtyPercentColor,
                      ),
                ),
          debugShowCheckedModeBanner: false,
          home: Pages.authSplashPage,
        );
      },
    );
  }
}

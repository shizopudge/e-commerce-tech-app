import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'constants/constants.dart';
import 'features/auth/bloc/auth_bloc.dart';
import 'features/auth/data/auth_repository_impl.dart';
import 'features/home/data/home_repository_impl.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider(
          create: (context) => AuthRepositoryImpl(),
        ),
        RepositoryProvider(
          create: (context) => HomeRepositoryImpl(),
        ),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider(
            create: (context) => AuthBloc(
              authRepositoryImpl: context.read<AuthRepositoryImpl>(),
            ),
          ),
          BlocProvider(
            lazy: false,
            create: (_) => ThemeCubit()..getTheme(),
          ),
        ],
        child: BlocBuilder<ThemeCubit, bool>(
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
        ),
      ),
    );
  }
}

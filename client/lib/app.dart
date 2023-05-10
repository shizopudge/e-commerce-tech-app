import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'constants/constants.dart';
import 'features/auth/bloc/auth_bloc.dart';
import 'features/auth/data/auth_repository_impl.dart';
import 'features/home/data/home_repository_impl.dart';

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  bool isAuthorized = false;

  @override
  void initState() {
    FirebaseConstants.auth.authStateChanges().listen((user) {
      if (user != null) {
        setState(() {
          isAuthorized = true;
        });
      } else {
        setState(() {
          isAuthorized = false;
        });
      }
    });
    super.initState();
  }

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
              home: isAuthorized ? Pages.homePage : Pages.authPage,
            );
          },
        ),
      ),
    );
  }
}

import '../features/auth/bloc/auth_bloc.dart';
import '../features/home/bloc/home_bloc.dart';
import 'repositories.dart';

class Blocs {
  final AuthBloc authBloc = AuthBloc(
    authRepositoryImpl: AppRepositories.authRepositoryImpl,
  );

  final HomeBloc homeBloc = HomeBloc(
    homeRepositoryImpl: AppRepositories.homeRepositoryImpl,
  );
}

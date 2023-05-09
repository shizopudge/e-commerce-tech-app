import '../features/auth/data/auth_repository_impl.dart';
import '../features/home/data/home_repository_impl.dart';

class AppRepositories {
  static final AuthRepositoryImpl authRepositoryImpl = AuthRepositoryImpl();
  static final HomeRepositoryImpl homeRepositoryImpl = HomeRepositoryImpl();
}

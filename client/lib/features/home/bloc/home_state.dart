part of 'home_bloc.dart';

@immutable
abstract class HomeState {}

@immutable
abstract class HomeActionState extends HomeState {}

class HomeInitialState extends HomeState {}

class HomeLoadingState extends HomeState {}

class HomeLoadedState extends HomeState {
  final List<Product> latestProducts;
  final List<String> cart;
  final List<String> wishlist;

  HomeLoadedState({
    required this.latestProducts,
    required this.cart,
    required this.wishlist,
  });
}

class HomeExceptionState extends HomeState {
  final String error;

  HomeExceptionState({required this.error});
}

class HomeExceptionActionState extends HomeActionState {
  final String error;

  HomeExceptionActionState({required this.error});
}

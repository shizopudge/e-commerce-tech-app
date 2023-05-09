import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

import '../data/home_repository_impl.dart';
import '../domain/models/product.dart';

part 'home_event.dart';
part 'home_state.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final HomeRepositoryImpl _homeRepositoryImpl;
  HomeBloc({required HomeRepositoryImpl homeRepositoryImpl})
      : _homeRepositoryImpl = homeRepositoryImpl,
        super(HomeInitialState()) {
    on<HomeInitialEvent>(_homeInitialEvent);
  }

  FutureOr<void> _homeInitialEvent(
      HomeInitialEvent event, Emitter<HomeState> emit) async {
    emit(HomeLoadingState());
    final latestProductsRes = await _homeRepositoryImpl.getSomeLatestProducts();
    await latestProductsRes.fold(
      (error) {
        emit(HomeExceptionState(error: error));
        emit(HomeExceptionActionState(error: error));
      },
      (latestProducts) async {
        final usersCartAndWishlistRes =
            await _homeRepositoryImpl.getUsersCartAndWishlist();
        usersCartAndWishlistRes.fold(
          (error) {
            emit(HomeExceptionState(error: error));
            emit(HomeExceptionActionState(error: error));
          },
          (cartAndWishlist) {
            final List<String> cart = cartAndWishlist['cart'] ?? [];
            final List<String> wishlist = cartAndWishlist['wishlist'] ?? [];
            emit(
              HomeLoadedState(
                latestProducts: latestProducts,
                cart: cart,
                wishlist: wishlist,
              ),
            );
          },
        );
      },
    );
  }
}

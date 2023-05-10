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
    latestProductsRes.fold(
      (error) {
        emit(HomeExceptionState(error: error));
        emit(HomeExceptionActionState(error: error));
      },
      (latestProducts) => emit(
        HomeLoadedState(
          latestProducts: latestProducts,
        ),
      ),
    );
  }
}

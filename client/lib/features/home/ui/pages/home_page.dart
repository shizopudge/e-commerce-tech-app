import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../common/default_button.dart';
import '../../../../common/overlapping_loader.dart';
import '../../../../common/product_card.dart';
import '../../../../constants/constants.dart';
import '../../../../service/utils.dart';
import '../../bloc/home_bloc.dart';
import '../../domain/models/product.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _homeBloc = Blocs().homeBloc;

  @override
  void initState() {
    _homeBloc.add(HomeInitialEvent());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<HomeBloc, HomeState>(
      bloc: _homeBloc,
      listenWhen: (previous, current) => current is HomeActionState,
      buildWhen: (previous, current) => current is! HomeActionState,
      listener: (context, state) {
        if (state is HomeExceptionActionState) {
          Utils.showSnackbBar(context, state.error);
        }
      },
      builder: (context, state) {
        switch (state.runtimeType) {
          case HomeExceptionState:
            final exceptionState = state as HomeExceptionState;
            return Scaffold(
              body: Padding(
                padding: const EdgeInsets.all(15.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        text: 'Oops...\n',
                        style: FontStyles.title,
                        children: [
                          TextSpan(
                            text: exceptionState.error,
                            style: FontStyles.label,
                          ),
                        ],
                      ),
                    ),
                    DefaultButton(
                      text: 'Try again',
                      withShadow: true,
                      onTap: () {},
                    ),
                  ],
                ),
              ),
            );
          case HomeLoadingState:
            return const Scaffold(
              body: OverlappingLoader(
                text: 'Loading',
              ),
            );
          case HomeLoadedState:
            final loadedState = state as HomeLoadedState;
            final List<Product> latestProducts = loadedState.latestProducts;
            final List<String> cart = loadedState.cart;
            final List<String> wishlist = loadedState.wishlist;
            return Scaffold(
              body: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'New products',
                        style: FontStyles.boldLabel,
                      ),
                      SizedBox(
                        height: 400,
                        child: ListView.builder(
                          itemCount: latestProducts.length,
                          itemExtent: 280,
                          scrollDirection: Axis.horizontal,
                          itemBuilder: (context, index) {
                            final Product product = latestProducts[index];
                            final bool isProductInUsersCart =
                                cart.contains(product.id);
                            final bool isProductInUsersWishlist =
                                wishlist.contains(product.id);
                            return ProductCard(
                              product: product,
                              isProductInUsersCart: isProductInUsersCart,
                              isProductInUsersWishlist:
                                  isProductInUsersWishlist,
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          case HomeInitialState:
            return const SizedBox();
          default:
            return const SizedBox();
        }
      },
    );
  }
}

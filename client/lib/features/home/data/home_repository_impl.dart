import 'dart:convert';

import 'package:fpdart/fpdart.dart';

import '../../../api/dio_client.dart';
import '../../../constants/constants.dart';
import '../../../service/typedef.dart';
import '../../auth/domain/models/user_model.dart';
import '../domain/models/product.dart';
import '../domain/respository/home_repository.dart';

class HomeRepositoryImpl extends HomeRepository {
  @override
  FutureEither<List<Product>> getSomeLatestProducts() async {
    try {
      final res = await DioClient().dio.get(
            '${ApiRoutes.productsRoute}/v1/search',
            data: jsonEncode(
              {
                'isLatest': true,
              },
            ),
          );
      List<Product> products = [];
      final int totalCount = res.data['data']['count'];
      final List jsonProducts = res.data['data']['products'];
      for (int i = 0; i < totalCount; i++) {
        products.add(Product.fromJson(jsonProducts[i]));
      }
      return right(products);
    } on Exception catch (e) {
      return left(e.toString());
    }
  }

  FutureEither<Map<String, List<String>>> getUsersCartAndWishlist() async {
    try {
      final uid = FirebaseConstants.auth.currentUser?.uid;
      if (uid == null) {
        return left('Cant get current user uid');
      }
      final response =
          await DioClient().dio.get('${ApiRoutes.usersRoute}/$uid');
      final userModel = UserModel.fromJson(response.data['data']);
      final List<String> cart = userModel.cart;
      final List<String> wishlist = userModel.wishlist;
      return right({
        'cart': cart,
        'wishlist': wishlist,
      });
    } on Exception catch (e) {
      return left(e.toString());
    }
  }
}

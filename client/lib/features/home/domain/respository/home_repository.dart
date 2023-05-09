import 'package:client/service/typedef.dart';

import '../models/product.dart';

abstract class HomeRepository {
  FutureEither<List<Product>> getSomeLatestProducts();
}

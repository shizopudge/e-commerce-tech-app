import 'package:freezed_annotation/freezed_annotation.dart';

part 'product.freezed.dart';

part 'product.g.dart';

@freezed
class Product with _$Product {
  const factory Product({
    required String id,
    required String brand,
    required String title,
    required String modelCode,
    required String productCode,
    required String productType,
    required List<String> images,
    required double price,
    required int quantity,
    required int reviewsCount,
    required int? discount,
    required double? rating,
    required double? reliability,
    required bool isLatest,
    required bool isBestseller,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}

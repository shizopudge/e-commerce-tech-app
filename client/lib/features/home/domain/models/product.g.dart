// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Product _$$_ProductFromJson(Map<String, dynamic> json) => _$_Product(
      id: json['id'] as String,
      brand: json['brand'] as String,
      title: json['title'] as String,
      modelCode: json['modelCode'] as String,
      productCode: json['productCode'] as String,
      productType: json['productType'] as String,
      images:
          (json['images'] as List<dynamic>).map((e) => e as String).toList(),
      price: (json['price'] as num).toDouble(),
      quantity: json['quantity'] as int,
      reviewsCount: json['reviewsCount'] as int,
      discount: json['discount'] as int?,
      rating: (json['rating'] as num?)?.toDouble(),
      reliability: (json['reliability'] as num?)?.toDouble(),
      isLatest: json['isLatest'] as bool,
      isBestseller: json['isBestseller'] as bool,
    );

Map<String, dynamic> _$$_ProductToJson(_$_Product instance) =>
    <String, dynamic>{
      'id': instance.id,
      'brand': instance.brand,
      'title': instance.title,
      'modelCode': instance.modelCode,
      'productCode': instance.productCode,
      'productType': instance.productType,
      'images': instance.images,
      'price': instance.price,
      'quantity': instance.quantity,
      'reviewsCount': instance.reviewsCount,
      'discount': instance.discount,
      'rating': instance.rating,
      'reliability': instance.reliability,
      'isLatest': instance.isLatest,
      'isBestseller': instance.isBestseller,
    };

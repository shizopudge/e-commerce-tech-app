// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_UserModel _$$_UserModelFromJson(Map<String, dynamic> json) => _$_UserModel(
      id: json['id'] as String,
      username: json['username'] as String,
      email: json['email'] as String,
      image: json['image'] as String?,
      address: json['address'] as String?,
      phone: json['phone'] as String?,
      bankCards: (json['bankCards'] as List<dynamic>)
          .map((e) => e as Map<String, dynamic>)
          .toList(),
      level: json['level'] as Map<String, dynamic>,
      wishlist:
          (json['wishlist'] as List<dynamic>).map((e) => e as String).toList(),
      cart: (json['cart'] as List<dynamic>).map((e) => e as String).toList(),
      isAdmin: json['isAdmin'] as bool,
      bonuses: (json['bonuses'] as num).toDouble(),
    );

Map<String, dynamic> _$$_UserModelToJson(_$_UserModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'username': instance.username,
      'email': instance.email,
      'image': instance.image,
      'address': instance.address,
      'phone': instance.phone,
      'bankCards': instance.bankCards,
      'level': instance.level,
      'wishlist': instance.wishlist,
      'cart': instance.cart,
      'isAdmin': instance.isAdmin,
      'bonuses': instance.bonuses,
    };

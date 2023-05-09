import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_model.freezed.dart';

part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String username,
    required String email,
    String? image,
    String? address,
    String? phone,
    required List<Map<String, dynamic>> bankCards,
    required Map<String, dynamic> level,
    required List<String> wishlist,
    required List<String> cart,
    required bool isAdmin,
    required double bonuses,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}

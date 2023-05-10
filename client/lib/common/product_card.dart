import 'package:auto_size_text/auto_size_text.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../constants/constants.dart';
import '../features/home/domain/models/product.dart';
import 'animated_gradient.dart';

class ProductCard extends StatelessWidget {
  final Product product;
  final bool isProductInUsersWishlist;
  final bool isProductInUsersCart;
  const ProductCard({
    super.key,
    required this.product,
    required this.isProductInUsersWishlist,
    required this.isProductInUsersCart,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Pallete.actionCommonColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(
          21,
        ),
      ),
      margin: const EdgeInsets.all(15.0),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(21),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(2.0),
                child: CachedNetworkImage(
                  imageUrl: '${Globals.imagesBaseUrl}${product.images[0]}',
                  imageBuilder: (context, imageProvider) {
                    return Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(21),
                      ),
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(21),
                          image: DecorationImage(
                            image: imageProvider,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    );
                  },
                  placeholder: (context, url) {
                    return const AnimatedGradient();
                  },
                  errorWidget: (context, url, error) {
                    return const AnimatedGradient();
                  },
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 2.5),
                    child: AutoSizeText(
                      product.brand,
                      style: FontStyles.boldLabel.copyWith(
                        color: Colors.black,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                      minFontSize: 14,
                      maxFontSize: 18,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 2.5),
                    child: AutoSizeText(
                      product.title,
                      style: FontStyles.label.copyWith(color: Colors.black),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                      minFontSize: 14,
                      maxFontSize: 18,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 2.5),
                    child: AutoSizeText(
                      '\$${product.price}',
                      style: FontStyles.boldLabel.copyWith(color: Colors.black),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                      minFontSize: 14,
                      maxFontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Row(
                        children: [
                          if (product.rating != null)
                            Text(
                              product.rating.toString(),
                              style: FontStyles.boldLabel.copyWith(
                                color: Colors.black,
                                fontSize: 12,
                              ),
                            )
                          else
                            Text(
                              '0',
                              style: FontStyles.boldLabel.copyWith(
                                color: Colors.black,
                                fontSize: 12,
                              ),
                            ),
                          const SizedBox(
                            width: 1,
                          ),
                          const Icon(
                            Icons.star,
                          ),
                        ],
                      ),
                      const SizedBox(
                        width: 5,
                      ),
                      Row(
                        children: [
                          if (product.rating != null)
                            Text(
                              product.reviewsCount.toString(),
                              style: FontStyles.boldLabel.copyWith(
                                color: Colors.black,
                                fontSize: 12,
                              ),
                            )
                          else
                            Text(
                              '0',
                              style: FontStyles.boldLabel.copyWith(
                                color: Colors.black,
                                fontSize: 12,
                              ),
                            ),
                          const SizedBox(
                            width: 1,
                          ),
                          const Icon(
                            Icons.chat,
                          ),
                        ],
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (isProductInUsersCart)
                        IconButton(
                          onPressed: () {},
                          icon: const Icon(
                            Icons.favorite,
                          ),
                        )
                      else
                        IconButton(
                          onPressed: () {},
                          icon: const Icon(
                            Icons.favorite_outline,
                          ),
                        ),
                      const SizedBox(
                        width: 15,
                      ),
                      if (isProductInUsersWishlist)
                        IconButton(
                          onPressed: () {},
                          icon: const Icon(
                            Icons.shopping_cart,
                          ),
                        )
                      else
                        IconButton(
                          onPressed: () {},
                          icon: const Icon(
                            Icons.shopping_cart_outlined,
                          ),
                        )
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

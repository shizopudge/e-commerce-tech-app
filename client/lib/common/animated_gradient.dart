import 'package:flutter/material.dart';

import '../constants/constants.dart';

class AnimatedGradient extends StatefulWidget {
  const AnimatedGradient({super.key});

  @override
  State<AnimatedGradient> createState() => _AnimatedGradientState();
}

class _AnimatedGradientState extends State<AnimatedGradient>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<Alignment> _topAlignmentAnimation;
  late Animation<Alignment> _bottomAlignmentAnimation;

  @override
  void initState() {
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(
        milliseconds: 4000,
      ),
    );
    _topAlignmentAnimation = TweenSequence<Alignment>(
      [
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.topLeft,
            end: Alignment.topRight,
          ),
          weight: 1,
        ),
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.topRight,
            end: Alignment.bottomRight,
          ),
          weight: 1,
        ),
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.bottomRight,
            end: Alignment.bottomLeft,
          ),
          weight: 1,
        ),
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.bottomLeft,
            end: Alignment.topLeft,
          ),
          weight: 1,
        ),
      ],
    ).animate(_animationController);

    _bottomAlignmentAnimation = TweenSequence<Alignment>(
      [
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.bottomRight,
            end: Alignment.bottomLeft,
          ),
          weight: 1,
        ),
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.bottomLeft,
            end: Alignment.topLeft,
          ),
          weight: 1,
        ),
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.topLeft,
            end: Alignment.topRight,
          ),
          weight: 1,
        ),
        TweenSequenceItem<Alignment>(
          tween: Tween<Alignment>(
            begin: Alignment.topRight,
            end: Alignment.bottomRight,
          ),
          weight: 1,
        ),
      ],
    ).animate(_animationController);

    _animationController.repeat();
    super.initState();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animationController,
      builder: (context, _) {
        return Card(
          margin: const EdgeInsets.all(8),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(21),
          ),
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(21),
              gradient: LinearGradient(
                colors: Gradients.jShineGradientColors,
                begin: _topAlignmentAnimation.value,
                end: _bottomAlignmentAnimation.value,
              ),
            ),
          ),
        );
      },
    );
  }
}

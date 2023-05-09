import 'package:flutter/material.dart';

import '../../../../constants/constants.dart';

class AuthTextField extends StatelessWidget {
  final TextEditingController _controller;
  final String hint;
  final ValueNotifier<bool>? isPasswordShownNotifier;
  final String? Function(String?) validator;
  const AuthTextField({
    super.key,
    required TextEditingController controller,
    required this.hint,
    this.isPasswordShownNotifier,
    required this.validator,
  }) : _controller = controller;

  @override
  Widget build(BuildContext context) {
    if (isPasswordShownNotifier != null) {
      return ValueListenableBuilder(
        valueListenable: isPasswordShownNotifier!,
        builder: (context, isPasswordShown, _) {
          return Padding(
            padding:
                const EdgeInsets.symmetric(vertical: 15.0, horizontal: 25.0),
            child: TextFormField(
              controller: _controller,
              validator: validator,
              cursorColor: Pallete.actionCommonColor,
              obscureText: isPasswordShown ? false : true,
              style: FontStyles.label,
              decoration: InputDecoration(
                hintText: hint,
                hintStyle: FontStyles.label.copyWith(
                  color: Pallete.disabledColor,
                ),
                errorMaxLines: 6,
                suffixIcon: isPasswordShown
                    ? IconButton(
                        onPressed: () => isPasswordShownNotifier!.value = false,
                        icon: const Icon(
                          Icons.visibility_off,
                          color: Pallete.actionCommonColor,
                        ),
                      )
                    : IconButton(
                        onPressed: () => isPasswordShownNotifier!.value = true,
                        icon: const Icon(
                          Icons.visibility,
                          color: Pallete.actionCommonColor,
                        ),
                      ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(
                    12,
                  ),
                  borderSide: const BorderSide(
                    color: Pallete.actionCommonColor,
                    width: 2.0,
                  ),
                ),
                focusedErrorBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(
                    12,
                  ),
                  borderSide: const BorderSide(
                    color: Pallete.actionRareColor,
                    width: 1.5,
                  ),
                ),
                errorBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(
                    12,
                  ),
                  borderSide: const BorderSide(
                    color: Pallete.actionRareColor,
                    width: 1.5,
                  ),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(
                    12,
                  ),
                  borderSide: const BorderSide(
                    color: Pallete.disabledColor,
                    width: 1.5,
                  ),
                ),
              ),
            ),
          );
        },
      );
    }
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 15.0, horizontal: 25.0),
      child: TextFormField(
        controller: _controller,
        validator: validator,
        cursorColor: Pallete.actionCommonColor,
        style: FontStyles.label,
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: FontStyles.label.copyWith(
            color: Pallete.disabledColor,
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              12,
            ),
            borderSide: const BorderSide(
              color: Pallete.actionCommonColor,
              width: 2.0,
            ),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              12,
            ),
            borderSide: const BorderSide(
              color: Pallete.actionRareColor,
              width: 1.5,
            ),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              12,
            ),
            borderSide: const BorderSide(
              color: Pallete.actionRareColor,
              width: 1.5,
            ),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              12,
            ),
            borderSide: const BorderSide(
              color: Pallete.disabledColor,
              width: 1.5,
            ),
          ),
        ),
      ),
    );
  }
}

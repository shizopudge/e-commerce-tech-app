import 'package:flutter/material.dart';

import '../../../../constants/constants.dart';

AppBar authAppBar({required String title}) => AppBar(
      backgroundColor: Colors.transparent,
      elevation: 0,
      title: Text(
        title,
        style: FontStyles.label,
      ),
      centerTitle: true,
      automaticallyImplyLeading: false,
    );

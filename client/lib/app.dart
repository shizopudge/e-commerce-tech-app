import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  late final FirebaseAuth auth;
  String data = '';
  String idToken = '';
  static const String getOneProduct =
      'http://10.0.2.2:5050/api/products/29c32fb0-e8d1-4fc0-8e50-630798d68c9d';

  @override
  void initState() {
    super.initState();
    auth = FirebaseAuth.instance;
    auth.authStateChanges().listen((User? user) {
      if (user == null) {
        print('User is currently signed out!');
      } else {
        print('User is signed in!');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () async {
                  final credentials = await auth.signInWithEmailAndPassword(
                      email: 'admin@gmail.com', password: '123456');
                  final user = credentials.user;
                  final token = await user!.getIdToken();
                  print(token);
                  setState(() {
                    idToken = token;
                  });
                },
                child: const Text(
                  'Login',
                ),
              ),
              ElevatedButton(
                onPressed: () async {
                  final response = await http.get(
                    Uri.parse(getOneProduct),
                    headers: {
                      'authorization': idToken,
                    },
                  );
                  print(response.statusCode);
                  setState(() {
                    data = jsonEncode(response.body);
                  });
                },
                child: const Text(
                  'Get product',
                ),
              ),
              Text(
                data,
                style: const TextStyle(fontSize: 50, color: Colors.red),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

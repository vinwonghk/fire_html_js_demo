import 'package:fire_html_js_demo/app.dart';
import 'package:fire_html_js_demo/models/user.dart';
import 'package:fire_html_js_demo/services/firebase_auth_service.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() async {
  runApp(
    MultiProvider(
      providers: [
        Provider<FirebaseAuthService>(
          create: (_) => FirebaseAuthService(),
        ),
        StreamProvider<User>(
          create: (context) =>
              context.read<FirebaseAuthService>().onAuthStateChanged,
        ),
      ],
      builder: (context, widget) {
        return MyApp();
      }
    ),
  );
}
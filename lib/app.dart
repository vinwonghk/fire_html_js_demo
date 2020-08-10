import 'package:fire_html_js_demo/models/user.dart';
import 'package:fire_html_js_demo/views/home_view.dart';
import 'package:fire_html_js_demo/views/sign_in/sign_in_view.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material App',
      theme: ThemeData(
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Consumer<User>(
        builder: (_, user, __) {
          if (user == null) {
            return SignInView();
          } else {
            return HomeView();
          }
        },
      ),
    );
  }
}

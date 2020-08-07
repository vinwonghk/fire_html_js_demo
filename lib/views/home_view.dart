import 'package:fire_html_js_demo/services/firebase_auth_service.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:html' as html;

class HomeView extends StatelessWidget {
  const HomeView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                'You have signed in',
                style: Theme.of(context).textTheme.headline4,
              ),
            ),
            RaisedButton(
              onPressed: () {
                html.window.open('https://fire-html-js-demo-f3b0d.firebaseapp.com/question_customization', 'name');
              },
              child: Text('Go to Question Customization'),
            ),
            RaisedButton(
              onPressed: () {
                context.read<FirebaseAuthService>().signOut();
              },
              child: Text('Sign out'),
            ),
            RaisedButton(
              onPressed: () {
                context.read<FirebaseAuthService>().deleteUser();
              },
              child: Text('Delete Account'),
            ),
            const Spacer(),
          ],
        ),
      ),
    );
  }
}

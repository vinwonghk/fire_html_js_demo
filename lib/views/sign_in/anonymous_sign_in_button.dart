
import 'package:fire_html_js_demo/views/sign_in/sign_in_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AnonymousSignInButton extends StatelessWidget {
  const AnonymousSignInButton({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RaisedButton.icon(
      onPressed: () {
        context.read<SignInViewModel>().signInAnonymously();
      },
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      color: Colors.red[900],
      icon: Container(
        height: 38,
        width: 38,
        color: Colors.white,
        child: Icon(
          Icons.person,
        ),
      ),
      label: Text(
        'Continue as guest',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 14,
          color: Colors.white,
        ),
      ),
    );
  }
}
import 'package:fire_html_js_demo/views/sign_in/anonymous_sign_in_button.dart';
import 'package:fire_html_js_demo/views/sign_in/google_sign_in_button.dart';
import 'package:flutter/material.dart';

class SignInView extends StatefulWidget {
  @override
  _SignInViewState createState() => _SignInViewState();
}

class _SignInViewState extends State<SignInView> {
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.max,
        children: <Widget>[
          Expanded(
            child: _isLoading ? loading() : _signInButtons(context),
          ),
        ],
      ),
    );
  }

  Widget loading() {
    return Center(child: CircularProgressIndicator());
  }

  Column _signInButtons(BuildContext context) {
    return Column(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.all(16),
          child: Text(
            'Please sign in',
            style: Theme.of(context).textTheme.headline4,
          ),
        ),
        GoogleSignInButton(buttonPressed),
        SizedBox(height: 12),
        AnonymousSignInButton(buttonPressed),
      ],
    );
  }

  void buttonPressed() {
    setState(() {
      _isLoading = !_isLoading;
    });
  }
}

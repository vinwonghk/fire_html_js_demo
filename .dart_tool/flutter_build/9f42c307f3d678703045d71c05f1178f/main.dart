import 'dart:ui' as ui;

import 'package:flutter_web_plugins/flutter_web_plugins.dart';

import 'package:fire_html_js_demo/generated_plugin_registrant.dart';
import 'package:fire_html_js_demo/main.dart' as entrypoint;

Future<void> main() async {
  registerPlugins(webPluginRegistry);
  if (true) {
    await ui.webOnlyInitializePlatform();
  }
  entrypoint.main();
}

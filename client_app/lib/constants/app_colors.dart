/// App color palette.
import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  static const Color primary = Color(0xFF214D8D);
  static const Color secondary = Color(0xFF888078);
  static const Color accent = Color(0xFFD4A87D);
  static const Color background = Color(0xFFFFFFFF);
  static const Color text = Color(0xFF000000);
  static const Color buttonPrimary = Color(0xFF214D8D);
  static const Color buttonText = Color(0xFFFFFFFF);
  static const Color inputBackground = Color(0xFFFFFFFF);

  // Derived shades
  static const Color primaryLight = Color(0xFF3A6BB5);
  static const Color primaryDark = Color(0xFF193A6B);
  static const Color surfaceLight = Color(0xFFF5F5F5);

  // Dark mode
  static const Color darkBackground = Color(0xFF121212);
  static const Color darkSurface = Color(0xFF1E1E1E);
  static const Color darkText = Color(0xFFFFFFFF);
  static const Color darkInputBackground = Color(0xFF2A2A2A);
  static const Color darkDivider = Color(0xFF333333);

  // Status colors
  static const Color success = Color(0xFF4CAF50);
  static const Color error = Color(0xFFF44336);
  static const Color warning = Color(0xFFFF9800);
  static const Color info = Color(0xFF2196F3);
}

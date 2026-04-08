import 'dart:developer' as developer;

import 'package:dio/dio.dart';
import 'package:client_app/services/api_service.dart';

/// Service handling OTP-based authentication flow.
class AuthService {
  AuthService._();

  static final AuthService _instance = AuthService._();
  factory AuthService() => _instance;

  final _api = ApiService();

  /// Send OTP to the given phone number.
  ///
  /// Returns the API response data on success.
  Future<Map<String, dynamic>> sendOtp(String phone) async {
    try {
      final response = await _api.dio.post<Map<String, dynamic>>(
        '/auth/otp/send',
        data: {'phone': phone},
      );
      developer.log('OTP sent successfully', name: 'AuthService');
      return response.data?['data'] ?? {};
    } on DioException catch (e) {
      developer.log(
        'Failed to send OTP',
        name: 'AuthService',
        error: e.message,
      );
      rethrow;
    }
  }

  /// Verify the OTP code for the given phone number.
  ///
  /// Returns the auth token on success and stores it automatically.
  Future<String> verifyOtp(String phone, String otpCode) async {
    try {
      final response = await _api.dio.post<Map<String, dynamic>>(
        '/auth/otp/verify',
        data: {
          'phone': phone,
          'otp': otpCode,
        },
      );

      final data = response.data?['data'];
      if (data == null) {
        throw Exception('No data in response');
      }

      final token = data['token'] as String?;
      if (token == null || token.isEmpty) {
        throw Exception('No token in response');
      }

      await _api.setToken(token);
      developer.log('OTP verified, token stored', name: 'AuthService');
      return token;
    } on DioException catch (e) {
      developer.log(
        'Failed to verify OTP',
        name: 'AuthService',
        error: e.message,
      );
      rethrow;
    }
  }

  /// Logout and clear stored token.
  Future<void> logout() async {
    await _api.clearToken();
    developer.log('Logged out, token cleared', name: 'AuthService');
  }

  /// Check if the current stored token is valid.
  Future<bool> isLoggedIn() async {
    return _api.isAuthenticated();
  }
}

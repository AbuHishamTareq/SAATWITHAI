import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:client_app/services/auth_service.dart';

/// Auth state enum.
enum AuthStatus { initial, loading, authenticated, unauthenticated }

/// State class holding the current auth status and error.
class AuthState {
  const AuthState({
    required this.status,
    this.error,
  });

  final AuthStatus status;
  final String? error;

  AuthState copyWith({AuthStatus? status, String? error}) {
    return AuthState(
      status: status ?? this.status,
      error: error,
    );
  }
}

/// Riverpod notifier for authentication state.
class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier(this._authService) : super(const AuthState(status: AuthStatus.initial));

  final AuthService _authService;

  /// Initialize auth state by checking for stored token.
  Future<void> initialize() async {
    state = state.copyWith(status: AuthStatus.loading);
    try {
      final loggedIn = await _authService.isLoggedIn();
      state = AuthState(
        status: loggedIn ? AuthStatus.authenticated : AuthStatus.unauthenticated,
      );
    } catch (e) {
      state = AuthState(
        status: AuthStatus.unauthenticated,
        error: e.toString(),
      );
    }
  }

  /// Send OTP to phone number.
  Future<void> sendOtp(String phone) async {
    state = state.copyWith(status: AuthStatus.loading);
    try {
      await _authService.sendOtp(phone);
      state = state.copyWith(status: AuthStatus.unauthenticated);
    } catch (e) {
      state = AuthState(
        status: AuthStatus.unauthenticated,
        error: e.toString(),
      );
    }
  }

  /// Verify OTP and authenticate.
  Future<void> verifyOtp(String phone, String otpCode) async {
    state = state.copyWith(status: AuthStatus.loading);
    try {
      await _authService.verifyOtp(phone, otpCode);
      state = const AuthState(status: AuthStatus.authenticated);
    } catch (e) {
      state = AuthState(
        status: AuthStatus.unauthenticated,
        error: e.toString(),
      );
    }
  }

  /// Logout and clear auth state.
  Future<void> logout() async {
    state = state.copyWith(status: AuthStatus.loading);
    await _authService.logout();
    state = const AuthState(status: AuthStatus.unauthenticated);
  }
}

/// Auth provider instance.
final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(AuthService());
});

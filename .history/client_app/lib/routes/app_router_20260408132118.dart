import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:client_app/providers/auth_provider.dart';
import 'package:client_app/screens/auth/otp_verification_screen.dart';
import 'package:client_app/screens/auth/phone_input_screen.dart';
import 'package:client_app/screens/home/home_screen.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

/// GoRouter configuration with auth guard.
final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/auth/phone',
  refreshListenable: GoRouterRefreshStream(authProvider.stream),
  routes: [
    // Auth routes (public)
    GoRoute(
      path: '/auth/phone',
      builder: (context, state) => const PhoneInputScreen(),
    ),
    GoRoute(
      path: '/auth/otp',
      builder: (context, state) {
        final phone = state.uri.queryParameters['phone'] ?? '';
        return OtpVerificationScreen(phone: phone);
      },
    ),

    // Shell route for authenticated screens
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (context, state, child) => HomeScreen(child: child),
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const SizedBox.shrink(),
        ),
      ],
    ),
  ],
  redirect: (context, state) {
    // This is handled by the refreshListenable above.
    return null;
  },
);

/// Helper to trigger router rebuild on auth state changes.
class GoRouterRefreshStream extends ChangeNotifier {
  GoRouterRefreshStream(Stream<dynamic> stream) {
    stream.listen((_) => notifyListeners());
  }
}

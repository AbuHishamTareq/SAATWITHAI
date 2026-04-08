import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:sentry_flutter/sentry_flutter.dart';
import 'package:client_app/l10n/app_localizations.dart';
import 'package:client_app/services/api_service.dart';
import 'package:client_app/themes/app_theme.dart';
import 'package:client_app/providers/auth_provider.dart';
import 'package:client_app/providers/locale_provider.dart';
import 'package:client_app/providers/theme_provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Set preferred orientations
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Initialize API service
  ApiService().initialize();

  // Initialize Sentry (DSN configured via environment)
  await SentryFlutter.init((options) {
    options.dsn = const String.fromEnvironment('SENTRY_DSN');
    options.tracesSampleRate = 1.0;
    options.profilesSampleRate = 1.0;
  }, appRunner: () => runApp(const ProviderScope(child: SaatApp())));
}

/// Root application widget.
class SaatApp extends ConsumerWidget {
  const SaatApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeModeProvider);
    final locale = ref.watch(localeProvider);

    return MaterialApp(
      title: 'SAAT',
      debugShowCheckedModeBanner: false,
      theme: lightTheme,
      darkTheme: lightTheme.copyWith(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF121212),
      ),
      themeMode: themeMode,
      locale: locale,
      supportedLocales: const [Locale('en'), Locale('ar')],
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      localeResolutionCallback: (locale, supportedLocales) {
        // Default to English if locale is not supported
        for (final supported in supportedLocales) {
          if (supported.languageCode == locale?.languageCode) {
            return supported;
          }
        }
        return const Locale('en');
      },
      home: const _AppStartup(),
    );
  }
}

/// Startup widget that initializes auth state and routes accordingly.
class _AppStartup extends ConsumerStatefulWidget {
  const _AppStartup();

  @override
  ConsumerState<_AppStartup> createState() => _AppStartupState();
}

class _AppStartupState extends ConsumerState<_AppStartup> {
  @override
  void initState() {
    super.initState();
    // Initialize auth state on startup
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(authProvider.notifier).initialize();
    });
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    switch (authState.status) {
      case AuthStatus.initial:
      case AuthStatus.loading:
        return const Scaffold(body: Center(child: CircularProgressIndicator()));
      case AuthStatus.authenticated:
        // TODO: Navigate to home screen
        return const Scaffold(
          body: Center(child: Text('Authenticated - Home Screen')),
        );
      case AuthStatus.unauthenticated:
        // Navigate to phone input
        WidgetsBinding.instance.addPostFrameCallback((_) {
          // Router will handle this
        });
        return const Scaffold(
          body: Center(child: Text('Unauthenticated - Login Screen')),
        );
    }
  }
}
